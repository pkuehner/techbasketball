import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BlogPostService} from '../service/blog-post.service';
import {BlogPost} from '../models/blog-post';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-author-post',
    templateUrl: './author-post.component.html',
    styleUrls: ['./author-post.component.css']
})
export class AuthorPostComponent implements OnInit {
    public post: BlogPost;
    public processing: boolean = false;
    public submitted: boolean = false;
    public success: boolean = false;
    public failure: boolean = false;
    images: any;
    myForm: FormGroup;


    constructor(private postService: BlogPostService) {
        this.images = [];

        this.myForm = new FormGroup({

            name: new FormControl('', [Validators.required, Validators.minLength(3)]),

            file: new FormControl('', [Validators.required]),

            fileSource: new FormControl('', [Validators.required])

        });
    }

    get f() {

        return this.myForm.controls;

    }

    ngOnInit() {
        this.post = new BlogPost();
    }

    setFile(file: string) {
        this.post.file = file;
    }

    onFileChange(event) {

        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event: any) => {
                    console.log(event.target.result);
                    this.images.push(event.target.result);
                    this.myForm.patchValue({
                        fileSource: this.images
                    });

                };


                reader.readAsDataURL(event.target.files[i]);

            }
            this.post.file = this.myForm.value;
        }

    }

    public submit(): void {
        this.processing = this.submitted = true;
        this.post.file = '<img class = "img-responsive" src="' + this.myForm.value.fileSource[0] + '" >';
        console.log('submitting blog post: ' + JSON.stringify(this.post));

        this.postService.CreatePost(this.post).subscribe(
            // response => console.log('response on new post: ' + JSON.stringify(response))
            response => {
                // Handle each observable response
                console.log('result: ' + response);
                this.processing = false;
            },
            error => {
                //error response code
                this.processing = false;
                this.failure = true;
            },
            () => {
                //success response code
                this.processing = false;
                this.success = true;
            }
        );
    }
}
