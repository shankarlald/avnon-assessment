import { Question } from './../../app';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  questionForm!: FormGroup;
  questionTypes = [
    { label: 'Paragraph', value: 'paragraph' },
    { label: 'Checkbox', value: 'checkbox' },
  ];
  isFormSubmitted = false;

  constructor(
    readonly formBuilder: FormBuilder,
    readonly dialogRef: MatDialogRef<QuestionsComponent>,
    @Inject(MAT_DIALOG_DATA) public question: any
  ) {}

  ngOnInit(): void {
    this.createQuestionForm();
  }

  createQuestionForm(): void {
    this.questionForm = this.formBuilder.group({
      type: ['paragraph', Validators.required], // paragraph or checkbox
      question: ['', Validators.required],
      options: this.formBuilder.array([]),
      answer: '',
    });
  }

  onTypeSelection(selectEvent: MatSelectChange): void {
    if (selectEvent.value === 'paragraph') {
      this.options.clear();
    } else {
      this.addOption();
    }
  }

  addOption(): void {
    this.options.push(
      this.formBuilder.group({ value: ['', Validators.required] })
    );
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.isFormSubmitted = true;
    this.questionForm.markAllAsTouched();
    const quesObj: Question = this.questionForm.getRawValue();
    const isOptionsValid =
      quesObj.type === 'checkbox' && !quesObj.options.length;
    if (this.questionForm.invalid || isOptionsValid) {
      return;
    }
    quesObj.options.push({ value: 'Other', checked: false, otherValue: '' });
    this.dialogRef.close(quesObj);
  }
}
