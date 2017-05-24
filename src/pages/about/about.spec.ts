import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule, Platform, NavController } from 'ionic-angular/index';

import { AboutPage } from './about';
import { PlatformMock } from '../../../test-config/mocks-ionic';

describe('AboutPage', function() {
  let headerElement: DebugElement;
  let contentElement: DebugElement;
  let page: AboutPage;
  let fixture: ComponentFixture<AboutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPage],
      imports: [
        IonicModule.forRoot(AboutPage)
      ],
      providers: [
        NavController,
        { provide: Platform, useClass: PlatformMock }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPage);
    page = fixture.componentInstance;
    headerElement = fixture.debugElement.query(By.css('ion-header'));
    contentElement = fixture.debugElement.query(By.css('ion-content'));
  });

  it('should create component', () => expect(page).toBeDefined());

  describe('header', () => {
    it('exists', () => { expect(headerElement).toBeDefined() });

    it('should display "About"', () => {
      const titleElement = headerElement.query(By.css('ion-title'));
      expect(titleElement.nativeElement.innerText.trim()).toEqual('About');
    });
  });

  describe('content', () => {
    it('exists', () => { expect(contentElement).toBeDefined() });
  });
});
