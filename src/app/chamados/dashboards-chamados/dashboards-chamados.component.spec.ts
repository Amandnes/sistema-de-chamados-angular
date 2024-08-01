import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsChamadosComponent } from './dashboards-chamados.component';

describe('DashboardsChamadosComponent', () => {
  let component: DashboardsChamadosComponent;
  let fixture: ComponentFixture<DashboardsChamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardsChamadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardsChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
