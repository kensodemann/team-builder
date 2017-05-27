import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { Subscription } from 'rxjs/Subscription';

import { PersonPage } from '../person/person';

@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage {
  private peopleSubscription: Subscription;
  people: Array<any>;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase) { }

  ionViewDidEnter() {
    this.peopleSubscription = this.db.list('/people')
      .subscribe(people => this.people = people, err => console.log(err));
  }

  ionViewDidLeave() {
    this.peopleSubscription.unsubscribe();
  }

  editPerson(person: any): void {
    this.navCtrl.push(PersonPage, { key: person.$key });
  }
}
