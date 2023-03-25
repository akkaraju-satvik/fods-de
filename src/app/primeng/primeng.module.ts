import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule
  ],
  exports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule
  ]
})
export class PrimengModule { }
