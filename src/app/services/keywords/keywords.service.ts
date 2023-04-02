import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  listKeywords() {
    return this.http.get(environment.url + '/keywords').pipe(map((data: any) => {
      return data;
    }));
  }

  create(obj: any) {
    return this.http.post(environment.url + '/keywords', obj).pipe(map((data: any) => {
      return data;
    }));
  }
}
