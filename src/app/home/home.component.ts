import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {MatDatepickerInputEvent, MatMonthView} from '@angular/material/datepicker'; 
import { Application } from '../model/application';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addApplicationTabCheck:boolean=true;
  checkApplicationTabCheck:boolean=false;
  content: string;
  datetoAdd: string;
  date:Date;
  month: string;
  dateAdd: string;
  enableUpdate: boolean;
  authorized: boolean;
  marks: string;
  application:Application;
  name:string;
  email:string;
  highestQualification:string;
  programID:string;
  goals:string;
  idToFind:string;
  statusTableCheck:boolean=false;
  selectedApplication:Application;
  applications: Application[];
  idFound: boolean;
  constructor(private userService: UserService,private applicationService:ApplicationService) { 
    this.getAllApplications();
    this.idFound=false;
    this.date=new Date();
    this.addApplicationTabCheck=true;
  this.checkApplicationTabCheck=false;
  this.statusTableCheck=false;
  }
  getAllApplications() {
    this.applicationService.getAllApplications().subscribe((data: Application[]) => {
      this.applications = data;
      console.log(this.applications);
    });
  }
  ngOnInit(): void {
    
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  addStartDateEvent(event: MatDatepickerInputEvent<Date>) {

    this.month = '' + (event.value.getMonth() + 1);
    this.dateAdd = '' + event.value.getDate();

    if (event.value.getMonth() + 1 < 10) {
      this.month = '0' + this.month;
    }
    if (event.value.getDate() < 10) {
      this.dateAdd = '0' + event.value.getDate();
    }
    this.datetoAdd = event.value.getFullYear() + '-' + this.month + '-' + this.dateAdd;
    
  }
  addApplication() {
    const ap=new Application(0,this.name,this.datetoAdd,this.highestQualification,parseInt(this.marks),this.goals,this.email,this.programID,"Waiting","");
    console.log(ap);

    this.applicationService.postApplications(ap).subscribe(data=>{
      window.alert(data);},err=>{
        
        this.content = JSON.parse(err.error).message;
        window.alert(this.content);
      }
    );

  }
  lessThan(subj: number, num: number) {
    return subj < num;
  }
  checkApplicationsTab(){
    this.checkApplicationTabCheck=true;
    this.addApplicationTabCheck=false;
  }
  addApplicationsTab(){
    this.checkApplicationTabCheck=false;
    this.addApplicationTabCheck=true;
  }
  checkApplicationStatus(){
   
    for (let i = 0; i < this.applications.length; i++) {
      if (this.applications[i].id.toString() == this.idToFind) {
        this.idFound=true;
        this.selectedApplication=this.applications[i];
      }
    }
    this.statusTableCheck=true;
  }
}
