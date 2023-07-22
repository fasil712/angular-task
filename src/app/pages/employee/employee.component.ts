import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Employee } from 'src/app/models/employee-position';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  positions: any[] = [];

  //Mapping forign key
  roleNameMap: Map<number, string> = new Map();
  isDeleting: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.getRoleNameMap();
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (res) => {
        this.employees = res;
      },
      (err) => {
        alert('Error while feching Employees');
      }
    );
  }
  getRoleNameMap() {
    this.positionService.getPositions().subscribe(
      (res) => {
        this.positions = res;
        for (let i = 0; i < res.length; i++) {
          this.roleNameMap.set(this.positions[i].id, this.positions[i].name);
        }
      },
      (err) => {
        alert('Error while feching positions');
      }
    );
  }
  deletePositionConfirm(item: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete '${item.userName}'?`,
      nzContent: `<b style="color: red;">${item.description}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.employeeService.deleteEmployee(item.id).subscribe((res) => {
          this.isDeleting = true;
          this.getEmployees();
          setTimeout(() => {
            this.isDeleting = false;
          }, 4000);
        });
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
