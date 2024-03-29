import { Routes } from '@angular/router';

import { HomeComponent } from '../../pages/home/home.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { UserComponent } from 'app/pages/user/user.component';
import { DoctorsComponent } from 'app/pages/doctors/doctors.component';
import { CustomersComponent } from 'app/pages/customers/customers.component';
import { CreateDoctorComponent } from 'app/pages/doctors/CreateDoctor/CreateDoctor.component';
import { ReportComponent } from 'app/pages/report/report.component';
import { BankComponent } from 'app/pages/bank/bank.component';
import { DepartmentsComponent } from 'app/pages/departments/departments.component';
import { EditDoctorComponent } from 'app/pages/doctors/EditDoctor/editDoctor.component';
import { DoctorDetailsComponent } from 'app/pages/doctors/DoctorDetails/DoctorDetails.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'doctor',          component: DoctorsComponent },
    { path: 'customer',     component: CustomersComponent },
    { path: 'create_doctor',   component: CreateDoctorComponent},
    { path: 'departments',     component: DepartmentsComponent},
    { path: 'report',     component: ReportComponent },
    { path: 'bank',          component: BankComponent },
    { path: 'edit_doctor',           component: EditDoctorComponent },
    { path: 'doctor_details',      component:DoctorDetailsComponent}
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];
