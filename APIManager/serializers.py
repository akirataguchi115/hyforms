from django.contrib.auth import get_user_model, authenticate, login, logout
from django.contrib.auth.models import User
from django.db.models import Q
from django.urls import reverse
from django.utils import timezone
from rest_framework import serializers

from .models import (
	FormData,
    PublicFormData,
    FormFiller
)
class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('username',)


class FormDataSerializer(serializers.ModelSerializer):
	
	class Meta:
		model  = FormData
		fields = [
			'title',
			'slug',
			'formData',
			'owner'
		]

class PublicFormDataSerializer(serializers.ModelSerializer):
	
	class Meta:
		model  = PublicFormData
		fields = [
			'title',
			'slug',
			'formData',
			'owner'
		]

class FormFillerSerializer(serializers.ModelSerializer):
	class Meta:
		model  = FormFiller
		fields = [
			'title',
			'slug',
			'formData',
		]

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')