import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PositionService } from '../position.service';
 
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  datas: any[] = [];
  obj: any[] = [];
  PositionNameControl: AbstractControl;
  positionDescriptionControl: AbstractControl;
  positionForm: FormGroup;
  updateForm: FormGroup;
  update: boolean = true;
  updateid: number = 0;
  createmessage: any[] = [];
  updatemaessage: any[] = [];
  deletedmessage: any[] = [];
  updatePositionNameControl: AbstractControl;
  updatepositionDescriptionControl: AbstractControl;
 
  constructor(private positionService: PositionService, private fb: FormBuilder) {
    this.positionForm = this.fb.group({
      positionName: ['', [Validators.required, Validators.pattern(/\S+/)]],
      positionDescription: ['', [Validators.required, Validators.pattern(/\S+/)]],
      interviewStages: this.fb.array([]),

    });
    this.updateForm = this.fb.group({
      positionName: ['', [Validators.required, Validators.pattern(/\S+/)]],
      positionDescription: ['', [Validators.required, Validators.pattern(/\S+/)]],
      interviewStages: this.fb.array([]),
    });
    this.PositionNameControl = this.positionForm.get('positionName')!;
    this.positionDescriptionControl = this.positionForm.get('positionDescription')!;
    this.updatePositionNameControl = this.updateForm.get('positionName')!;
    this.updatepositionDescriptionControl = this.updateForm.get('positionDescription')!;
  }
 
  ngOnInit(): void {
    this.getPositionData();
    this.update = true;
  }
 
  getPositionData(): void {
    this.positionService.getPositionData().subscribe((data) => {
      this.datas = data.positiondata;
      this.obj = data.interviewdata;
      
    });
  }
  updateInterviewStages(event: any, index: number): void {
    const interviewStagesFormArray = this.positionForm.get('interviewStages') as FormArray;
 
    if (event.target.checked) {
      interviewStagesFormArray.push(this.fb.control(event.target.value));
    } else {
      const selectedId = event.target.value;
      const selectedIndex = interviewStagesFormArray.value.indexOf(selectedId);
      interviewStagesFormArray.removeAt(selectedIndex);
    }
  }
 
  submitForm(): void {
    if (this.positionForm.valid) {
      const positionName = this.positionForm.value.positionName;
      const positionDescription = this.positionForm.value.positionDescription;
      const interviewStages = this.positionForm.value.interviewStages;
       
      this.positionService.createposition(positionName, positionDescription,interviewStages).subscribe(
        (message) => {
          this.getPositionData();
          this.positionForm.reset();
          this.createmessage = message.Message;
          this.updatemaessage = [];
          this.deletedmessage = [];
        }
      );
    }
  }

  
  updatedata(positionId: number, Position_Name: string,position_Description:string): void {
    this.updateForm.patchValue({ positionName: Position_Name,positionDescription: position_Description });
    this.getPositionData();
    this.updateid = positionId;
    this.update = false;
  }

  updateposition():void{
    const name = this.updateForm.value.positionName;
    const Description = this.updateForm.value.positionDescription;
    const updateId = this.updateid;
    const InterviewStage=this.positionForm.value.interviewStages
    this.positionService.updateposition(updateId, name,Description,InterviewStage).subscribe(
      (message) => {
        this.getPositionData();
 
        this.updateForm.reset();
        this.positionForm.reset();
        this.updateid = 0;
        this.update = true;
        this.updatemaessage=message.Message;
        this.createmessage=[];
        this.deletedmessage=[];
      },
      (error) => {
        console.error("error interview name:", error);
      }
    );
  }

  cancelupdate(): void{
    this.update=true
    this.positionForm.reset();
    this.createmessage=[];
    this.updatemaessage=[];
    this.deletedmessage=[];
  }
  deleteposition(id: number):void{
    this.positionService.deleteposition(id).subscribe((message) => {
      this.getPositionData();
      this.deletedmessage=message.Message;
      this.createmessage=[];
      this.updatemaessage=[];
    });
  }
}