import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from 'app/pages/login/login.component';
import { LoginLayoutRoutes } from './login-layout.routing';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginLayoutRoutes),
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    MatPaginatorModule,
    ReactiveFormsModule, // Add this line
    MatFormFieldModule, // Include MatFormFieldModule if not imported
    MatSelectModule,
    MatTableModule
  ],
  declarations: [
    LoginComponent
  ]
})

export class LoginLayoutModule {}
