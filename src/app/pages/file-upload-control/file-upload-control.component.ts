import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { v4 } from 'uuid';

@Component({
  selector: 'app-file-upload-control',
  templateUrl: './file-upload-control.component.html',
  styleUrls: ['./file-upload-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadControlComponent),
      multi: true
    },
  ]
})
export class FileUploadControlComponent implements OnInit, ControlValueAccessor {
  @ViewChild('attachment', { static: false }) attachment!: ElementRef;
  @Input() type!: string;
  @Output() uploaded = new EventEmitter();
  url: any;
  file!: any;
  inputId = v4();

  onChangeFn: (val: any) => void = () => void 0;
  onTouchedFn: () => void = () => void 0;

  get content() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  constructor(
    private sanitizer: DomSanitizer,
  ) {
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn
  }

  ngOnInit(): void { }

  writeValue(obj: any) {
    this.url = obj;
  }

  onFileChanged($event: any) {
    const file = ($event.target as HTMLInputElement).files![0];
    this.attachment.nativeElement.value = '';

    this.file = file;

    // if (this.type === 'image') {
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event) => {
      this.url = event.target!.result;
      this.uploaded.emit(this.url);
      this.onChangeFn(this.file);
    };
    // } else {
    //   this.url = this.file.name;
    //   this.uploaded.emit(this.url);
    //   this.onChangeFn(this.file);
    // }

  }

  removeFile() {
    this.url = null;
    this.file = undefined;
    this.onChangeFn(this.file);
  }
}
