import { AppService } from './../../app.service';
import { AnswerOption } from './../../app';
import { FormArray, FormBuilder, Form, FormGroup } from '@angular/forms';
import { QuestionsComponent } from './../questions/questions.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Question } from 'src/app/app';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css'],
})
export class BuilderComponent implements OnInit, OnDestroy {
  qnaForm!: FormGroup;
  subscription!: Subscription;

  constructor(
    readonly formBuilder: FormBuilder,
    readonly appService: AppService,
    readonly dialog: MatDialog,
    readonly router: Router
  ) {}

  ngOnInit(): void {
    this.qnaForm = this.formBuilder.group({
      questions: this.formBuilder.array([]),
    });
    this.getQna();
  }

  getQna(): void {
    this.appService.getQna().subscribe((qna) => {
      qna.forEach((q) => this.addQuestion(q));
    });
  }

  openQuestionDialog(): void {
    const questionDialog = this.dialog.open(QuestionsComponent);
    this.subscription = questionDialog
      .afterClosed()
      .subscribe((question: Question) => {
        if (question) {
          this.addQuestion(question);
        }
      });
  }

  addQuestion(question: Question): void {
    const questionFormGroup = this.formBuilder.group({
      type: question.type,
      question: question.question,
      options: this.formBuilder.array([]),
      answer: question.answer || '',
    });
    if (question.type === 'checkbox') {
      this.addOptions(questionFormGroup, question.options);
    }
    this.questions.push(questionFormGroup);
  }

  addOptions(questionFormGroup: FormGroup, options: AnswerOption[]): void {
    const optionsArray = questionFormGroup.get('options') as FormArray;
    options.forEach((option) =>
      optionsArray.push(
        this.formBuilder.group({ value: option.value, checked: option?.checked })
      )
    );
  }

  get questions() {
    return this.qnaForm.get('questions') as FormArray;
  }

  getOptions(index: number) {
    return this.questions.controls[index].get('options') as FormArray;
  }

  reviewAnswers(): void {
    this.appService.setQna(this.qnaForm.value.questions as Question[]);
    this.router.navigate(['/form/answers']);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
