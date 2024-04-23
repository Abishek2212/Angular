from http.client import responses
from urllib import response
import pyodbc 
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.core.serializers.json import DjangoJSONEncoder
import json


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
        

def interviewdata(request):
    global cursor
    open_connection()
    cursor.execute("EXEC SP_interviewdata")
    columns = [col[0] for col in cursor.description]
    datas = [dict(zip(columns, row)) for row in cursor.fetchall()]
    close_connection()
    return JsonResponse({'datas': datas}, safe=False)

@csrf_exempt
def createinterview(request):
    if request.method == 'POST':
        data=json.loads(request.body)
        interview_name=data.get('interviewStepName')
        global cursor
        open_connection()
        cursor.execute("EXEC SP_InsertOrUpdateInterviewStep @interviewName=?", [interview_name])
        result = cursor.fetchone()
        cursor.commit()
        close_connection()
        return JsonResponse({'Message': result.Message})
    elif request.method == 'OPTIONS':
        response = JsonResponse({'Message': 'OK'})
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    else:
        return JsonResponse({'Message': 'Invalid method'}, status=405)

@csrf_exempt   
def updateinterview(request, id):
    if request.method == 'POST':
        data=json.loads(request.body)
        InterviewName=data.get('interviewStepName')
        global cursor
        open_connection()
        cursor.execute("EXEC SP_UpdateInterviewName @Id=?,@InterviewName=?",[id,InterviewName])
        result=cursor.fetchone()
        if result.Message =='Already exists':
            close_connection() 
            messages.error(request,"Already Exist")
            return JsonResponse({'Message': result.Message})
        else:
            cursor.commit()
            close_connection()
            return JsonResponse({'Message': result.Message})
        
    elif request.method == 'OPTIONS':
        response = JsonResponse({'Message': 'OK'})
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    else:
        return JsonResponse({'Message': 'Invalid method'}, status=405)

@csrf_exempt
def deleteinterview(request, id):
    if request.method == 'DELETE':
        global cursor
        open_connection()
        cursor.execute("EXEC SP_deleteinterview @Id=?", [id])
        result=cursor.fetchone()
        if result and result.Message =='Interview Name Mapped':
            close_connection() 
            return JsonResponse({'Message': result.Message})
        else:
            cursor.commit()
            close_connection()
            return JsonResponse({'Message': 'Deleted Successfully'})
######################################################################################################

@csrf_exempt    
def positiondata(request):
    try:
        global cursor
        open_connection()
        cursor.execute("EXEC SP_view")
        columns = [col[0] for col in cursor.description]
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        close_connection()

        open_connection()
        cursor.execute("EXEC SP_interviewdata")
        columns = [col[0] for col in cursor.description]
        datas = [dict(zip(columns, row)) for row in cursor.fetchall()]
        close_connection()
        return JsonResponse({'positiondata': data,'interviewdata':datas}, safe=False)
    except:
        return JsonResponse

@csrf_exempt
def position(request):
    if request.method == 'POST':
        try:
            data=json.loads(request.body.decode('utf-8'))
            position_name=data.get('positionName','')
            position_Description=data.get('positionDescription','')
            interviewStages=data.get('interviewStages','')
            global cursor
            open_connection()
            cursor.execute("EXEC SP_position @Position_Name=?,@position_Description=?", [position_name,position_Description])
            result = cursor.fetchone()
            if result.Message =='Position Already exists' or result.Message =='Position Description Already exists':
                close_connection() 
                return JsonResponse({'Message': result.Message})
            else:
                cursor.commit()
                close_connection()
                open_connection()
                cursor.execute("EXEC SP_positionid @Position_Name=?",[position_name])
                columns = [col[0] for col in cursor.description]
                datas = [dict(zip(columns, row)) for row in cursor.fetchall()]
                close_connection()
                positionId=datas[0]['positionId']
                for InterviewId in interviewStages:
                    open_connection()
                    cursor.execute("EXEC SP_createmapping @positionId=?,@InterviewId=?",[positionId,InterviewId])
                    cursor.commit()
                    close_connection()
                return JsonResponse({'Message': result.Message})
        except:
            close_connection()
            return JsonResponse
        
    elif request.method == 'OPTIONS':
        response = JsonResponse({'Message': 'OK'})
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    else:
        return JsonResponse({'Message': 'Invalid method'}, status=405)

@csrf_exempt
def positiondelete(request, id):
    if request.method == 'DELETE':
        global cursor
        open_connection()
        cursor.execute("EXEC SP_positiondelete @Id=?,@map=?", [id,0])
        cursor.commit()
        close_connection()
        return JsonResponse({'Message': 'Successfully Deleted'})
    
@csrf_exempt   
def positionupdate(request, id):
    if request.method == 'POST':
        data=json.loads(request.body.decode('utf-8'))
        name=data.get('name','')
        Description=data.get('Description','')
        InterviewStage=data.get('InterviewStage','')
        global cursor
        open_connection()
        cursor.execute("EXEC SP_positionupdate @Id=?,@positionname=?,@positionDescription=?",[id,name,Description])
        result=cursor.fetchone()
        if result.Message =='Position Already exists' or result.Message =='Position Description Already exists':
            close_connection() 
            messages.error(request,"Already Exist")
            return JsonResponse({'Message': result.Message})
        else:
            cursor.commit()
            close_connection()
            open_connection()
            cursor.execute("EXEC SP_positiondelete @Id=?,@map=?", [id,1])
            cursor.commit()
            close_connection()   
            for InterviewId in InterviewStage:
                open_connection()
                cursor.execute("EXEC SP_createmapping @positionId=?,@InterviewId=?",[id,InterviewId])
                cursor.commit()
                close_connection()         
            return JsonResponse({'Message': result.Message})
        
    elif request.method == 'OPTIONS':
        response = JsonResponse({'Message': 'OK'})
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    else:
        return JsonResponse({'Message': 'Invalid method'}, status=405)

################################################################################################################
@csrf_exempt    
def Candidatedata(request):
    global cursor
    try:
        open_connection()
        cursor.execute("EXEC SP_Candidatedata")
        columns = [col[0] for col in cursor.description]
        datas = [dict(zip(columns, row)) for row in cursor.fetchall()]
        close_connection()

        open_connection()
        cursor.execute("EXEC SP_view")
        columns = [col[0] for col in cursor.description]
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        close_connection()
        return JsonResponse({'Candidatedata': datas,'positiondata': data}, safe=False)
    except:
        close_connection()
        return JsonResponse

@csrf_exempt
def reg(request):
    if request.method == 'POST':
        try:
            datas=json.loads(request.body.decode('utf-8'))
            id=datas.get('updateid')
            data=datas.get('candidatedata')
            print(id)
            candidateName=data.get('candidateName','')
            contactNumber=data.get('contactNumber','')
            email=data.get('email','')
            isInternal=data.get('isInternal','')
            resume=data.get('resume','')
            experience=data.get('experience','')
            skills=data.get('skills','')
            position=data.get('position','')
            global cursor
            open_connection()
            cursor.execute("EXEC SP_SaveUpdatecandidate @CandidateId=?,@Fullname=?,@Contact=?,@Email=?,@IsInternal=?,@FileNames=?,@FileDisplayName=?,@YearsOfExp=?,@Skills=?,@PositionID=?,@CreatedBy=?,@ModifiedBy=?", 
                           [id,candidateName,contactNumber,email,isInternal,resume,resume,experience,skills,position,'Abishek','Abishek'])
            
            result = cursor.fetchone()
            print(result)
            if result.Message =='Contact number already exists.' or result.Message =='Email already exists.':
                close_connection()
                return JsonResponse({'Message': result.Message})
            else:
                close_connection()
                open_connection()
                cursor.execute("EXEC SP_CreateUpdatecandidate @CandidateId=?,@Fullname=?,@Contact=?,@Email=?,@IsInternal=?,@FileNames=?,@FileDisplayName=?,@YearsOfExp=?,@Skills=?,@PositionID=?,@CreatedBy=?,@ModifiedBy=?", 
                           [id,candidateName,contactNumber,email,isInternal,resume,resume,experience,skills,position,'Abishek','Abishek'])
                cursor.commit()
                close_connection()
                return JsonResponse({'Message': "Updated Successfully"})
            
        except:
            close_connection()
            return JsonResponse
        
    elif request.method == 'OPTIONS':
        response = JsonResponse({'Message': 'OK'})
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    else:
        return JsonResponse({'Message': 'Invalid method'}, status=405)
    
@csrf_exempt
def deletecandidate(request, id):
    if request.method == 'DELETE':
        global cursor
        open_connection()
        cursor.execute("EXEC SP_deletecandidate @Id=?", [id])
        cursor.commit()
        close_connection()
        return JsonResponse({'Message': 'Successfully Deleted'})

################################################################################################################
    
@csrf_exempt    
def positionstatus(request):
    global cursor
    open_connection()
    cursor.execute("EXEC ShowCandidateStatus")
    cursor.nextset()
    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]

    close_connection()
    return JsonResponse({'positionstatus': data}, safe=False)


@csrf_exempt    
def positionselect(request,id):
    global cursor
    open_connection()
    cursor.execute("EXEC ShowRounds @PositionId=?", [id])
    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    close_connection()

    open_connection()
    cursor.execute("EXEC ShowNames @PositionId=?", [id])
    columns = [col[0] for col in cursor.description]
    datas = [dict(zip(columns, row)) for row in cursor.fetchall()]
    close_connection()
    
    open_connection()
    cursor.execute("EXEC ShowStatus")
    columns = [col[0] for col in cursor.description]
    ShowStatus = [dict(zip(columns, row)) for row in cursor.fetchall()]
    close_connection()
    return JsonResponse({'ShowRounds': data,'ShowNames':datas,'ShowStatus':ShowStatus}, safe=False)

@csrf_exempt  
def positionsubmit(request):
    if request.method == 'POST':
        try:
            datas=json.loads(request.body.decode('utf-8'))
            id=datas.get('id')
            Fullname=datas.get('Fullname','')
            selectedRound=datas.get('selectedRound','')
            selectedStatus=datas.get('selectedStatus','')
            global cursor
            open_connection()
            cursor.execute("EXEC StatusInsert @CandidateId=?,@InterviewRoundId=?,@Statusid=?,@Createdby=?",
                           [id,selectedRound,selectedStatus,'Abishek'])
            
            cursor.commit()
            close_connection()
            sucess="sucess"
            return JsonResponse({"sucess":sucess})
            
        except:
            close_connection()
            return JsonResponse
        
    elif request.method == 'OPTIONS':
        response = JsonResponse({'Message': 'OK'})
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    else:
        return JsonResponse({'Message': 'Invalid method'}, status=405)

    