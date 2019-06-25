import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluatorComponent } from './evaluator/evaluator.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [

  { path: '', component: StudentComponent },
  { path: 'student', component: StudentComponent },
  { path: 'evaluator', component: EvaluatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
