import pyodbc 
from django.shortcuts import render, redirect
from django.contrib import messages

connection=None
cursor=None
def open_connection():
    global connection
    global cursor
    connection = pyodbc.connect("DRIVER={ODBC Driver 17 for SQL Server};SERVER=LTPBAN222579925\\SQLEXPRESS;DATABASE=job;Trusted_Connection=Yes;")
    cursor = connection.cursor()
def close_connection():
    global connection
    global cursor
    if cursor:
        cursor.close()
    if connection:
        connection.close()


def interview(request):
    global cursor
    open_connection()
    cursor.execute("EXEC interviewdata")
    datas=cursor.fetchall()
    if request.method=="POST":
        interview_name=request.POST['interviewStepName']
        cursor.execute("EXEC InsertOrUpdateInterviewStep @interviewName=?",(interview_name,))
        result=cursor.fetchone()
        if result.Message =='Record already exists':
            messages.error(request,"Already Exist")
            return render(request,'interview_step.html',{'datas':datas})
        else:
            cursor.commit()
            messages.success(request,"Successfully Created")
            cursor.execute("EXEC interviewdata")
            datas=cursor.fetchall()
            return render(request,'interview_step.html',{'datas':datas})
    

    close_connection()
    return render(request,'interview_step.html',{'datas':datas})

def deleteinterview(request,id):
    global cursor
    open_connection()
    cursor.execute("EXEC deleteinterview @Id=?",[id])
    cursor.commit()
    close_connection()
    messages.error(request,"Successfully Delete")
    return redirect('interview1')

def updateinterview(request,id):
    global cursor
    open_connection()
    cursor.execute("EXEC interviewdata")
    datas=cursor.fetchall()

    cursor.execute("EXEC fetchinterview @Id=?",[id])
    data=cursor.fetchone()
    if request.method=="POST":
        InterviewName=request.POST['interviewStepName']

        cursor.execute("EXEC UpdateInterviewName @Id=?,@InterviewName=?",[id,InterviewName])
        result=cursor.fetchone()
        if result.Message =='Already exists':
            close_connection() 
            messages.error(request,"Already Exist")
            return redirect('interview1')
        else:
            cursor.commit()
            close_connection() 
            messages.success(request,"Successfully Updated")
            return redirect('interview1')
    
    close_connection()    
    return render(request,'updateinter.html',{'datas':datas,'data':data})
##########################################################################################################################
def position(request):
    global cursor
    open_connection()
    cursor.execute("EXEC positiondata")
    datas=cursor.fetchall()
    return render(request,'position.html',{'datas':datas})

def home(request):
    return render(request,'home.html')

def login(request):
    return render(request,'login.html')
def signup(request):
    return render(request,'signup.html')

def reg(request):
    return render(request,'reg.html')
def uploadfile(request):
    if request.method=="POST":
        pass
    pass
    
def contact(request):
    return render(request,'contact.html')



