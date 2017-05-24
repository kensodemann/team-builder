import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TabsPage } from './tabs';
import { IonicModule, Platform, NavController } from 'ionic-angular/index';
import { PlatformMock } from '../../../test-config/mocks-ionic';

describe('TabsPage', function() {
  let tabsContainer: DebugElement;
  let page: TabsPage;
  let fixture: ComponentFixture<TabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsPage],
      imports: [
        IonicModule.forRoot(TabsPage)
      ],
      providers: [
        NavController,
        { provide: Platform, useClass: PlatformMock }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    page = fixture.componentInstance;
    tabsContainer = fixture.debugElement.query(By.css('ion-tabs'));
  });

  it('should create component', () => expect(page).toBeDefined());

  it('should have three tabs', () => {
    expect(tabsContainer.queryAll(By.css('ion-tab')).length).toEqual(3);
    expect(page.tab1Root).toBeDefined();
    expect(page.tab2Root).toBeDefined();
    expect(page.tab3Root).toBeDefined();
  });
});
