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
  empty = false;
  today = new Date();
  constructor(
    public ss: SignatureService,
    public util: UtilService
  ) {
    this.selectedMonth = String(this.today.getMonth());
  }

  ngOnInit(): void {
    this.getCalendar();
  }

  getCalendar() {
    this.loading = true;
    this.ss.getCalendar(this.selectedMonth).subscribe({
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

  changeFilter() {
    this.getCalendar();
  }
}
