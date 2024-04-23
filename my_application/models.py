from django.db import models

# Create your models here.
class interview_stepname(models.Model):
    interview_step=models.CharField(max_length=20,unique=True,default="")

class test(models.Model):
    demo=models.FileField()

class positiondata(models.Model):
    position_name=models.CharField(max_length=20,unique=True,default="")
    position_description=models.CharField(max_length=20,unique=False)
    interview_stage=models.CharField(max_length=50,default="")

class NewPositionData(models.Model):
    position_name=models.CharField(max_length=20,unique=True,default="")
    position_description=models.CharField(max_length=20,unique=False)
    interview_stage=models.CharField(max_length=50,default="")

class PD(models.Model):
    position_name=models.CharField(max_length=20,unique=True,default="")
    position_description=models.CharField(max_length=20,unique=False)
    interview_stage=models.CharField(max_length=50,default="")