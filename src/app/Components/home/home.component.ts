import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/core/service/file.service';
import * as AOS from 'aos';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  files: { name: string, type: string, size: number, base64: string }[] = [];

  termInput: string = '';

  buttonDeleteAll: boolean = false;

  totalFiles: number = 0;

  constructor(
    private fileService: FileService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    AOS.init();
    this.files = this.fileService.getFiles();
  }

  // Add File
  addFile(event: any) {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      const fileExists = this.files.some( (existingFile) => existingFile.name === file.name );
      if (fileExists) {
        this.toastr.error(
          'This PDF file already exists and cannot be added again.'
        );
      } else {
        this.fileService.addFile(file);
        this.files = this.fileService.getFiles();
        event.target.value = '';
      }
    } else {
      this.toastr.error('The file must be a PDF.');
    }

  }

  // Remove File
  removeFile(file: { name: string, type: string, size: number, base64: string }) {
    this.fileService.removeFile(file);
    this.files = this.fileService.getFiles();
  }


  // View File
  viewFile(file: { name: string, type: string, size: number, base64: string }) {
    const fileBlob = this.base64ToBlob(file.base64, file.type);
    const fileUrl = URL.createObjectURL(fileBlob);
    window.open(fileUrl, '_blank');
    URL.revokeObjectURL(fileUrl); // Clean up the URL object
  }

  // Download File
  downloadFile(file: { name: string, type: string, size: number, base64: string }) {
    const fileBlob = this.base64ToBlob(file.base64, file.type);
    const fileUrl = URL.createObjectURL(fileBlob);
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(fileUrl); // Clean up the URL object
  }

  // Helper function to convert base64 to Blob
  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  // Logout
  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }


}
