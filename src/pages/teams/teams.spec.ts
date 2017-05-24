import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController } from 'ionic-angular/index';

import { TeamsPage } from './teams';
import { PlatformMock } from '../../../test-config/mocks-ionic';

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

  describe('header', () => {
    it('exists', () => { expect(headerElement).toBeDefined() });

    it('should display "Teams"', () => {
      const titleElement = headerElement.query(By.css('ion-title'));
      expect(titleElement.nativeElement.innerText.trim()).toEqual('Teams');
    });
  });

  describe('content', () => {
    it('exists', () => { expect(contentElement).toBeDefined() });
  });
});
