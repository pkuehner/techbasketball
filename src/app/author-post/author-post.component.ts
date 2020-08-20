import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {BlogPostService} from "../service/blog-post.service";
import {BlogPost} from "../models/blog-post";

@Component({
  selector: "app-author-post",
  templateUrl: "./author-post.component.html",
  styleUrls: ["./author-post.component.css"]
})
export class AuthorPostComponent implements OnInit {
  public post: BlogPost;
  public processing: boolean = false;
  public submitted: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;

  constructor(private postService: BlogPostService) {
  }

  ngOnInit() {
    this.post = new BlogPost();
  }

  setFile(file: string) {
    this.post.file = file;
  }

  onFileChanged(event) {
    var fileToLoad = event.target.files[0];
    var fileReader = new FileReader();
    let post = this.post;

    fileReader.onload = function (fileLoadedEvent) {
      // @ts-ignore
      var srcData = fileLoadedEvent.target.result; // <--- data: base64

      var newImage = document.createElement('img');
      newImage.src = srcData;

      document.getElementById("imgTest").innerHTML = newImage.outerHTML;
      post.file = document.getElementById("imgTest").innerHTML;
    }
    console.log(fileReader.readAsDataURL(fileToLoad));
    console.log("Converted Base64 version is " + document.getElementById("imgTest").outerHTML);
  }

  public submit(): void {
    this.processing = this.submitted = true;

    console.log("submitting blog post: " + JSON.stringify(this.post));

    this.postService.CreatePost(this.post).subscribe(
      // response => console.log('response on new post: ' + JSON.stringify(response))
      response => {
        // Handle each observable response
        console.log("result: " + response);
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
