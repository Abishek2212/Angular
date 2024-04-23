import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  candidateForm: FormGroup;
  updatecandidateForm:FormGroup;
  resume:any[]=[];
  datas: any[]=[];
  positiondatas:any[]=[];
  CandidateNameControl: AbstractControl;
  CandidatecontactControl: AbstractControl;
  CandidateemailControl:AbstractControl;
  CandidatresumeControl:AbstractControl;
  CandidateexperienceControl:AbstractControl;
  CandidateskillsControl:AbstractControl;
  CandidatepositionControl:AbstractControl;
  updateCandidateNameControl: AbstractControl;
  updateCandidatecontactControl: AbstractControl;
  updateCandidateemailControl:AbstractControl;
  updateCandidatresumeControl:AbstractControl;
  updateCandidateexperienceControl:AbstractControl;
  updateCandidateskillsControl:AbstractControl;
  updateCandidatepositionControl:AbstractControl;
  createmessage:string='';
  deletedmessage:any[]=[];
  update:boolean=false;
  updateid: number = 0;

  constructor(private fb: FormBuilder, private RegisterService: RegisterService) {
    this.candidateForm = this.fb.group({
      candidateName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      isInternal: [''],
      resume: ['', Validators.required],
      experience: ['', Validators.required],
      skills: ['', Validators.required],
      position: ['', Validators.required],
    });
    this.updatecandidateForm = this.fb.group({
      candidateName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      isInternal: [''],
      resume: ['', Validators.required],
      experience: ['', Validators.required],
      skills: ['', Validators.required],
      position: ['', Validators.required],
    });
    this.CandidateNameControl = this.candidateForm.get('candidateName')!;
    this.CandidatecontactControl = this.candidateForm.get('contactNumber')!;
    this.CandidateemailControl = this.candidateForm.get('email')!;
    this.CandidatresumeControl = this.candidateForm.get('resume')!;
    this.CandidateexperienceControl = this.candidateForm.get('experience')!;
    this.CandidateskillsControl = this.candidateForm.get('skills')!;
    this.CandidatepositionControl = this.candidateForm.get('position')!;

    this.updateCandidateNameControl = this.updatecandidateForm.get('candidateName')!;
    this.updateCandidatecontactControl = this.updatecandidateForm.get('contactNumber')!;
    this.updateCandidateemailControl = this.updatecandidateForm.get('email')!;
    this.updateCandidatresumeControl = this.updatecandidateForm.get('resume')!;
    this.updateCandidateexperienceControl = this.updatecandidateForm.get('experience')!;
    this.updateCandidateskillsControl = this.updatecandidateForm.get('skills')!;
    this.updateCandidatepositionControl = this.updatecandidateForm.get('position')!;
  }

  ngOnInit(): void {
    this.candidatedata();
    this.update=false;
  }

 
  candidatedata(): void {
    this.RegisterService.candidatedata().subscribe((data) => {
      this.datas = data.Candidatedata;
      this.positiondatas = data.positiondata;

    });
  }
 
  onSubmit(): void {
    if (this.candidateForm.valid) {
      const candidateData = this.candidateForm.value;
      const resume = this.candidateForm.get('resume')!.value[0];
      console.log(resume);
    //  candidateData.append('resume',resume)

      this.RegisterService.createRegister(this.updateid,candidateData).subscribe(
        (message) => {
          this.createmessage=message.Message;
          if (this.createmessage === "Contact number already exists." || this.createmessage === "Email already exists.") {
            this.createmessage;
            this.deletedmessage=[];
          } else {
            this.createmessage;
            this.candidateForm.reset();
            this.candidatedata();
            this.deletedmessage=[];
          }
        }
      );
    }
  }
  deletecandidate(id: number):void{
    this.RegisterService.deletecandidate(id).subscribe((message) => {
      this.candidatedata();
      this.deletedmessage=message.Message;
    });
  }

  updatedata(CandidateId: number, Fullname: string,Contact:number,Email:string,IsInternal:number,FileName:any,YearsOfExp:number,Skills:string,Position_Name:string): void {
    this.updatecandidateForm.patchValue({ candidateName: Fullname,contactNumber: Contact,email:Email,isInternal:IsInternal ==1 ? 'True' : 'False',experience:YearsOfExp,skills:Skills,position:Position_Name });
    this.updateid = CandidateId;
    this.candidatedata();
    this.update=true;
  }

  updatereg(): void {
    if (this.updatecandidateForm.valid) {
      const candidateData = this.updatecandidateForm.value;
      this.RegisterService.createRegister(this.updateid,candidateData).subscribe(
        (message) => {
          this.createmessage=message.Message;
          if (this.createmessage === "Contact number already exists." || this.createmessage === "Email already exists.") {
            this.createmessage;
          } else {
            this.createmessage;
            this.updatecandidateForm.reset();
            this.candidatedata();
            this.update=false;
            this.updateid=0;
          }
        }
      );
    }
  }

  cancelupdate(): void{
    this.update=false
    this.candidateForm.reset();
    this.createmessage='';
    this.deletedmessage=[];
    this.updateid=0;
  }
}
