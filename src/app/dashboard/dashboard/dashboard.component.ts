import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from 'src/app/core/service/file.service';
import * as AOS from 'aos' ;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
    AOS.init();
  }

  totalFiles : number = 0 ;

  files: { name: string, type: string, size: number, base64: string }[] = [] ;

  constructor(private router: Router , private fileService:FileService) {
    this.totalFiles = this.fileService.getFiles().length;
    this.files = this.fileService.getFiles();
  }
// Logout
  logout(){
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }


}
