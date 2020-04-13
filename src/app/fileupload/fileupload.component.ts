import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { File } from './../file.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
})
export class FileuploadComponent implements OnInit {
  form: FormGroup;
  status: boolean;
  uploaded: boolean;
  files: File[] = [];
  isFiles = false;
  message = 'Loading...';
  loadFiles() {
    this.apiService.loadFiles().subscribe(
      (res: File[]) => {
        console.log(res);
        this.files = res;
        this.isFiles = true;
      },
      (err) => {
        console.log(err);
        this.isFiles = false;
        if (err.error == 'noDataFound') {
          this.message = 'No Data Found';
        } else {
          this.message = 'Failed to load data';
        }
      }
    );
  }

  constructor(public apiService: ApiService) {}

  ngOnInit() {
    this.form = new FormGroup({
      file: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.status = false;
    this.uploaded = false;
    this.loadFiles();
  }
  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.form.patchValue({ file: file });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.status = true;
    this.uploaded = false;
    this.apiService.uploadFile(this.form.value.file).subscribe(
      (res) => {
        console.log(res);
        this.uploaded = true;
      },
      (err) => {
        this.uploaded = false;
        console.log(err);
      }
    );
  }
  donwloadExcel(id) {
    window.open(`${environment.serverUrl}/JSONData/downloadExcel/${id}`);
  }
}
