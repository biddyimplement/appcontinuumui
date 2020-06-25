import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {CreateProjectComponent} from './create-project/create-project.component';


const routes: Routes = [
  {
    path:'landing-page',component:LandingPageComponent
  },
  {
    path:'create-project',component:CreateProjectComponent
  },
  {
    path:'',pathMatch:'full',redirectTo:'landing-page'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
