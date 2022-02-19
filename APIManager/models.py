from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

# Create your models here.
class FormData(models.Model):
	title		= models.CharField(max_length=120)
	slug		= models.SlugField(null=True, blank=True)
	formData 	= models.CharField(default="m", max_length=10000)
	owner 		= models.CharField(max_length=120)

class PublicFormData(models.Model):
	title		= models.CharField(max_length=120)
	slug		= models.SlugField(null=True, blank=True)
	formData 	= models.CharField(default="m", max_length=10000)
	owner 		= models.CharField(max_length=120)

class FormFiller(models.Model):
	title		= models.CharField(max_length=120)
	slug		= models.SlugField(null=True, blank=True)
	formData 	= models.CharField(default="m", max_length=10000)