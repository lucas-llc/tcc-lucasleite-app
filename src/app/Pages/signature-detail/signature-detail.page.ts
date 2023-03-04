import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-signature-detail',
  templateUrl: './signature-detail.page.html',
  styleUrls: ['./signature-detail.page.scss'],
})
export class SignatureDetailPage implements OnInit {
  loading = true;
  selectedSignature: any;
  constructor(
    public util: UtilService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.util.getNavParams().subscribe(async (data: any) => {
      this.loading = true;
      if (data) {
        this.selectedSignature = data;
      } else {
        this.selectedSignature = { id: this.route.snapshot.paramMap.get('id') };
      }
    });
  }

}
