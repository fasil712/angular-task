import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionListComponent } from './pages/position-list/position-list.component';
import { PositionFormComponent } from './pages/position-form/position-form.component';
import { EmployeePositionComponent } from './pages/employee-positions/employee-positions.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { EmployeeComponent } from './pages/employee/employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'positions', pathMatch: 'full' },
  { path: 'positions', component: PositionListComponent },
  { path: 'positions-form', component: PositionFormComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'employees-positions/:id', component: EmployeePositionComponent },
  { path: 'employees-form', component: EmployeeFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
