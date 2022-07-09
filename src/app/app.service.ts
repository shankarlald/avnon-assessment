import { Question } from './app';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  qna$ = new BehaviorSubject<Question[]>([]);

  constructor() {}

  setQna(questions: Question[]): void {
    this.qna$.next(questions);
  }

  getQna(): Observable<Question[]> {
    return this.qna$.asObservable();
  }
}
