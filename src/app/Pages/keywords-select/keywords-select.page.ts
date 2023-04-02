import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KeywordsService } from 'src/app/services/keywords/keywords.service';

@Component({
  selector: 'app-keywords-select',
  templateUrl: './keywords-select.page.html',
  styleUrls: ['./keywords-select.page.scss'],
})
export class KeywordsSelectPage implements OnInit {
  @Input() currentKeywords: any;
  loading = true;
  keywords: any;
  newName = '';
  constructor(
    public modalController: ModalController,
    public ks: KeywordsService
  ) { }

  ngOnInit() {
    this.listKeywords();
  }

  listKeywords() {
    this.ks.listKeywords().subscribe((data: any) => {
      if (data && data.length > 0) {
        for (const current of this.currentKeywords) {
          for (const key of data) {
            if (current.id === key.id) {
              key.checked = true;
              break;
            }
          }
        }
      }
      this.keywords = data && data.length ? data : [];
      this.loading = false;
    });
  }

  createNewKeyword() {
    this.loading = true;
    const obj = {
      name: this.newName
    }
    this.ks.create(obj).subscribe({
      next: (data: any) => {
        data.checked = true;
        this.keywords.unshift(data);
        if (!this.isInList(data)) {
          this.currentKeywords.push(data);
        }
        this.newName = '';
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onChangeTag(tag: any) {
    if (tag.checked) {
      if (!this.isInList(tag)) {
        this.currentKeywords.push(tag);
      }
    } else {
      this.loading = true;
      for (let index = 0; index < this.currentKeywords.length; index++) {
        if (this.currentKeywords[index].id === tag.id) {
          this.currentKeywords.splice(index, 1);
          break;
        }
      }
      this.loading = false;
    }
  }

  isInList(tag: any) {
    if (tag && tag.id) {
      for (const keyword of this.currentKeywords) {
        if (tag.id === keyword.id) {
          return true;
        }
      }
    }
    return false;
  }

  dismissModal(reload = false) {
    this.modalController.dismiss(reload);
  }

}
