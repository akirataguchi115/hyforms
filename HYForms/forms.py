from django import forms

class SignIn(forms.Form):
	email = forms.CharField(max_length=100)
	password = forms.CharField(max_length=100)

class SignUp(forms.Form):
	name = forms.CharField(max_length=100)
	email = forms.CharField(max_length=100)
	password = forms.CharField(max_length=100)
	rePassword = forms.CharField(max_length=100)