#Django related imports
from django.shortcuts import render
from rest_framework import generics, permissions
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
#################################################################

#API related imports
from .models import (
	FormData,
	PublicFormData,
	FormFiller
)
from .serializers import (
    FormDataSerializer,
	PublicFormDataSerializer,
	FormFillerSerializer
)
#################################################################


class SaveFormAPIView(generics.CreateAPIView):
    queryset            = FormData.objects.all()
    serializer_class    = FormDataSerializer
    lookup_field        = 'slug'

class CreateListPublicFormAPIView(generics.ListCreateAPIView):
    queryset            = PublicFormData.objects.all()
    serializer_class    = PublicFormDataSerializer
    lookup_field        = 'slug'

class FormFillPropsAPIView(generics.CreateAPIView):
    queryset            = FormFiller.objects.all()
    serializer_class    = FormFillerSerializer
    lookup_field        = 'slug'

class FormFillPropsRetrieveAPIView(generics.RetrieveUpdateAPIView):
    queryset            = FormFiller.objects.all()
    serializer_class    = FormFillerSerializer
    lookup_field        = 'slug'