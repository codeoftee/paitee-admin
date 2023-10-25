import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectTransferComponent } from './direct-transfer.component';

describe('DirectTransferComponent', () => {
  let component: DirectTransferComponent;
  let fixture: ComponentFixture<DirectTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
