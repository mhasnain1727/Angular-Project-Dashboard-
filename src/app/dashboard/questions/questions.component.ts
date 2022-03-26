import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {
    this.question_data();
  }

  ngOnInit(): void {}

  private question_record: Array<any> = [];
  edit: boolean = false;
  index_val: number = -1;
  row_question: string;

  questionForm = this.formBuilder.group({
    question: ['', Validators.required],
    option_a: ['', Validators.required],
    option_b: ['', Validators.required],
    option_c: ['', Validators.required],
  });

  get f() {
    return this.questionForm.controls;
  }

  queData: any[];

  question_data() {
    this.queData = JSON.parse(localStorage.getItem('question_data'));
  }

  showAdd!: boolean;
  showUpdate!: boolean;

  clickAddQuestion() {
    this.questionForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  clear() {
    this.questionForm.reset();
  }

  onAddQuestion() {
    console.log(this.questionForm.value);
    this.question_record = JSON.parse(localStorage.getItem('question_data'))
      ? JSON.parse(localStorage.getItem('question_data'))
      : [];
    this.question_record.push(this.questionForm.value);
    localStorage.setItem('question_data', JSON.stringify(this.question_record));
    this.question_data();
  }

  deleteQuestion(row) {
    const oldRecords = localStorage.getItem('question_data');
    const questionList = JSON.parse(oldRecords);
    questionList.splice(
      questionList.findIndex(
        (a: any) => a.question === row.question
      ),
      1
    );
    localStorage.setItem('question_data', JSON.stringify(questionList));
    this.question_data();
  }

  // onEdit(row){
  //   this.edit = true;
  //   this.row_question = row.question;
  //   this.questionForm.controls['question'].setValue(row.question);
  //   this.questionForm.controls['option_a'].setValue(row.option_a);
  //   this.questionForm.controls['option_b'].setValue(row.option_b);
  //   this.questionForm.controls['option_c'].setValue(row.option_c);

  //   for(let i=0; i<this.queData.length; i++){
  //     if(this.row_question == this.queData[i].question){
  //       console.log(i)
  //       this.index_val = i;
  //       break;
  //     }
  //   }
  // }

  // onUpdate(){
  //   this.queData = JSON.parse(localStorage.getItem('question_data'));
  //   this.questionForm.value.question = this.queData[this.index_val].question;
  //   this.questionForm.value.option_a = this.queData[this.index_val].option_a;
  //   this.questionForm.value.option_b = this.queData[this.index_val].option_b;
  //   this.questionForm.value.option_c = this.queData[this.index_val].option_c;
  //   this.queData.pop();
  //   localStorage.setItem('question_data', JSON.stringify(this.question_record));
  // }
}
