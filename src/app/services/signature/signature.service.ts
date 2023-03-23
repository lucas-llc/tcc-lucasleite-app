import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class SignatureService {
  signatureList: any;
  signaturesTotals: any;
  signatureCount: any;
  empty = false;
  selectedStatus = "ATIVO";
  constructor(
    private readonly http: HttpClient,
  ) { }

  get(id: any) {
    return this.http.get(environment.url + '/signature/' + id).pipe(map((data: any) => {
      return data;
    }));
  }

  list(status?: String) {
    let statusString = status ? status : '';
    return this.http.get(environment.url + '/signature?status=' + statusString).pipe(map((data: any) => {
      this.signatureList = data;
      this.signatureCount = this.signatureList ? this.signatureList.length : 0;
      if (data?.length > 0) {
        this.empty = false;
      } else {
        this.empty = true;
      }
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

  getTotals() {
    return this.http.get(environment.url + '/signature/total').pipe(map((data: any) => {
      this.signaturesTotals = data;
      return data;
    }));
  }

  getCalendar(month: string) {
    return this.http.get(environment.url + '/signature/calendar?month=' + month).pipe(map((data: any) => {
      return data;
    }));
  }

  changeStatus(id: number) {
    return this.http.put(environment.url + '/signature/changeStatus/' + id, null).pipe(map((data: any) => {
      return data;
    }));
  }
}
