import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignatureService {
  signatureList: any;
  constructor(
    private readonly http: HttpClient,
  ) { }

  get(id: any) {
    return this.http.get('http://127.0.0.1:8080/signature/' + id).pipe(map((data: any) => {
      return data;
    }));
  }

  list() {
    return this.http.get('http://127.0.0.1:8080/signature').pipe(map((data: any) => {
      this.signatureList = data.content;
      return this.signatureList;
    }));
  }

  create() {

  }

  update() {

  }

  delete() {

  }
}
