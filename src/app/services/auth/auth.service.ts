import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser = new ReplaySubject<any>(1);
  constructor(private readonly http: HttpClient) {}

  public getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  doLogin(obj: any) {
    return this.http.post(environment.url + '/login', obj).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  doCheckLogin() {
    if (localStorage.getItem('jwt')) {
      this.authUser.next({ value: localStorage.getItem('jwt'), valid: true });
    } else {
      localStorage.removeItem('jwt');
      this.authUser.next({ value: null, valid: false });
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('loggedUser');
    this.authUser.next({ value: null, valid: false });
  }
}
