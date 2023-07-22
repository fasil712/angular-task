import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionService } from 'src/app/services/position.service';
@Component({
  selector: 'app-employee-positions',
  templateUrl: './employee-positions.component.html',
  styleUrls: ['./employee-positions.component.scss'],
})
export class EmployeePositionComponent implements OnInit {
  employees: any[] = [];
  positions: any[] = [];
  positionParamId: number = 0;
  onePositionData: any = [];
  isDeleting: boolean = false;
  //Mapping forign key
  roleNameMap: Map<number, string> = new Map();
  constructor(
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private modal: NzModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.positionParamId = Number(this.route.snapshot.paramMap.get('id'));
    this.positionService.getPosition(this.positionParamId).subscribe((res) => {
      this.onePositionData = res;
    });
    this.getEmployeePosition();
    this.getRoleNameMap();
  }

  getEmployeePosition() {
    this.employeeService.getAllEmployees().subscribe(
      (res) => {
        this.employees = res.filter(
          (Employee: { roleId: number }) =>
            Employee.roleId == this.positionParamId
        );
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
          this.getEmployeePosition();
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
