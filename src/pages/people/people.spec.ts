import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController } from 'ionic-angular/index';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { PeoplePage } from './people';
import { PlatformMock } from '../../../test-config/mocks-ionic';

class AngularFireDatabaseMock {
  list(c: string): FirebaseListObservable<Array<any>>{
    return null;
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

  describe('initialization', () => {
    it('gets the people', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      spyOn(db, 'list').and.callThrough();
      page.ngOnInit();
      expect(db.list).toHaveBeenCalledTimes(1);
      expect(db.list).toHaveBeenCalledWith('/people');
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
    // TODO: work out how to mock a firebase connection, and then mock the list getting
    // and verify X ion-item nodes are created
    it('exists', () => { expect(contentElement).toBeDefined() });
  });
});
