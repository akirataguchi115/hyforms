from django.contrib import admin
from .models import (
	FormData,
	FormFiller,
	PublicFormData
)
# Register your models here.
admin.site.register(FormData)
admin.site.register(PublicFormData)
admin.site.register(FormFiller)