import { Component, OnInit } from '@angular/core';
import { UploadImageService } from './../../_services/upload-image.service';


import { ShopService } from './../../_services/shop.service';


@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.css'],
    providers:[UploadImageService]
})
export class UploadImageComponent implements OnInit {
    imageUrl: string = "/assets/images/default-image.png";
    fileToUpload: File = null;
    constructor(
        private imageService : UploadImageService,
        private ShopService: ShopService
        ) { }

    ngOnInit() {}

    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);

        //Show image preview
        var reader = new FileReader();
        reader.onload = (event:any) => {
            this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.fileToUpload);
    }

    OnSubmit(Image){
        
        let Caption = { value: 'Default caption' };
        this.imageService.postFile(Caption.value,this.fileToUpload).subscribe(
            (data: any) =>{
                let imageID = data.ImageID;
                debugger;
                console.log('done');
                Caption.value = null;
                //Image.value = null;
                //this.imageUrl = "/assets/images/default-image.png";

                // Send to subscribers
                this.ShopService.sendImage( imageID );
                this
            }
        );
    }

}