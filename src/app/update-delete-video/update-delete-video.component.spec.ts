import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeleteVideoComponent } from './update-delete-video.component';

describe('UpdateDeleteVideoComponent', () => {
  let component: UpdateDeleteVideoComponent;
  let fixture: ComponentFixture<UpdateDeleteVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDeleteVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDeleteVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
