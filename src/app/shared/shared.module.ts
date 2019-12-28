import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
  MatSelectModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { ModalComponent } from './modal/modal.component';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  // Material component modules
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatOptionModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatInputModule,
];

@NgModule({
  declarations: [ModalComponent],
  imports: [
    ...modules
  ],
  exports: [
    ModalComponent,
    ...modules
  ]
})
export class SharedModule { }
