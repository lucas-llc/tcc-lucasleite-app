import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  toast: any;
  loggedUser: any;
  skeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  constructor(
    private readonly toastController: ToastController,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  setJWT(token: string): any{
    localStorage.setItem('jwt', token);
  }

  async showToast(style: any, message: any) {
    let cssClass = 'primary';
    switch (style) {
      case 'info': cssClass = 'primary'; break;
      case 'success': cssClass = 'success'; break;
      case 'warning': cssClass = 'warning'; break;
      case 'danger': cssClass = 'danger'; break;
      default: cssClass = 'primary'; break;
    }
    this.toast = await this.toastController.create({ message, duration: 10000, position: 'top', buttons: [{ text: 'OK', role: 'cancel', handler: () => { } },], color: cssClass });
    this.toast.present();
  }

  navWithParams(object: any, url: String) {
    const navigationExtras: NavigationExtras = { state: { object } };
    this.router.navigate([url], navigationExtras);
  }

  getNavParams() {
    return this.route.queryParams.pipe(map(() => {
      let params = this.router.getCurrentNavigation();
      if (params && params.extras.state) {
        return params.extras.state['object'];
      } else {
        return null;
      }
    }));
  }
}
