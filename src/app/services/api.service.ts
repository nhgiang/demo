import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  uploadFile(
    file: Blob | File | string,
    fileName?: string
  ): Observable<string> {
    if (!file || typeof file === 'string') {
      return of(file as string);
    }
    const form = new FormData();
    form.append('file', file, fileName || (file as any).name || 'unknownfile');
    return this.httpClient
      .post<any>(`${this.apiUrl}/uploadfile`, form)
      .pipe(map((result: { path: string }) => result.path));
  }

  uploadFiles(files: Blob[] | File[] | string[] | any[]): Observable<string[]> {
    if (!files || !files.some((file) => typeof file !== 'string')) {
      return of(files as string[]);
    }
    const form = new FormData();
    let fileNames: any[] = [];
    files.forEach((file) => {
      if (typeof file !== 'string') {
        form.append('files', file, file.name || 'unknownfile');
      } else {
        fileNames.push(file);
      }
    });
    return this.httpClient.post<any>(`${this.apiUrl}/uploads`, form).pipe(
      map((res: any[]) => {
        fileNames = [...fileNames, ...res.map((file) => file.path)];
        return fileNames;
      })
    );
  }

  create(body: any) {
    return this.httpClient.post<any>(`${this.apiUrl}/create`, body);
  }

  getList() {
    return this.httpClient.get<any[]>(`${this.apiUrl}/get_list`);
  }

  generateData() {
    return this.httpClient.get<any[]>(`${this.apiUrl}/generate`);
  }
} 
