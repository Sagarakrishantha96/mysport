import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminteamComponent } from './adminteam.component';

describe('AdminteamComponent', () => {
  let component: AdminteamComponent;
  let fixture: ComponentFixture<AdminteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
