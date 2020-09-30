import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../model/application';
import { ApplicationService } from '../services/application.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  content: string;
  authorized: boolean;
  applications:Application[];
  constructor(private router: Router,private userService: UserService,private applicationService:ApplicationService) { }

  ngOnInit(): void {
    this.getAllApplications();
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
        this.authorized=true;
      },
      err => {
        this.content = JSON.parse(err.error).message;
        window.alert("Unauthorized Access as Admin");
        this.router.navigate(['']);
      }
    );
  }

// Generate various reports like: View List of application confirmed/ accepted (waiting for interview)/rejected for a scheduled program.

getAllApplications() {
  this.applicationService.getAllApplications().subscribe((data: Application[]) => {
    this.applications = data;
  });
}

// Update and manage (add or delete) information of the programs offer by the university

// Manage (add or delete) schedules of the programs offered by the university

// View list of programs scheduled to commence in a given time period.

}
