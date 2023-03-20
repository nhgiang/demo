import { Component, OnInit } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null],
      fullName: [null],
      bio: [null],
      password: [''],
      phone: [null],
      video: [null],
      image: [null],
    });
  }

  submitForm(): void {
    forkJoin([
      this.api.uploadFile(this.form.value.image),
      this.api.uploadFile(this.form.value.video),
    ]).pipe(
      switchMap(([image, video]) => {
        const data = this.form.value
        return this.api.create({ ...data, image, video });
      }),
    ).subscribe(() => {
      this.notification.success('Thành công', 'Tạo mới thông tin thành công!');
    }
    );
  }

  generateData() {
    this.api.generateData().subscribe(()=> {
      this.notification.success('Thành công', 'Tạo mới thông tin thành công!');
    })
  }
}
