import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../interview.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
 
@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css'],
  providers: [InterviewService],
})
export class InterviewComponent implements OnInit {
  datas: any[] = [];
  interviewForm: FormGroup;
  updateForm: FormGroup;
  update: boolean = true;
  updateid: number = 0;
  interviewStepNameControl: AbstractControl;
  updateStepNameControl: AbstractControl;
  createmessage:any[]=[];
  updatemaessage:any[]=[];
  deletedmessage:any[]=[];
 
  constructor(private interviewService: InterviewService, private fb: FormBuilder) {
    this.interviewForm = this.fb.group({
      interviewStepName: ['', [Validators.required, Validators.pattern(/.*\S+.*/)]],
    });
    this.updateForm = this.fb.group({
      interviewStepName: ['',[Validators.required, Validators.pattern(/.*\S+.*/)]],
    });
 
    this.interviewStepNameControl = this.interviewForm.get('interviewStepName')!;
    this.updateStepNameControl = this.updateForm.get('interviewStepName')!;
  }
 
  ngOnInit(): void {
    this.getInterviews();
    this.update = true;
  }

  getInterviews(): void {
    this.interviewService.getInterviews().subscribe((data) => {
      this.datas = data.datas;
    });
  }
 
  createInterview(): void {
    const interviewData = { interviewStepName: this.interviewForm.value.interviewStepName };
    this.interviewService.createInterview(interviewData).subscribe(
      (message) => {
      this.getInterviews();

      this.interviewForm.reset();
      this.createmessage=message.Message;
      this.updatemaessage=[];
      this.deletedmessage=[];

    },
    (error)=>{
      console.error("error interview name:",error);
    });
  }
 
  updateInterview(): void {
    const updateData = { interviewStepName: this.updateForm.value.interviewStepName };
    const updateId = this.updateid;
 
    this.interviewService.updateInterview(updateId, updateData).subscribe(
      (message) => {
        this.getInterviews();
 
        this.updateForm.reset();
        this.interviewForm.reset();
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
 
  updatedata(id: number, InterviewName: string): void {
    this.updateForm.setValue({ interviewStepName: InterviewName });
    this.getInterviews();
    this.updateid = id;
    this.update = false;
  }
  cancelupdate(): void{
    this.update=true
    this.interviewForm.reset();
    this.createmessage=[];
    this.updatemaessage=[];
    this.deletedmessage=[];
  }
 
  deleteInterview(id: number): void {
    this.interviewService.deleteInterview(id).subscribe((message) => {
      this.getInterviews();
      this.deletedmessage=message.Message;
      this.createmessage=[];
      this.updatemaessage=[];
    });
  }
}
