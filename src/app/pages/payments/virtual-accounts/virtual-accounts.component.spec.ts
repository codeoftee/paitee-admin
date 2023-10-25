import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualAccountsComponent } from './virtual-accounts.component';

describe('VirtualAccountsComponent', () => {
  let component: VirtualAccountsComponent;
  let fixture: ComponentFixture<VirtualAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
