import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  private question_record: Array<any> = [];
  public queData: any[];
  public editQuestionIndexVal: number;
  public edit: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.question_data();
  }

  questionForm = this.formBuilder.group({
    question: ['', Validators.required],
    option_a: ['', Validators.required],
    option_b: ['', Validators.required],
    option_c: ['', Validators.required],
    correct_option: ['', Validators.required],
  });

  get f() {
    return this.questionForm.controls;
  }

  question_data() {
    this.queData = JSON.parse(localStorage.getItem('question_data'));
    console.log('questiondata', this.queData);
  }

  clickAddQuestion() {
    this.questionForm.reset();
  }

  clear() {
    this.questionForm.reset();
  }

  onAddQuestion() {
    this.edit = false;
    console.log(this.questionForm.value);
    this.question_record = JSON.parse(localStorage.getItem('question_data'))
      ? JSON.parse(localStorage.getItem('question_data'))
      : [];
    this.question_record.push(this.questionForm.value);
    localStorage.setItem('question_data', JSON.stringify(this.question_record));
    this.question_data();
  }

  deleteQuestion(row, i) {
    let questionList = JSON.parse(localStorage.getItem('question_data'));
    // console.log('aaaa', row)
    questionList = questionList.filter((val) => questionList.indexOf(val) != i);
    // console.log('after del', questionList)
    localStorage.setItem('question_data', JSON.stringify(questionList));
    this.question_data();
  }

  clickEditQuestion(row, i) {
    this.edit = true;
    console.log('clickeddd', row);
    this.editQuestionIndexVal = i;
    this.questionForm.setValue(row);
  }

  onUpdate() {
    let questionList = JSON.parse(localStorage.getItem('question_data'));
    questionList[this.editQuestionIndexVal] = this.questionForm.value;
    localStorage.setItem('question_data', JSON.stringify(questionList));
    this.question_data();
    this.edit = false;
  }
}
