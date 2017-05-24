import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController } from 'ionic-angular/index';

import { PeoplePage } from './people';
import { PlatformMock } from '../../../test-config/mocks-ionic';

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

  describe('header', () => {
    it('exists', () => { expect(headerElement).toBeDefined() });

    it('should display "People"', () => {
      const titleElement = headerElement.query(By.css('ion-title'));
      expect(titleElement.nativeElement.innerText.trim()).toEqual('People');
    });
  });

  describe('content', () => {
    it('exists', () => { expect(contentElement).toBeDefined() });
  });
});
