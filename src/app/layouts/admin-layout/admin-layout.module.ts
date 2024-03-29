import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../pages/home/home.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorsComponent } from 'app/pages/doctors/doctors.component';
import { CustomersComponent } from 'app/pages/customers/customers.component';
import { ReportComponent } from 'app/pages/report/report.component';
import { UserComponent } from 'app/pages/user/user.component';
import { CreateDoctorComponent } from 'app/pages/doctors/CreateDoctor/CreateDoctor.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { DepartmentsComponent } from 'app/pages/departments/departments.component';
import { BankComponent } from 'app/pages/bank/bank.component';
import { EditDoctorComponent } from 'app/pages/doctors/EditDoctor/editDoctor.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
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
    HomeComponent,
    UserComponent,
    DoctorsComponent,
    CreateDoctorComponent,
    DepartmentsComponent,
    CustomersComponent,
    ReportComponent,
    BankComponent,
    EditDoctorComponent
    // TypographyComponent,
    // IconsComponent,
    // MapsComponent,
    // NotificationsComponent,
    // UpgradeComponent
  ]
})

export class AdminLayoutModule {}
