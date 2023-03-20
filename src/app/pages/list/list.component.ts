import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  payments!: any[];
  endpoint = environment.apiUrl;

  constructor(
    private api: ApiService,
    private modalService: NzModalService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.api.getList().subscribe((data: any[]) => {
      this.payments = data;
    })
  }

  preview(detail: any) {
    this.modalService.create({
      nzTitle: 'Chi tiết',
      nzContent: DetailComponent,
      nzComponentParams: { data: detail }
    });
  }
  generateData() {
    this.api.generateData().subscribe(()=> {
      this.notification.success('Thành công', 'Tạo mới thông tin thành công!');
      this.api.getList().subscribe((data: any[]) => {
        this.payments = data;
      })
    })
  }
}
