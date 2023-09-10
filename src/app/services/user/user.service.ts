import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getLoggedUser() {
    return this.http.get(environment.url + '/user/logged').pipe(map((data: any) => {
      return data;
    }));
  }

  get(id: any) {
    return this.http.get(environment.url + '/user/' + id).pipe(map((data: any) => {
      return data;
    }));
  }

  create(obj: any) {
    return this.http.post(environment.url + '/user', obj).pipe(map((data: any) => {
      return data;
    }));
  }

  update(obj: any) {
    return this.http.put(environment.url + '/user', obj).pipe(map((data: any) => {
      return data;
    }));
  }

  checkUserEmail(email: string) {
    return this.http.get(environment.url + '/user/email/' + email).pipe(map((data: any) => {
      return data;
    }));
  }

  sendForgotCode(email: string) {
    return this.http.get(environment.url + '/user/send/forgot/' + email).pipe(map((data: any) => {
      return data;
    }));
  }

}
