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
        num_jobs=Process.objects.count()+1
        directory = "solo_file/media_"+str(num_jobs)+"/"
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
                num_jobs,
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
                print("**********")
                print(e_value_cutoff)
                print(identity_cutoff)
                print("***********")
                call_search_process.delay(
                    process_object.id,
                    search_name,
                    directory,
                    num_jobs,
                    identity_cutoff,
                    e_value_cutoff
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
    print(Process.objects.count())
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
        num_jobs=Process.objects.count()+1
        print(num_jobs)
        directory = "solo_file/media_"+str(num_jobs)+"/"
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
            num_jobs,
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
            return render(request, 'base.html')
    else:
        form = ContactForm()
    return render(request, 'contact.html',{'form': form})

def team(request):
    return render(request,'team.html')

def help(request):
    return render(request,'help.html')

def related(request):
    return render(request, 'related.html')