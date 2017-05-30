import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  name: string;
  mission: string;
  people: Array<any>

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) { }

  ionViewDidEnter(): void {
    this.getTeam();
    this.getPeople();
  }

  save(): void {
    const promises = this.saveMembers();
    promises.push(this.saveTeam());
    Promise.all(promises).then(() => this.navCtrl.pop());
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
