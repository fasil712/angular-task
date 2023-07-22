import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PositionService } from '../../services/position.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss'],
})
export class PositionListComponent implements OnInit {
  positions: any[] = [];
  isDeleting = false;

  //Mapping forign key
  parentPositionMap: Map<number, string> = new Map();

  constructor(
    private positionService: PositionService,
    private router: Router,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getPositions();
  }

  getPositions() {
    this.positionService.getPositions().subscribe(
      (res) => {
        this.positions = res;
        for (let i = 0; i < res.length; i++) {
          this.parentPositionMap.set(
            this.positions[i].id,
            this.positions[i].name
          );
        }
      },
      (err) => {
        alert('Error while feching positions');
      }
    );
  }

  navigateToDetails(id: number): void {
    this.router.navigate(['/employees-positions', id]);
  }

  deletePositionConfirm(item: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete '${item.name}' position?`,
      nzContent: `<b style="color: red;">${item.description}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.positionService.deletePosition(item.id).subscribe((res) => {
          this.isDeleting = true;
          this.getPositions();
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
