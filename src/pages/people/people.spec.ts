import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController } from 'ionic-angular/index';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { PeoplePage } from './people';
import { PlatformMock } from '../../../test-config/mocks-ionic';

class AngularFireDatabaseMock {
  list(c: string): Observable<Array<any>> {
    return Observable.empty();
  }
}

describe('PeoplePage', function() {
  let headerElement: DebugElement;
  let contentElement: DebugElement;
  let page: PeoplePage;
  let fixture: ComponentFixture<PeoplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeoplePage],
      imports: [
        IonicModule.forRoot(PeoplePage)
      ],
      providers: [
        NavController,
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeoplePage);
    page = fixture.componentInstance;
    headerElement = fixture.debugElement.query(By.css('ion-header'));
    contentElement = fixture.debugElement.query(By.css('ion-content'));
  });

  it('should create component', () => expect(page).toBeDefined());

  describe('on entry', () => {
    it('gets the people', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      spyOn(db, 'list').and.callThrough();
      page.ionViewDidEnter();
      expect(db.list).toHaveBeenCalledTimes(1);
      expect(db.list).toHaveBeenCalledWith('/people');
    });
  });

  describe('on leave', () => {
    it('unsubscribes', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      const subscription = { unsubscribe: function() { } };
      const obs = Observable.of([]);
      spyOn(db, 'list').and.returnValue(obs);
      spyOn(obs, 'subscribe').and.returnValue(subscription);
      page.ionViewDidEnter();
      spyOn(subscription, 'unsubscribe');
      page.ionViewDidLeave();
      expect(subscription.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('header', () => {
    it('exists', () => { expect(headerElement).toBeDefined() });

    it('should display "People"', () => {
      const titleElement = headerElement.query(By.css('ion-title'));
      expect(titleElement.nativeElement.innerText.trim()).toEqual('People');
    });
  });

  describe('content', () => {
    beforeEach(() => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      spyOn(db, 'list').and.returnValue(Observable.of([{
        firstName: 'Testy',
        lastName: 'McTesterson',
        title: 'Replacement'
      }, {
        firstName: 'Fakey',
        lastName: 'Fakepants',
        title: 'Fill In'
      }, {
        firstName: 'Jimmy',
        lastName: 'Jamerson',
        title: 'Stand In'
      }, {
        firstName: 'Grouch',
        lastName: 'Smith',
        title: 'Stunt Double'
      }]));
      page.ionViewDidEnter();
      fixture.detectChanges();
    });

    it('exists', () => { expect(contentElement).toBeDefined() });

    it('contains an ion-item button for each person', () => {
      const itemElements = contentElement.queryAll(By.css('button[ion-item=""]'));
      expect(itemElements.length).toEqual(4);
    });
  });
});
