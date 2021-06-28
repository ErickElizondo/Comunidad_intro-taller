import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListEjerciciosComponent } from './list-ejercicios.component';

describe('ListEjerciciosComponent', () => {
  let component: ListEjerciciosComponent;
  let fixture: ComponentFixture<ListEjerciciosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEjerciciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
