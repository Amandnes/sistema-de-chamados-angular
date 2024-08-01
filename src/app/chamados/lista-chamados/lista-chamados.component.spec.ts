import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaChamadosComponent } from './lista-chamados.component';

describe('ListaChamadosComponent', () => {
  let component: ListaChamadosComponent;
  let fixture: ComponentFixture<ListaChamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaChamadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
