from django.contrib import admin
from .models import (
	FormData,
	FormFiller,
	FilledData,
	PublicFormData
)
# Register your models here.
admin.site.register(FormData)
admin.site.register(FormFiller)
admin.site.register(FilledData)
admin.site.register(PublicFormData)
