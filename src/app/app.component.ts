import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  QuestionForm!: FormGroup ;

  constructor(
    private fb: FormBuilder
    ){
    
  }

  ngOnInit(): void {
    this.formInit();

    console.log(this.QuestionForm.value);
  }

  formInit(): void{
    this.QuestionForm =  this.fb.group({
      Questions: this.fb.array([ this.addQuestionFormGroup() ], Validators.compose([Validators.required]))
    });
  }

  addQuestionFormGroup(): FormGroup{
    return this.fb.group({
      Question: ["", Validators.compose([Validators.required])],
      Answers: this.fb.array([ this.addAnswersFormGroup() ], Validators.compose([Validators.required]))
    })
  }

  addAnswersFormGroup(): FormGroup{
    return this.fb.group({
      Answer: ["", Validators.compose([Validators.required])],
    })
  }

  get QuestionFormGroup(){
    return this.QuestionForm.get('Questions') as FormArray
  }

  AddQuestion(): void{
    (<FormArray>this.QuestionForm.get('Questions')).push(this.addQuestionFormGroup());
  }

  removeQuestion(index: number): void{
    (<FormArray>this.QuestionForm.get('Questions')).removeAt(index);
  }

  getAnswersFormGroup(index: number): FormArray{
    return this.QuestionFormGroup.at(index).get('Answers') as FormArray
  }

  AddAnswer(index: number): void{
    (<FormArray>this.QuestionFormGroup.at(index).get('Answers')).push(this.addAnswersFormGroup());
  }

  removeAnswer(i: number, j: number): void{
    (<FormArray>this.QuestionFormGroup.at(i).get('Answers')).removeAt(j);
  }

  AddQuestions(){
    console.log(this.QuestionForm.value);
    window.alert("Successfully submitted")
  }
  
}
