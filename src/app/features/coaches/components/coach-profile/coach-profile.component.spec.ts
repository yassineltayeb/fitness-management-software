/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoachProfileComponent } from './coach-profile.component';

describe('CoachProfileComponent', () => {
  let component: CoachProfileComponent;
  let fixture: ComponentFixture<CoachProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoachProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
