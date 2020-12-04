import { Injectable } from "@angular/core";
import * as Jsondata from "./assets/data/users.json"; //read directly from json
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user"; //user interface
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UsersSrvService {
  constructor(private _http: HttpClient) {}
  users: any = (Jsondata as any).default; //read directly from json

  getUsers() {
    return this.users;
  }

  loginUser(oLoginData): Observable<User[]> {
    let url = "https://my-json-server.typicode.com/ancarg/demo/users";
    url =
      url +
      "?username=" +
      oLoginData.username +
      "&password=" +
      oLoginData.password;
    return this._http.get<User[]>(url); //it will return an observable
  }

  userDetails: User = {
    avgBooksPerMonth: 0,
    emailAddress: "",
    fullname: "",
    homeAddress: "",
    password: "",
    phoneNo: "",
    username: ""
  };

  //pass data to user-details section which is subscribed to this observable
  private _user = new BehaviorSubject<User>(this.userDetails);
  castCurrentUser = this._user.asObservable();

  setCurrentUser(newUser) {
    this.userDetails = newUser;
    this._user.next(this.userDetails);
  }
}
