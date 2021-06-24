import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToCreate(){
    this.router.navigate(["/admin/create"])
  }

  goToRead(){
    this.router.navigate(["/admin/read"])
  }

  goToUpdate(){
    this.router.navigate(["/admin/update"])
  }

  goToDelete(){
    this.router.navigate(["/admin/delete"])
  }

}
