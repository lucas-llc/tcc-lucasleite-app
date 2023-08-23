import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController, IonRouterOutlet, AlertController, LoadingController } from '@ionic/angular';
import { KeywordsService } from 'src/app/services/keywords/keywords.service';
import { SignatureService } from 'src/app/services/signature/signature.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.page.html',
  styleUrls: ['./category-detail.page.scss'],
})
export class CategoryDetailPage implements OnInit {
  loading = true;
  selectedCategory: any;
  signatureList: any = [];
  signaturesTotals: any;
  constructor(
    public util: UtilService,
    public route: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    public ks: KeywordsService,
    public ss: SignatureService
  ) { }

  ngOnInit() {
    this.util.getNavParams().subscribe(async (data: any) => {
      this.loading = true;
      if (data) {
        this.selectedCategory = data;
      } else {
        this.selectedCategory = { id: this.route.snapshot.paramMap.get('id') };
      }
      this.listSignature();
      this.getTotals();
    });
  }

  listSignature() {
    this.ss.listByCategory(this.selectedCategory?.id).subscribe({
      next: (data) => {
        this.signatureList = data;

        this.loading = false;
      }
    })
  }

  getTotals() {
    this.ss.getTotalsByCategory(this.selectedCategory?.id).subscribe({
      next: (data) => {
        this.signaturesTotals = data;
      }
    })
  }

}
