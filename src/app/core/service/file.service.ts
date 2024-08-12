import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private files: { name: string, type: string, size: number, base64: string }[] = [];

  constructor() {
    // Get Files in LocalStorage
    this.loadFiles();
  }
// Get Files in LocalStorage
  loadFiles() {
    const savedFiles = localStorage.getItem('files');
    if (savedFiles) {
      this.files = JSON.parse(savedFiles);
    }
  }
// Save In LocalStorage
  saveFiles() {
    localStorage.setItem('files', JSON.stringify(this.files));
  }
  // Get Files
  getFiles(): { name: string, type: string, size: number, base64: string }[] {
    return this.files;
  }

  // Add File
  addFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      this.files.push({
        name: file.name,
        type: file.type,
        size: file.size,
        base64: base64
      });
      this.saveFiles();
    };
    reader.readAsDataURL(file);
  }

  // Remove File
  removeFile(file: { name: string, type: string, size: number, base64: string }) {
    this.files = this.files.filter(f => f !== file);
    this.saveFiles();
  }

  removeAll() {
    localStorage.removeItem('files');
    this.getFiles();
    // console.log("Remove All");

  }

}
