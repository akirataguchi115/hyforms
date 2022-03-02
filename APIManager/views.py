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
	FormFiller,
	FilledData,
)
from .serializers import (
    FormDataSerializer,
	PublicFormDataSerializer,
	FormFillerSerializer,
	FilledDataSerializer
)
#################################################################

class FormAPIView(generics.ListAPIView):
    serializer_class    = FormDataSerializer
    lookup_field        = 'slug'
    def get_queryset(self):
        user = self.request.user
        return FormData.objects.filter(owner=user)

class SaveFormAPIView(generics.CreateAPIView):
    queryset            = FormData.objects.all()
    serializer_class    = FormDataSerializer
    lookup_field        = 'slug'

class formRUDView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field 		= 'slug'
    serializer_class 	= FormDataSerializer
    queryset    		= FormData.objects.all()

    def get_queryset(self):
        user = self.request.user
        return FormData.objects.filter(owner=user)

class FormFillPropsAPIView(generics.CreateAPIView):
    queryset            = FormFiller.objects.all()
    serializer_class    = FormFillerSerializer
    lookup_field        = 'slug'

class FormFillPropsRetrieveAPIView(generics.RetrieveUpdateAPIView):
    queryset            = FormFiller.objects.all()
    serializer_class    = FormFillerSerializer
    lookup_field        = 'slug'
class FormFilledDataInsertAPIView(generics.CreateAPIView):
    queryset            = FilledData.objects.all()
    serializer_class    = FilledDataSerializer
    lookup_field        = 'slug'
    permission_classes  = []
class FormFilledDataListAPIView(generics.ListAPIView):
    queryset            = FilledData.objects.all()
    serializer_class    = FilledDataSerializer
    lookup_field        = 'slug'
class CreateListPublicFormAPIView(generics.ListCreateAPIView):
    queryset            = PublicFormData.objects.all()
    serializer_class    = PublicFormDataSerializer
    lookup_field        = 'slug'
class ViewPublicFormAPIView(generics.RetrieveAPIView):
    queryset            = PublicFormData.objects.all()
    serializer_class    = PublicFormDataSerializer
    lookup_field        = 'slug'

class FormFilledDataListAPIView(generics.ListAPIView):
    queryset            = FilledData.objects.all()
    serializer_class    = FilledDataSerializer
    lookup_field        = 'slug'
    
@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    print (dir(request.user))
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)