import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { ApiService } from "./api.service";
import { environment } from "../../environments/environment";
import {  Mail} from "../models/mail";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContactFormService {
  constructor(private apiService: ApiService) {}

  public sendMail(mail: Mail): Observable<any> {
    console.log(environment.api.mail);
    return this.apiService.Post(environment.api.mail, mail);
  }
}
