import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {
  private personSubscription: Subscription;
  private person: FirebaseObjectObservable<any>;
  private isSaving: boolean = false;
  @ViewChild('personForm') private form: NgForm;

  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private db: AngularFireDatabase) { }

  ionViewDidEnter(): void {
    this.person = this.db.object(`/people/${this.navParams.data.key}`);
    this.personSubscription = this.person.take(1).subscribe(p => {
      this.firstName = p.firstName;
      this.lastName = p.lastName;
      this.emailAddress = p.emailAddress;
      this.phoneNumber = p.phoneNumber;
      this.title = p.title;
    }, err => console.log(err));
  }

  ionViewCanLeave(): boolean | Promise<void> {
    return !this.form.dirty || this.isSaving || this.confirmCancel();
  }

  save(): void {
    this.isSaving = true;
    this.person.set({
      firstName: this.firstName,
      lastName: this.lastName,
      emailAddress: this.emailAddress,
      phoneNumber: this.phoneNumber,
      title: this.title
    }).then(() => this.navCtrl.pop())
      .then(() => this.isSaving = false);
  }

  private confirmCancel(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.alertCtrl.create({
        title: 'Cancel Updates',
        message: 'Unsaved changes exist. Are you sure you want to cancel without saving?',
        buttons: [
          {
            text: 'Yes',
            handler: () => { resolve(); }
          },
          {
            text: 'No',
            role: 'cancel',
            handler: () => { reject(); }
          }
        ]
      }).present();
    });
  }
}
