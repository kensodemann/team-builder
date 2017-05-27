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
  });

  describe('header', () => {
    it('exists', () => { expect(headerElement).toBeDefined() });

    it('should display "Person"', () => {
      const titleElement = headerElement.query(By.css('ion-title'));
      expect(titleElement.nativeElement.innerText.trim()).toEqual('Person');
    });
  });
});
