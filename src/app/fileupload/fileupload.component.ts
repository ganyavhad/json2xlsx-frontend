import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
})
export class FileuploadComponent implements OnInit {
  form: FormGroup;

  constructor(public apiService: ApiService) {}

  ngOnInit() {
    this.form = new FormGroup({
      file: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.form.patchValue({ file: file });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.apiService.uploadFile(this.form.value.file);
  }
}
