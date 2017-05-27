import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavParams } from 'ionic-angular/index';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { TeamPage } from './team';
import { PlatformMock } from '../../../test-config/mocks-ionic';

class AngularFireDatabaseMock {
  object(c: string): Observable<any> {
    return Observable.empty();
  }

  list(c: string, q?: any): Observable<Array<any>> {
    return Observable.of([]);
  }
}

class NavParamsMock {
  data: any
}

describe('PeoplePage', function() {
  let headerElement: DebugElement;
  let contentElement: DebugElement;
  let page: TeamPage;
  let fixture: ComponentFixture<TeamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamPage],
      imports: [
        IonicModule.forRoot(TeamPage)
      ],
      providers: [
        NavController,
        { provide: NavParams, useClass: NavParamsMock },
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPage);
    page = fixture.componentInstance;
    headerElement = fixture.debugElement.query(By.css('ion-header'));
    contentElement = fixture.debugElement.query(By.css('ion-content'));
  });

  it('should create component', () => expect(page).toBeDefined());

  describe('on entry', () => {
    it('gets the team', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      const navParams = fixture.debugElement.injector.get(NavParams);
      navParams.data = { key: 'kky7342-1138' };
      spyOn(db, 'object').and.callThrough();
      page.ionViewDidEnter();
      expect(db.object).toHaveBeenCalledTimes(1);
      expect(db.object).toHaveBeenCalledWith('/teams/kky7342-1138');
    });

    it('unpacks the team', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      const navParams = fixture.debugElement.injector.get(NavParams);
      navParams.data = { key: 'kky7342-1138' };
      spyOn(db, 'object').and.returnValue(Observable.of({
        name: 'coding cats',
        mission: 'to spread peace love and joy'
      }));
      page.ionViewDidEnter();
      expect(page.name).toEqual('coding cats');
      expect(page.mission).toEqual('to spread peace love and joy');
    });

    it('gets the people and team members', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      const navParams = fixture.debugElement.injector.get(NavParams);
      navParams.data = { key: 'kky7342-1138' };
      spyOn(db, 'list').and.callThrough();
      page.ionViewDidEnter();
      expect(db.list).toHaveBeenCalledTimes(2);
      expect(db.list).toHaveBeenCalledWith('/people');
      expect(db.list).toHaveBeenCalledWith('/teamMembers', {
        query: {
          orderByChild: 'teamKey',
          equalTo: 'kky7342-1138'
        }
      });
    });

    it('creates a list of people, selecting the team members', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      const navParams = fixture.debugElement.injector.get(NavParams);
      navParams.data = { key: 'kky7342-1138' };
      spyOn(db, 'list').and.returnValues(Observable.of([{
        $key: '1',
        firstName: 'Robert',
        lastName: 'Evans'
      }, {
        $key: '2',
        firstName: 'Sally',
        lastName: 'Smith'
      }, {
        $key: '3',
        firstName: 'Jimmy',
        lastName: 'Jefferson'
      }, {
        $key: '4',
        firstName: 'Roberta',
        lastName: 'Robbinson'
      }]), Observable.of([{
        $key: 'A',
        teamKey: 'kky7342-1138',
        personKey: '3'
      }, {
        $key: 'B',
        teamKey: 'kky7342-1138',
        personKey: '2'
      }]));
      page.ionViewDidEnter();
      expect(page.people).toEqual([{
        personKey: '1',
        firstName: 'Robert',
        lastName: 'Evans',
        memberKey: undefined,
        isSelected: false
      }, {
        personKey: '2',
        firstName: 'Sally',
        lastName: 'Smith',
        memberKey: 'B',
        isSelected: true
      }, {
        personKey: '3',
        firstName: 'Jimmy',
        lastName: 'Jefferson',
        memberKey: 'A',
        isSelected: true
      }, {
        personKey: '4',
        firstName: 'Roberta',
        lastName: 'Robbinson',
        memberKey: undefined,
        isSelected: false
      }])
    });
  });

  describe('header', () => {
    it('exists', () => { expect(headerElement).toBeDefined() });

    it('should display "Person"', () => {
      const titleElement = headerElement.query(By.css('ion-title'));
      expect(titleElement.nativeElement.innerText.trim()).toEqual('Team');
    });
  });

  describe('content', () => {
    it('exists', () => { expect(contentElement).toBeDefined() });
  });
});
