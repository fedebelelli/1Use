import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadosPagoDestacacionComponent } from './mercados-pago-destacacion.component';

describe('MercadosPagoDestacacionComponent', () => {
  let component: MercadosPagoDestacacionComponent;
  let fixture: ComponentFixture<MercadosPagoDestacacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadosPagoDestacacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadosPagoDestacacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
