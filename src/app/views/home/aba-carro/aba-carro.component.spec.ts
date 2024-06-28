import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbaCarroComponent } from './aba-carro.component';

describe('TabCarComponent', () => {
  let component: AbaCarroComponent;
  let fixture: ComponentFixture<AbaCarroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbaCarroComponent]
    });
    fixture = TestBed.createComponent(AbaCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
