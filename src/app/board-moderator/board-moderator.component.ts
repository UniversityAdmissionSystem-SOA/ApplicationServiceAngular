import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../model/application';
import { ApplicationService } from '../services/application.service';
import { UserService } from '../_services/user.service';

import {MatDatepickerInputEvent, MatMonthView} from '@angular/material/datepicker'; 
@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {

  content: string;
  authorized: boolean;
  applications: Application[];
  applicationsMatched: Application[]=[];
  programID: string;
  selectedApplication: Application;
  ifUpdatingApplications: boolean=true;
  accepted:boolean=false;
  month: string;
  dateAdd: string;
  datetoAdd: string;
  endDate: string;
  date: Date;
  dateToAdd: string;
  constructor(private router: Router, private userService: UserService, private applicationService: ApplicationService) {
    this.ifUpdatingApplications=false;
    this.accepted=false;
    this.date = new Date();
   }

  ngOnInit(): void {
    this.getAllApplications();
    this.userService.getModeratorBoard().subscribe(
      data => {
        this.content = data;
        this.authorized = true;
      },
      err => {
        this.content = JSON.parse(err.error).message;
        window.alert("Unauthorized Access as MAC");
        this.router.navigate(['']);
      }
    );
  }

  //View Applications
  getAllApplications() {
    this.applicationService.getAllApplications().subscribe((data: Application[]) => {
      this.applications = data;
    });
  }
  onOptionsSelected(value: string) {
    this.accepted=false;
    this.ifUpdatingApplications=false;
    this.applicationsMatched=[];
    this.getAllApplications();
    for (let i = 0; i < this.applications.length; i++) {
      if (this.applications[i].scheduledProgramId == value) {
        this.applicationsMatched.push(this.applications[i]);
      }
    }
  }
  //Accept/Reject an application on the basis of the details of the applicant. If accepted, fill in the scheduled date for an interview of the applicant before confirming the applicant to take the program.

  viewApplication(application:Application){
    this.accepted=false;
    if(application.status=="accepted"){
      this.accepted=true;
    }
    this.selectedApplication=application;
    this.ifUpdatingApplications=true;
  }
  rejectApplication(){
    this.accepted=false;
  }
  acceptApplication(){
    this.accepted=true;
  }

  addEndDateEvent(event: MatDatepickerInputEvent<Date>) {

    this.month = '' + (event.value.getMonth() + 1);
    this.dateAdd = '' + event.value.getDate();
    if (event.value.getMonth() + 1 < 10) {
      this.month = '0' + this.month;
    }
    if (event.value.getDate() < 10) {
      this.dateAdd = '0' + this.dateAdd;
    }

    this.dateToAdd = event.value.getFullYear() + '-' + this.month + '-' + this.dateAdd;
  }

  updateApplication(){
    if(this.accepted==true){
      this.selectedApplication.status="Accepted";
      this.selectedApplication.dateOfInterview=this.dateToAdd;
    }
    else
    {
      this.selectedApplication.status="Rejected";

      this.selectedApplication.dateOfInterview="";
    }
    const ap=new Application(this.selectedApplication.id,this.selectedApplication.fullName,this.selectedApplication.dateOfBirth,this.selectedApplication.highestQualification,this.selectedApplication.marksObtained,this.selectedApplication.goals,this.selectedApplication.emailId,this.selectedApplication.scheduledProgramId,this.selectedApplication.status,this.selectedApplication.dateOfInterview);
    this.applicationService.putApplications(ap,this.selectedApplication.id).subscribe(data=>{
      window.alert(data);}
    );
  }
  //After the interview,update the status of the application to Confirmed/Rejected

}
