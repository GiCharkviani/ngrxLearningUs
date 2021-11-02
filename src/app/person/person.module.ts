import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [PersonComponent],
  imports: [
    CommonModule,
    PersonRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class PersonModule {}
