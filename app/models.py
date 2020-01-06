import os
from django.db import models
from django.utils.translation import gettext as _

STATUS = (
	(0,  _('Open')),
	(1, _('In progress')),
	(2, _('Completed')),
)

class Process(models.Model):
    title = models.CharField(max_length=200,null=True)
    email = models.CharField(max_length=200,null=True)
    actual_file_name = models.CharField(max_length=200)
    process_file_name = models.CharField(max_length=200)
    folder_name = models.CharField(max_length=200,null=True)
    queue_id = models.CharField(max_length=200)
    status = models.PositiveSmallIntegerField(
      choices=STATUS,
      default=0,
   	)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    # Get name from file name
    def folder_name_test(self):
        name, extension = os.path.splitext(self.process_file_name)
        return name

class Contact(models.Model):
    subject = models.CharField(max_length=120)
    name = models.CharField(max_length=120)
    email = models.EmailField()
    feedback = models.TextField()
    date = models.DateField(auto_now_add=True)
 
    def __str__(self):
        return self.name