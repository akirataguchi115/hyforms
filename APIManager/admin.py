from django.contrib import admin
from .models import (
	FormData,
	PublicFormData
)
# Register your models here.
admin.site.register(FormData)
admin.site.register(PublicFormData)