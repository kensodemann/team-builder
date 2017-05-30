import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController, NavParams } from 'ionic-angular/index';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { PersonPage } from './person';
import { PlatformMock } from '../../../test-config/mocks-ionic';

class AngularFireDatabaseMock {
  object(c: string): Observable<any> {
    return Observable.empty();
  }

  list(c: string, q?: any): Observable<any> {
    return Observable.of([]);
  }
}

class NavParamsMock {
  data: any
}

describe('PeoplePage', function() {
  let headerElement: DebugElement;
  let contentElement: DebugElement;
  let page: PersonPage;
  let fixture: ComponentFixture<PersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonPage],
      imports: [
        IonicModule.forRoot(PersonPage)
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
    fixture = TestBed.createComponent(PersonPage);
    page = fixture.componentInstance;
    headerElement = fixture.debugElement.query(By.css('ion-header'));
    contentElement = fixture.debugElement.query(By.css('ion-content'));
  });

  it('should create component', () => expect(page).toBeDefined());

  describe('on entry', () => {
    it('gets the person', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      const navParams = fixture.debugElement.injector.get(NavParams);
      navParams.data = { key: 'kky7342-1138' };
      spyOn(db, 'object').and.callThrough();
      page.ionViewDidEnter();
      expect(db.object).toHaveBeenCalledTimes(1);
      expect(db.object).toHaveBeenCalledWith('/people/kky7342-1138');
    });

    it('unpacks the person', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      const navParams = fixture.debugElement.injector.get(NavParams);
      navParams.data = { key: 'kky7342-1138' };
      spyOn(db, 'object').and.returnValue(Observable.of({
        firstName: 'Oscar',
        lastName: "O'Grouchy",
        emailAddress: 'oscar@testme.org',
        phoneNumber: '953.995.9829',
        title: 'Dweller of Garbage'
      }));
      page.ionViewDidEnter();
      expect(page.firstName).toEqual('Oscar');
      expect(page.lastName).toEqual("O'Grouchy");
      expect(page.emailAddress).toEqual('oscar@testme.org');
      expect(page.phoneNumber).toEqual('953.995.9829');
      expect(page.title).toEqual('Dweller of Garbage');
    });

    it('gets the teams and membership information', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      const navParams = fixture.debugElement.injector.get(NavParams);
      navParams.data = { key: 'kky7342-1138' };
      spyOn(db, 'list').and.callThrough();
      page.ionViewDidEnter();
      expect(db.list).toHaveBeenCalledTimes(2);
      expect(db.list).toHaveBeenCalledWith('/teams');
      expect(db.list).toHaveBeenCalledWith('/teamMembers', {
        query: {
          orderByChild: 'personKey',
          equalTo: 'kky7342-1138'
        }
      });
    });

    it('builds the teams', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      const navParams = fixture.debugElement.injector.get(NavParams);
      navParams.data = { key: 'kky7342-1138' };
      spyOn(db, 'list').and.returnValues(Observable.of([{
        $key: '1',
        name: 'Sun Gods',
        mission: 'Provide Warmth and Goodness'
      }, {
        $key: '2',
        name: 'Ice Wraiths',
        mission: 'Freeze the World'
      }, {
        $key: '3',
        name: 'Flower Children',
        mission: 'Make People Sneeze'
      }, {
        $key: '4',
        name: 'Kittens',
        mission: 'Be Cute and Furry'
      }]), Observable.of([{
        $key: 'A',
        personKey: 'kky7342-1138',
        teamKey: '3'
      }, {
        $key: 'B',
        personKey: 'kky7342-1138',
        teamKey: '2'
      }]));
      page.ionViewDidEnter();
      expect(page.teams).toEqual(['Flower Children', 'Ice Wraiths']);
    });

    it('sets the teams to "none" if the person belongs to no teams', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      const navParams = fixture.debugElement.injector.get(NavParams);
      navParams.data = { key: 'kky7342-1138' };
      spyOn(db, 'list').and.returnValues(Observable.of([{
        $key: '1',
        name: 'Sun Gods',
        mission: 'Provide Warmth and Goodness'
      }, {
        $key: '2',
        name: 'Ice Wraiths',
        mission: 'Freeze the World'
      }, {
        $key: '3',
        name: 'Flower Children',
        mission: 'Make People Sneeze'
      }, {
        $key: '4',
        name: 'Kittens',
        mission: 'Be Cute and Furry'
      }]), Observable.of([]));
      page.ionViewDidEnter();
      expect(page.teams).toEqual(['None']);
    });
  });

  describe('header', () => {
    it('exists', () => { expect(headerElement).toBeDefined() });

    it('should display "Person"', () => {
      const titleElement = headerElement.query(By.css('ion-title'));
      expect(titleElement.nativeElement.innerText.trim()).toEqual('Person');
    });
  });
});
