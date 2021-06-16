import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingtourComponent } from './ongoingtour.component';

describe('OngoingtourComponent', () => {
  let component: OngoingtourComponent;
  let fixture: ComponentFixture<OngoingtourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingtourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingtourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
