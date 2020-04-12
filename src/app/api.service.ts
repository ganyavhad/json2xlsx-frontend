import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  uploadFile(file: File) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.httpClient.post<{ message: string }>(
      environment.serverUrl + '/JSONData/upload',
      uploadData
    );
  }
}
