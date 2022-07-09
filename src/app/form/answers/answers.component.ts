import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { Question } from './../../app';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css'],
})
export class AnswersComponent implements OnInit, OnDestroy {
  qna!: Question[];
  subscription!: Subscription;

  constructor(readonly appService: AppService, readonly router: Router) {}

  ngOnInit(): void {
    this.getQna();
  }

  getQna(): void {
    this.subscription = this.appService
      .getQna()
      .subscribe((qna) => (this.qna = qna));
  }

  backToBuilder(): void {
    this.router.navigate(['/form/builder']);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
