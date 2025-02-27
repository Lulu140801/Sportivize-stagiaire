import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytournamentComponent } from './mytournament.component';

describe('MytournamentComponent', () => {
  let component: MytournamentComponent;
  let fixture: ComponentFixture<MytournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MytournamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MytournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
