import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet, PopoverController } from '@ionic/angular';
import { KeywordsService } from 'src/app/services/keywords/keywords.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  loading = false;
  constructor(
    public ks: KeywordsService,
    public modalController: ModalController,
    public util: UtilService,
    public popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.listKeywords();
  }

  listKeywords() {
    this.loading = true;
    this.ks.listKeywords().subscribe({
      next: (data) => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

}
