from __future__ import absolute_import
import shutil,os,calendar,time
from celery.decorators import task
from app.models import Process
from solo_file import views_solo_sent, search_sequence
from django.conf import settings
from django.core.mail import EmailMessage

# Make asyncronous function
@task
def generate_process(process_id,file_name,path,num_jobs,identity_cutoff=5,e_value_cutoff=0.9):
	job_id = generate_process.request.id
	if Process.objects.filter(id=process_id).exists():
		process_object = Process.objects.get(id=process_id)
		getTimestamp = str(get_timestamp())

		print("xxxxxxxxxxxxx")
		print(num_jobs)
		print("xxxxxxxxxxxxx")
		# Save job id and change status
		process_object.queue_id=job_id
		jid=str(job_id).split("-")[0]
		process_object.status=1
		process_object.folder_name=str(jid)
		process_object.save()

		# Call solo script
		print("********* Calling the solo file ***********")
		if process_object.email:
			msg = '<p>Your job is running now so please wait for getting the result and we will email to you with result</p><br><span><strong>Job Id:</strong> '+job_id+'</span><br><span><strong>Job Name:</strong> '+process_object.title+'</span>'
			send_email(process_object.email,msg=msg)
		print(jid)
		views_solo_sent.main(getTimestamp,jid,num_jobs,identity=identity_cutoff,e_value=e_value_cutoff)

		# After done process then change the status completed
		process_object.status=2
		process_object.save()

		# Make zip file
		folder_name = process_object.folder_name
		new_dir_name = os.path.join(settings.BASE_DIR,'static/temp_out/',str(jid))
		dir_name = os.path.join(settings.BASE_DIR,'solo_file/media/',str(jid))
		shutil.make_archive(new_dir_name, 'zip', dir_name)

		# Send email to user if email is exsist
		if process_object.email:
			msg = '<p>Hi dear, <br>Your job is completed now so please find attached file</p><br><span><strong>Job Id:</strong> '+job_id+'</span><br><span><strong>Job Name:</strong> '+process_object.title+'</span>'
			send_email(process_object.email,attach_file_path=new_dir_name+".zip",msg=msg)
			print("****** Email has been send with result....")
	return True

# Send email to user
def send_email(email,attach_file_path=None,msg=None):
	msg = EmailMessage(
		'Webserver process files',
		msg,
		settings.EMAIL_HOST_USER, [email]
	)
	msg.content_subtype = "html"
	if attach_file_path:
		msg.attach_file(attach_file_path)
	msg.send()

# Get current timestamp
def get_timestamp():
    return calendar.timegm(time.gmtime())

@task
def call_search_process(process_id,search_name,path,num_jobs,identity_cutoff=5,e_value_cutoff=0.9):
	search_sequence.searchFaaAndDownload(search_name)
	print("*********** search file downloaded *************")
	generate_process.delay(
		process_id,
		'search.faa',
		path,
		num_jobs,
		identity_cutoff,
		e_value_cutoff
	)