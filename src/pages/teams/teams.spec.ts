import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController } from 'ionic-angular/index';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { TeamsPage } from './teams';
import { PlatformMock } from '../../../test-config/mocks-ionic';

class AngularFireDatabaseMock {
  list(c: string): FirebaseListObservable<Array<any>>{
    return null;
  }
}

describe('TeamsPage', function() {
  let headerElement: DebugElement;
  let contentElement: DebugElement;
  let page: TeamsPage;
  let fixture: ComponentFixture<TeamsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamsPage],
      imports: [
        IonicModule.forRoot(TeamsPage)
      ],
      providers: [
        NavController,
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsPage);
    page = fixture.componentInstance;
    headerElement = fixture.debugElement.query(By.css('ion-header'));
    contentElement = fixture.debugElement.query(By.css('ion-content'));
  });

  it('should create component', () => expect(page).toBeDefined());

  describe('initialization', () => {
    it('gets the teams', () => {
      const db = fixture.debugElement.injector.get(AngularFireDatabase);
      spyOn(db, 'list').and.callThrough();
      page.ngOnInit();
      expect(db.list).toHaveBeenCalledTimes(1);
      expect(db.list).toHaveBeenCalledWith('/teams');
    });
  });

  describe('header', () => {
    it('exists', () => { expect(headerElement).toBeDefined() });

    it('should display "Teams"', () => {
      const titleElement = headerElement.query(By.css('ion-title'));
      expect(titleElement.nativeElement.innerText.trim()).toEqual('Teams');
    });
  });

  describe('content', () => {
    // TODO: work out how to mock a firebase connection, and then mock the list getting
    // and verify X ion-item nodes are created
    it('exists', () => { expect(contentElement).toBeDefined() });
  });
});
