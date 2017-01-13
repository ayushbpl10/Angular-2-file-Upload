"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_service_1 = require("./http.service");
require('rxjs/Rx');
var AppComponent = (function () {
    function AppComponent(httpservice) {
        this.httpservice = httpservice;
        this.created = false;
        this.filesToUpload = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        this.servicecall();
        this.created = true;
    };
    AppComponent.prototype.onimageclick = function (event) {
        var _this = this;
        console.log("image clicked");
        console.log(event.target.value);
        var filename = event.target.value;
        console.log("Httpservice invoking");
        this.httpservice.deleteData(filename)
            .subscribe(function (data) {
            console.log(data.value);
            if (data.value == true) {
                _this.servicecall();
            }
        });
    };
    AppComponent.prototype.servicecall = function () {
        var _this = this;
        console.log("Httpservice invoking");
        this.httpservice.getData()
            .subscribe(function (data) {
            console.log(data);
            _this.merged = data;
        });
    };
    AppComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
        this.makeFileRequest("http://localhost:4200/upload", [], this.filesToUpload).then(function (result) {
            console.log(result);
        }, function (error) {
            console.error(error);
        });
        $("#file-input").val("");
        this.servicecall();
    };
    AppComponent.prototype.makeFileRequest = function (url, params, files) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\n    \n\n    <div class=\"image-upload\">\n        <label for=\"file-input\">\n            <img  id=\"dummy\" width=\"200px\" height=\"200px\" src=\"./app/default/xyz.jpg\"/>\n        </label>\n\n        <input id=\"file-input\" (change)=\"fileChangeEvent($event)\" type=\"file\"/>\n    </div>\n\n    <template [ngIf]=\"created == true\">\n    <div id=\"image\" *ngFor=\"let merge of merged\"><img style=\"margin: 20px 0px\" width='200px' height='200px'   id=\"{{merge.filename}}\" name=\"{{merge.filename}}\" src='data:image/jpeg;base64,{{merge.file}}' /><button id=\"btnimg\" class=\"btn btn-danger\" (click)=\"onimageclick($event)\" value=\"{{merge.filename}}\">Delete</button></div>\n    </template>\n  \n    ",
            styles: ["\n\n    .image-upload > input\n        {\n            display: none;\n        }\n    #dummy{\n        cursor: pointer;\n    }\n\n    #image{\n        display:inline;\n    }\n\n    #btnimg{\n        position:relative;\n        top:10px;\n        left:-130px;\n    }\n\n    "],
            providers: [http_service_1.HttpService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map