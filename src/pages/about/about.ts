import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  displayName: string;
  url: string;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth) { }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.displayName = user.displayName;
        this.url = user.photoURL;
      } else {
        this.displayName = null;
        this.url = null;
      }
    });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
