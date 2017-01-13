import { Component,Pipe,OnInit,ElementRef,Renderer} from '@angular/core';
import { HttpService } from "./http.service";

import 'rxjs/Rx';

declare const $:any; 



@Component({
    selector: 'my-app',
    template: `

    

    <div class="image-upload">
        <label for="file-input">
            <img  id="dummy" width="200px" height="200px" src="./app/default/xyz.jpg"/>
        </label>

        <input id="file-input" (change)="fileChangeEvent($event)" type="file"/>
    </div>

    <template [ngIf]="created == true">
    <div id="image" *ngFor="let merge of merged"><img style="margin: 20px 0px" width='200px' height='200px'   id="{{merge.filename}}" name="{{merge.filename}}" src='data:image/jpeg;base64,{{merge.file}}' /><button id="btnimg" class="btn btn-danger" (click)="onimageclick($event)" value="{{merge.filename}}">Delete</button></div>
    </template>
  
    `,

    styles: [`

    .image-upload > input
        {
            display: none;
        }
    #dummy{
        cursor: pointer;
    }

    #image{
        display:inline;
    }

    #btnimg{
        position:relative;
        top:10px;
        left:-130px;
    }

    `],
   providers:[HttpService]
    
})
export class AppComponent implements OnInit { 
        created = false;
     filesToUpload: Array<File>;
                  merged: any;
                  returnvalue:any;
    constructor(private httpservice: HttpService) {
        this.filesToUpload = [];
            
    }   


    
    ngOnInit() : any{ 
        
        
        this.servicecall();

        this.created = true;

     }

     onimageclick(event:any){
         console.log("image clicked");
         console.log(event.target.value);
         var filename = event.target.value;
         console.log("Httpservice invoking");
             this.httpservice.deleteData(filename)
                    .subscribe(data =>{
                        console.log(data.value);
                        if(data.value==true){
                            this.servicecall();
                        }
                    });

     }

      
 servicecall(){
     console.log("Httpservice invoking");
             this.httpservice.getData()
        .subscribe(data =>{
            console.log(data);
            this.merged = data;
        });
 }
  
 
    fileChangeEvent(fileInput: any){

        
        this.filesToUpload = <Array<File>> fileInput.target.files;
        this.makeFileRequest("http://localhost:4200/upload", [], this.filesToUpload).then((result) => {
        
        console.log(result); 
       
                

        }, (error) => {
        console.error(error);
        });

        
        $("#file-input").val("");

        this.servicecall();
    }
           

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }


 
}
