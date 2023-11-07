import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewService } from 'src/app/services/new.service';

@Component({
  selector: 'new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  accListData!: Observable<any>;
  constructor(private accountantService: NewService) {}
  ngOnInit(): void {
    this.getAccountant();
  }

  getAccountant() {
    this.accListData = this.accountantService.getAccountants();
    // .subscribe((res) => {
    //   console.log(res);
    //   this.accListData = res;
    // });
  }
}
