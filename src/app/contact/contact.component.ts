
import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ContactFormService} from "../service/contact-form.service";
import {Mail} from "../models/mail";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})


export class ContactComponent implements OnInit {
  public mail: Mail;
  public processing: boolean = false;
  public submitted: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;

  constructor(private contactFormService: ContactFormService) {
  }

  ngOnInit() {
    this.mail = new Mail();
  }



  public submit(): void {
    this.processing = this.submitted = true;

    console.log("submitting blog post: " + JSON.stringify(this.post));

    this.contactFormService.sendMail(this.mail).subscribe(
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
