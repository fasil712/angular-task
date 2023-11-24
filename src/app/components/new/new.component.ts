import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewService } from 'src/app/services/new.service';

@Component({
  selector: 'new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  postListData!: Observable<any>;
  constructor(private postService: NewService) {}
  ngOnInit(): void {
    this.getListofPosts();
  }

  getListofPosts() {
    this.postListData = this.postService.getPosts();
  }
}
