from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect


# Create your views here.

@login_required(login_url='/loginUser/')
def homePage(request):
	response = redirect('/hyforms/')
	return response

def loginUser(request):
	context = {}
	if request.method == 'POST':
		form = SignIn(request.POST or None)
		if form.is_valid():
			
			tempDict = form.cleaned_data
			email = tempDict['email']
			password = tempDict['password']
			print(tempDict)
			user = authenticate(username=email, password=password)
			if user is not None:
				login(request, user)
				return redirect ("/")
			else:
				context = { 'loginFlag': '1' }
	return render (request, 'loginUser.html', context)

def signUpUser(request):
	context = {}
	if request.method == 'POST':
		form = SignUp(request.POST or None)
		print (form.errors)
		if form.is_valid():
			
			tempDict = form.cleaned_data
			name = tempDict['name']
			email = tempDict['email']
			password = tempDict['password']
			rePass = tempDict['rePassword']
			if password != rePass:
				context = { 'passNotMatch': '1' }
				return render (request, 'signUpUser.html', context)
			else:
				user = User.objects.create_user(name, email, password)
				print ("User created")
	return render (request, 'signUpUser.html')

def logoutUser(request):
	logout(request)
	return redirect ("/loginUser/")