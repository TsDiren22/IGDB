import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsStudioComponent } from './details-studio.component';

describe('DetailsStudioComponent', () => {
  let component: DetailsStudioComponent;
  let fixture: ComponentFixture<DetailsStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsStudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
