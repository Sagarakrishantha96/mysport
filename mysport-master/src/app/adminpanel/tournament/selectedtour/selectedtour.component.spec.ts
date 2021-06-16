import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedtourComponent } from './selectedtour.component';

describe('SelectedtourComponent', () => {
  let component: SelectedtourComponent;
  let fixture: ComponentFixture<SelectedtourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedtourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedtourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
