import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { personReducer } from './store/person.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PersonEffects } from './store/person.effects';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PersonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature('persons', personReducer),
    EffectsModule.forFeature([PersonEffects]),
  ],
})
export class PersonModule {}
