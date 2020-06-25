import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {AppServiceService} from '../app-service.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private fb: FormBuilder,private AppService:AppServiceService, private router:Router) { }
  project = this.fb.group({
    "parent": this.fb.group({
      "artifactid": [''],
      "groupid": [''],
      "version": ['']
    }),
    "javaVersion":['',Validators.required],
    "springbootVersion":['',Validators.required],
    "artifactid":['',Validators.required],
    "groupid":['',Validators.required],
    "version":['',Validators.required],
    "dependencies": this.fb.array([])
  });
  ngOnInit() {    
  }

  get groupid(){
    return this.project.get('parent').get('groupid');
  }

  get artifactid(){
    return this.project.get('parent').get('artifactid');
  }

  get version(){
    return this.project.get('parent').get('version');
  }



  get dependencies(){
    return this.project.get('dependencies') as FormArray;
  }

  addDependency(){
    this.dependencies.push(this.fb.group({
      artifactid: ['',Validators.required],
      groupid: ['',Validators.required],
      version: ['',Validators.required],
    }))
  }
  proceedToNext(data){
    this.AppService.setprojectData(data);
    this.router.navigate(['create-project']);
    console.log(this.project.value);
  }
  showForm:boolean=false;
  viewForm(){
    this.showForm=!this.showForm;
    let scrollingElement = (document.scrollingElement || document.body);
scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

}
