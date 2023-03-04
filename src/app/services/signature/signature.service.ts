import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class SignatureService {
  signatureList: any;
  constructor(
    private readonly http: HttpClient,
  ) { }

  get(id: any) {
    return this.http.get(environment.url + '/signature/' + id).pipe(map((data: any) => {
      return data;
    }));
  }

  list() {
    return this.http.get(environment.url + '/signature').pipe(map((data: any) => {
      this.signatureList = data.content;
      return this.signatureList;
    }));
  }

  create(obj: any) {
    return this.http.post(environment.url + '/signature', obj).pipe(map((data: any) => {
      return data;
    }));
  }

  update(obj: any) {
    return this.http.put(environment.url + '/signature', obj).pipe(map((data: any) => {
      return data;
    }));
  }

  delete(id: number) {
    return this.http.delete(environment.url + '/signature/' + id).pipe(map((data: any) => {
      return data;
    }));
  }
}
