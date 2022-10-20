import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroupierComponent } from './croupier.component';

describe('CroupierComponent', () => {
  let component: CroupierComponent;
  let fixture: ComponentFixture<CroupierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CroupierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CroupierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
