import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {
  private team: FirebaseObjectObservable<any>;
  private isSaving: boolean;
  @ViewChild('teamForm') private form: NgForm;

  name: string;
  mission: string;
  people: Array<any>

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private db: AngularFireDatabase) { }

  ionViewDidEnter(): void {
    this.getTeam();
    this.getPeople();
  }

  ionViewCanLeave(): boolean | Promise<void> {
    return !this.form.dirty || this.isSaving || this.confirmCancel();
  }

  save(): void {
    this.isSaving = true;
    const promises = this.saveMembers();
    promises.push(this.saveTeam());
    Promise.all(promises)
      .then(() => this.navCtrl.pop()
        .then(() => this.isSaving = false));
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

  // The "take(1)" calls avoid having to deal with complex scenarios such as what to do if user A
  // is editing a team and user B adds or modifies people (the former cannot be done in this demo
  // app but if it could...). This is just a simplification that would probaby need to be dealt
  // with more elegantly in a production app.
  private getTeam() {
    this.team = this.db.object(`/teams/${this.navParams.data.key}`);
    this.team.take(1).subscribe((team) => {
      this.name = team.name;
      this.mission = team.mission;
    });
  }

  private getPeople() {
    this.db.list('/people')
      .mergeMap(() => this.db.list('/teamMembers', {
        query: {
          orderByChild: 'teamKey',
          equalTo: this.navParams.data.key
        }
      }), (people, members) => this.mapTeamMembers(people, members))
      .take(1).subscribe(p => this.people = p);
  }

  private mapTeamMembers(people: Array<any>, teamMembers: Array<any>) {
    return people.map((p) => {
      const tm = teamMembers.find(t => t.personKey === p.$key);
      return {
        personKey: p.$key,
        firstName: p.firstName,
        lastName: p.lastName,
        isSelected: !!tm,
        memberKey: tm && tm.$key
      };
    });
  }

  private saveMembers(): Array<any> {
    const ops = [];
    this.people.forEach(p => {
      if (p.isSelected && !p.memberKey) {
        ops.push(this.db.list('/teamMembers').push({
          personKey: p.personKey,
          teamKey: this.navParams.data.key
        }));
      } else if (!p.isSelected && p.memberKey) {
        ops.push(this.db.object(`/teamMembers/${p.memberKey}`).remove());
      }
    });

    return ops;
  }

  private saveTeam(): any {
    return this.team.set({
      name: this.name,
      mission: this.mission
    });
  }
}
