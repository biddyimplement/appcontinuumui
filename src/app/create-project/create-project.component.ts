import {Component, OnInit} from '@angular/core';
import { FormBuilder, Form } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {AppServiceService} from '../../app/app-service.service';
import { element } from 'protractor';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit{

  todo = ['Components','Application'];
  constructor(private fb: FormBuilder, private service: AppServiceService) { }


  project;


  ngOnInit(){
    let projectData=this.service.getprojectData();
    
    this.project = this.fb.group({
      componnetList:this.fb.array([]),
      applicationList:this.fb.array([]),
    })
  }


  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  get dependencies(){
    return this.project.get('dependencies') as FormArray;
  }

  get componentList(){
    return this.project.get('componnetList') as FormArray;
  }

  get applicationList(){
    return this.project.get('applicationList') as FormArray;
  }

  closeItem(index){
    this.componentList.removeAt(index);
  }

  closeApplication(index){
    this.applicationList.removeAt(index);
  }
  showcomponent;
  componentClick(index){
    this.showcomponent=true;
  }
  i=0;j=0;
  componentListTracker=[]
  addComponent(){  

    this.componentList.push(
      this.fb.group({
        artifactid: ['',Validators.required],
        // "count":[this.i++],
        groupid: ['',Validators.required],
        version: ['',Validators.required],
        dependencies: this.fb.array([]),
        component_dependencies: this.fb.array([])
      })
      );
      this.componentListTracker[this.i]=false;
      this.i++;
  }
  applicationListTracker=[];
  addApplicaiton(){
    
    this.applicationList.push(
      this.fb.group({
        "artifactid":['',Validators.required],
        "groupid":['',Validators.required],
        "version":['',Validators.required],
        "resources": this.fb.array([]),
        "dependencies":this.fb.array([]),
        component_dependencies: this.fb.array([])
      })
    );
    this.applicationListTracker[this.j]={"entered":false}
    this.j++;
  }
  

  get componentDependencies(){
    return this.component.get('dependencies') as FormArray;
  }

  get componentInternalDependencies(){
    return this.component.get('component_dependencies') as FormArray;
  }

  // componentDependencies;
  addComponentDependencies(component){
    // this.componentDependencies=component.get('dependencies') as FormArray;
    this.componentDependencies.push(this.fb.group({
      "artifactid":['',Validators.required],
      "groupid":['',Validators.required],
      "version":['',Validators.required]
    }));
  }
  // componentInternalDependencies;
  addComponentInternalDependencies(component){
    // this.componentInternalDependencies=component.get('component_dependencies') as FormArray;
    this.componentInternalDependencies.push(this.fb.group({
      "component_artifactid":['',Validators.required]
    }));
  }

  get applicationDependencies(){
    return this.application.get('dependencies') as FormArray;
  }

  get applicationInternalDependencies(){
    return this.application.get('component_dependencies') as FormArray;
  }

  get applicationResources(){
    return this.application.get('resources') as FormArray;
  }

  addApplicationDependencies(applicaiton){
    this.applicationDependencies.push(this.fb.group({
      "artifactid":['',Validators.required],
      "groupid":['',Validators.required],
      "version":['',Validators.required]
    }));
  }

  addApplicationInternalDependencies(application){
    this.applicationInternalDependencies.push(this.fb.group({
      "component_artifactid":['',Validators.required]
    }));
  }

  addApplicationResources(application){
    this.applicationResources.push(this.fb.group({
      key:['',Validators.required],
      value:['',Validators.required]
    }));
  }
  componentFlag;
  applicationFlag;
  component;
  componentIndex;
  clickComponent(index){
    this.applicationFlag = false;
    this.componentFlag = true;
    this.componentIndex=index;
    if(!this.componentListTracker[index]){
    this.componentList.controls[index].reset();
    this.componentList.controls[index]['controls'].dependencies.controls=[];
    this.componentList.controls[index]['controls'].component_dependencies.controls=[];

    }

    this.component = this.componentList.controls[index];
    console.log(this.component);
  }
  applicationIndex;application
  clickApplication(index){
    this.applicationFlag = true;
    this.componentFlag = false;
    this.applicationIndex=index;
    if(!this.applicationListTracker[index]){
    this.applicationList.controls[index].reset();
    this.applicationList.controls[index]['controls'].dependencies.controls=[];
    this.applicationList.controls[index]['controls'].resources.controls=[];
    this.applicationList.controls[index]['controls'].component_dependencies.controls=[];
    }
    this.application = this.applicationList.controls[index];
    console.log(this.application);
  }

  onRightClick(){
    console.log("right click");
  }

  // clickApplication(i){

  //   console.log("application click");
  // }

  choosenApplication;


  highlight(i){
    // console.log(i);
    if(this.application && this.application.value.component_dependencies.findIndex(data=>{return data.component_artifactid==this.componentList.controls[i].value.artifactid})!==-1){
      return true;
    }else return false;

  }

  onSubmit(component,componentInternalDependencies){
    console.log(component.value);
    // component.controls.entered=true;
    this.componentListTracker[this.componentIndex]=true;
    console.log(componentInternalDependencies)
  }

  onSubmitApplication(applicaiton){
    console.log(applicaiton.value);
    this.applicationListTracker[this.applicationIndex]=true;
  }
 data ={
  "project": {
  	"parent": {
  		"artifactid": "spring-boot-starter-parent",
  		"groupid": "org.springframework.boot",
  		"version": "1.5.3.RELEASE"
  	},
  	"javaVersion": "1.8",
  	"springbootVersion": "2.0.6.RELEASE",
  	"artifactid": "projectE",
  	"groupid": "com.projecta.ms",
  	"version": "0.0.1-SNAPSHOT",
  	"dependencies": [{
  			"artifactid": "spring-boot-starter-web",
  			"groupid": "org.springframework.boot",
  			"version": "${springboot.version}"
  		}
  	],
  	"applications": [{
  			"artifactid": "applicationX",
  			"groupid": "com.applicationX.ms",
  			"version": "0.0.1-SNAPSHOT",
  			"resources": {
   				"port": "9001"
			},
  			"dependencies": [{
  				"artifactid": "spring-data-jpa",
  				"groupid": "org.springframework.data",
  				"version": "2.2.3.RELEASE"
  			}],
  			"component_dependencies": [{
  				"component_artifactid": "componentX"
  			}]
  		}
  	],
  	"components": [{
  			"artifactid": "componentX",
  			"groupid": "com.componentX.ms",
  			"version": "0.0.1-SNAPSHOT",
  			"dependencies": [{
  					"artifactid": "spring-boot-starter-web",
  					"groupid": "org.springframework.boot",
  					"version": "${springboot.version}"
  				}
  			],
  			"component_dependencies": [{
  				"component_artifactid": "componentX1"
  			}]
  		}
  	]
  }
}

  transformApplications(data){
    let reformattedArray = data.map(obj => {
      let rObj = {}
      rObj[obj.key] = obj.value
      return rObj
   });
   return reformattedArray;
  } 
  // arr1= arr.reduce((map, obj) => (map[obj.key] = obj.val, map), {});
  createProject(project){
    console.log(this.project.value);
    let reqData = {}
    
    reqData['project'] = this.service.getprojectData();
    this.project.value.applicationList.forEach(element=>{
      // element.resources = this.transformApplications(element.resources);
      if(element.resources.length>1){
        element.resources = element.resources.reduce((map, obj) => (map[obj.key] = obj.value, map), {});
      }else{
        element.resources = {"port":"9000"}
      }

      // element.resources = {"port":"9000"}
    })
    console.log(this.project.value.applicationList);
    // this.project.value.applicationList.resources = this.transformApplications(this.project.value.applicationList)
    reqData['project']['applications']=this.project.value.applicationList;
    reqData['project']['components']=this.project.value.componnetList;
    console.log(reqData);
    this.service.downloadFile(reqData).subscribe(data => {
      const blob = new Blob([data], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      console.log(blob);
      window.open(url);
    });
  }

}
