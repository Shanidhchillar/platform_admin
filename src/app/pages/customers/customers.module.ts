import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
// import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  imports: [
    // Other modules
    MatIconModule,
    // MatSortModule,
    HttpClientModule
    
  ],
  // Other configurations
})
export class CustomersModule { }
