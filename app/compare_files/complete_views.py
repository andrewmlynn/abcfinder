import calendar
import os
import time
from datetime import datetime
from django.shortcuts import render
from django.core.files.storage import default_storage
from app.models import Process
from app.tasks import generate_process, call_search_process
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .forms import ContactForm
from django.contrib import messages
from django.shortcuts import redirect
from django.core.mail import EmailMessage
from django.template.loader import get_template
# Get current timestamp
def get_timestamp():
    return calendar.timegm(time.gmtime())

# Check folder is exists or not
def check_and_mk_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

# Allow only .faa files
def allow_file(file_name):
    if file_name in ['faa','fasta']:
        return True
    return False

# Upload .faa files
def file_upload(request):
    ctx = {
        'active': "home",
    }
    if request.method == "POST":
        # Get file from request
        file = request.FILES.get('search_file','')
        email = request.POST.get('email',None)
        search_name = request.POST.get('search_text',None)
        job_title = request.POST.get('job_title',None)
        e_value_cutoff = request.POST.get('e_value_cutoff',None)
        identity_cutoff = request.POST.get('identity_cutoff',None)
        directory = "solo_file/media/"
        if file:
            file_name = file.name
            file_extension = file_name.split('.')[1]

            # Validate file
            if not allow_file(file_extension):
                ctx['msg'] = "Please provide only .faa file"
                ctx['msg_class'] = 'danger'
                return render(request,'base.html',ctx)
            file_size = ((file.size / 1024) / 1024)
            if file_size > 95:
                ctx['msg'] = "Please not provide more than 95 mb file."
                ctx['msg_class'] = 'danger'
                return render(request,'base.html',ctx)

            process_file_name = "search.faa"

            # Save uploaded file
            default_storage.save(directory+process_file_name, file)

            # Save values in the process table
            process_object = Process.objects.create(
                email = email,
                title = job_title,
                actual_file_name = file_name,
                process_file_name = process_file_name,
                created_date =datetime.now(),
                updated_date =datetime.now(),
            )

            # Call background process
            generate_process.delay(
                process_object.id,
                process_object.process_file_name,
                directory,
                identity_cutoff=identity_cutoff,
                e_value_cutoff=e_value_cutoff,
            )
            msg = ' and check your process in queue'
            if email:
                msg += ' as well as I will send you an email after processing.'
            # msg
            ctx['msg'] = "File upload successfully"  + msg
            ctx['msg_class'] = 'success'
        else:
            if search_name:
                # Save values in the process table
                process_object = Process.objects.create(
                    email = email,
                    title = job_title,
                    created_date =datetime.now(),
                    updated_date =datetime.now(),
                )
                call_search_process.delay(
                    process_object.id,
                    search_name,
                    directory,
                )
                ctx['msg'] = "File uploaded successfully and your request is processing now"
                ctx['msg_class'] = 'success'
            else:
                ctx['msg'] = "Please provide a valid data"
                ctx['msg_class'] = 'danger'
    return render(request,'base.html',ctx)

# Get all queue process
def queue_list(request):
    process_object = Process.objects.all()
    paginator = Paginator(process_object, 10)
    page = request.GET.get('page', 1)
    try:
        queue_list = paginator.page(page)
    except PageNotAnInteger:
        queue_list = paginator.page(1)
    except EmptyPage:
        queue_list = paginator.page(paginator.num_pages)
    ctx = {
        'process_object': queue_list,
        'active': "queue",
    }
    return render(request,'queue.html',ctx)

def demo_example(request):
    ctx = {}
    if request.method == "POST":
        # Get file from request
        email = request.POST.get('email',None)
        job_title = request.POST.get('job_title',None)
        directory = "solo_file/media/"
        process_file_name = "search.faa"

        # Save values in the process table
        process_object = Process.objects.create(
            email = email,
            title = job_title,
            actual_file_name = process_file_name,
            process_file_name = process_file_name,
            created_date =datetime.now(),
            updated_date =datetime.now(),
        )

        # Call background process
        generate_process.delay(
            process_object.id,
            process_object.process_file_name,
            directory,
        )
        msg = ' and check your process in queue'
        if email:
            msg += ' as well as I will send you an email after processing.'
        # msg
        ctx['msg'] = "Test File upload successfully"  + msg
        ctx['msg_class'] = 'success'
    return render(request,'demo_example.html',ctx)

def start(request):
    return render(request,'start.html')

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
 
        if form.is_valid():
            form.save()
            messages.success(request, 'Success! Thank you for your feedback.')
            
            contact_subject = request.POST.get(
                'subject'
            , '')

            contact_name = request.POST.get(
                'name'
            , '')

            contact_email = request.POST.get(
                'email'
            , '')

            feedback_content = request.POST.get('feedback', '')

            # Email the profile with the
            # contact information
            template = get_template('contact_template.txt')
            context = {
                'contact_subject': contact_subject,
                'contact_name': contact_name,
                'contact_email': contact_email,
                'form_content': feedback_content,
            }
            content = template.render(context)

            email = EmailMessage(
                "New contact form submission",
                content,
                "Your website" +'',
                ['abcfinder47@gmail.com'],
                headers = {'Reply-To': contact_email }
            )
            email.send()      
        
            return redirect('contact')
    else:
        form = ContactForm()
    return render(request, 'contact.html',{'form': form})

def team(request):
    return render(request,'team.html')

def help(request):
    return render(request,'help.html')

def related(request):
    return render(request, 'related.html')