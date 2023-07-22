import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss'],
})
export class PositionFormComponent implements OnInit {
  positionForm!: FormGroup;
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser?: string;
  isLoading = false;
  isSubmmiting = false;
  positions: any;

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }
  constructor(
    private formBuilder: FormBuilder,
    private positionService: PositionService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getPositions();
  }

  buildForm(): void {
    this.positionForm = this.formBuilder.group({
      name: ['', [Validators.required], [this.nameAsyncValidator]],
      description: ['', Validators.required],
      parentId: ['', [Validators.required], [this.parentIdAsyncValidator]],
    });
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
    this.positionForm.reset();
    for (const key in this.positionForm.controls) {
      if (this.positionForm.controls.hasOwnProperty(key)) {
        this.positionForm.controls[key].markAsPristine();
        this.positionForm.controls[key].updateValueAndValidity();
      }
    }
  }

  onSubmit(): void {
    if (this.positionForm.valid) {
      var positionList = {
        name: this.positionForm.value.name,
        description: this.positionForm.value.description,
        parentId: +this.positionForm.value.parentId,
      };
      console.log(positionList);
      this.positionService.createPosition(positionList).subscribe((res) => {
        this.isSubmmiting = true;
        setTimeout(() => {
          this.isSubmmiting = false;
        }, 4000);
        // Handle success, e.g., show a success message or navigate to another page
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  nameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        this.positions.filter((position: { name: string }) => {
          // console.log(position.name);
          if (control.value === position.name) {
            // you have to return `{error: true}` to mark it as an error event
            observer.next({ error: true, duplicated: true });
          } else {
            observer.next(null);
          }
          observer.complete();
        });
      }, 1000);
    });
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  parentIdAsyncValidator = (control: FormControl) =>
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
}
