import { Component, OnInit } from '@angular/core';
import { SignatureService } from 'src/app/services/signature/signature.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class CalendarPage implements OnInit {
  loading = false;
  signatureMonthList: any;
  selectedMonth: any;
  selectedYear: any;
  empty = false;
  today = new Date();
  yearList: any = [];
  constructor(
    public ss: SignatureService,
    public util: UtilService
  ) {
    this.selectedMonth = String(this.today.getMonth());
    this.selectedYear = String(this.today.getFullYear());
  }

  ngOnInit(): void {
    this.getFirstPayment();
    this.getCalendar();
  }

  handleRefresh(event: any) {
    this.getFirstPayment();
    this.getCalendar();
    if (event) {
      event.target.complete();
    }
  }

  getCalendar() {
    this.loading = true;
    this.ss.getCalendar(this.selectedMonth, this.selectedYear).subscribe({
      next: (data) => {
        this.signatureMonthList = data;
        if (this.signatureMonthList?.length > 0) {
          this.empty = false;
        } else {
          this.empty = true;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getFirstPayment() {
    this.yearList = [];
    this.ss.getFirstPayment().subscribe({
      next: (data) => {
        let firstPaymentYear = new Date(data.startDate).getFullYear();
        let count = 0;
        while((Number(firstPaymentYear) + count) <= (Number(this.selectedYear) + 1)) {
          this.yearList.push(firstPaymentYear + count);
          count++;
        }
      },
      error: () => {

      }
    });
  }

  changeFilter() {
    this.getCalendar();
  }
}
