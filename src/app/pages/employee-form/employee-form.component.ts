import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Observer } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  positions: any = [];
  isDeleting = false;
  isSubmmiting: any;

  constructor(
    private fb: FormBuilder,
    private positionService: PositionService,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      roleId: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getPositions();
  }
  submitForm(): void {
    if (this.employeeForm.valid) {
      var employeeList = {
        userName: this.employeeForm.value.userName,
        email: this.employeeForm.value.email,
        password: this.employeeForm.value.password,
        roleId: +this.employeeForm.value.roleId,
        description: this.employeeForm.value.description + ' Description',
      };
      this.employeeService.createEmployee(employeeList).subscribe((res) => {
        this.isSubmmiting = true;
        setTimeout(() => {
          this.isSubmmiting = false;
        }, 4000);
        // Handle success, e.g., show a success message or navigate to another page
      });
    }
  }

  getPositions() {
    this.positionService.getPositions().subscribe(
      (res) => {
        this.positions = res;
      },
      (err) => {
        alert('Error while feching positions');
      }
    );
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.employeeForm.reset();
    for (const key in this.employeeForm.controls) {
      if (this.employeeForm.controls.hasOwnProperty(key)) {
        this.employeeForm.controls[key].markAsPristine();
        this.employeeForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.employeeForm.controls['confirm'].updateValueAndValidity()
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.employeeForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
