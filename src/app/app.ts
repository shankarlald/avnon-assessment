export class Question {
  type!: string;
  question!: string;
  options!: AnswerOption[];
  answer!: string;
}

export class AnswerOption {
  value!: string;
  checked!: boolean;
  otherValue!: string;
}
