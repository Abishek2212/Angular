"""
URL configuration for django_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from my_application import views
from my_application import test
from my_application import backendserver

urlpatterns = [
    path('api/interviewdata',backendserver.interviewdata,name='interviewdata'),
    path('api/createinterview',backendserver.createinterview,name='create'),
    path('api/updateinterview/<int:id>/',backendserver.updateinterview,name='update'),
    path('api/deleteinterview/<int:id>/',backendserver.deleteinterview,name='deleteinterview'),
    path('api/positiondata',backendserver.positiondata,name='positiondata'),
    path('api/position',backendserver.position,name='position'),
    path('api/positiondelete/<int:id>/',backendserver.positiondelete,name='positiondelete'),
    path('api/positionupdate/<int:id>/',backendserver.positionupdate,name='positionupdate'),
    path('api/reg',backendserver.reg,name='reg'),
    path('api/Candidatedata',backendserver.Candidatedata,name='Candidatedata'),
    path('api/Candidatedelete/<int:id>/',backendserver.deletecandidate,name='positiondelete'),
    path('api/positionstatus',backendserver.positionstatus,name='positionstatus'),
    path('api/positionselect/<int:id>/',backendserver.positionselect,name='positionselect'),
    path('api/positionsubmit',backendserver.positionsubmit,name='positionsubmit'),


    path('admin/', admin.site.urls),
    path('',test.home),
    path('interview/',test.interview,name="interview1"),
    path('delete_inter/<int:id>',test.deleteinterview,name="deleteinterview"),
    path('interview/update_inter/<int:id>',test.updateinterview,name="updateinterview"),
    path('position/',test.position,name="position1"),


    path('home/',test.home,name="home1"),
    path('login/',test.login,name="login1"),
    path('signup/',test.signup,name="signup1"),
    path('contact/',test.contact,name="contact1"),
    path('reg/',test.reg,name="reg1"),
    path('position/',test.position,name="position1"),
    path('home/login/',test.login),


]
