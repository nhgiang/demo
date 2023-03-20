import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  form!: FormGroup;
  @Input() data!: any;
  endpoint = environment.apiUrl;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null],
      fullName: [null],
      password: [''],
      phone: [null],
      video: [null],
      image: [null],
    });
    this.form.patchValue(this.data)
  }

}
