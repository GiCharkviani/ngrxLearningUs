import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries.component';
import { CountriesRoutingModule } from './countries-routing.module';

@NgModule({
  declarations: [CountriesComponent],
  imports: [CommonModule, CountriesRoutingModule],
})
export class CountriesModule {}
