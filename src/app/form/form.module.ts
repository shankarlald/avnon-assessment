import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder/builder.component';
import { AnswersComponent } from './answers/answers.component';
import { FormRoutingModule } from './form-routing.module';

@NgModule({
  declarations: [BuilderComponent, AnswersComponent],
  imports: [CommonModule, FormRoutingModule],
})
export class FormModule {}
