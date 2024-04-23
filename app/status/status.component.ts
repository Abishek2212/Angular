import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StatusService } from '../status.service';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  positiondatas:any[]=[];
  datas:any[]=[];
  Rounds:any[]=[];
  Names:any[]=[];
  ShowStatus:any[]=[];
  selectedRound: string[] = [];
  selectedStatus: string[] = [];
  update:boolean=false;
  constructor(private StatusService: StatusService){}





  ngOnInit(): void {
    this.positionstatus();
    this.positiondata();

  }

  onPositionChange(event: any): void {
    const selectedPositionId = event.target.value;
    this.Select(selectedPositionId);
    this.update=true;
  }


  Select(PositionId:number): void {
    this.StatusService.select(PositionId).subscribe((data) => {
      this.Rounds = data.ShowRounds;
      this.Names=data.ShowNames;
      this.ShowStatus=data.ShowStatus;
      this.selectedRound = this.Rounds.map(round => round.InterviewId);
      this.selectedStatus = this.ShowStatus.map(status => status.StatusId);

    });
  }

  positiondata(): void {
    this.StatusService.candidatedata().subscribe((data) => { 
      this.positiondatas = data.positiondata;
    });
  }
  positionstatus(): void {
    this.StatusService.positionstatus().subscribe((data) => {
      this.datas = data.positionstatus;
    });
  }

  submit(CandidateId:number,Fullname:string,selectedRound:string,selectedStatus:string):void {
    
    this.StatusService.submit(CandidateId,Fullname,selectedRound,selectedStatus).subscribe(() => {
      this.update=false;
      this.positionstatus();

    });
  }
}
