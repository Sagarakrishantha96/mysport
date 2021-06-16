import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForEmailComponent } from './wait-for-email.component';

describe('WaitForEmailComponent', () => {
  let component: WaitForEmailComponent;
  let fixture: ComponentFixture<WaitForEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitForEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitForEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
