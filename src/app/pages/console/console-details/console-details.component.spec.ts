import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleDetailsComponent } from './console-details.component';

describe('ConsoleDetailsComponent', () => {
  let component: ConsoleDetailsComponent;
  let fixture: ComponentFixture<ConsoleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
