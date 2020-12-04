import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { UsersSrvService } from "../users-srv.service";
import { User } from "../user";

//type of data returned by the login form
export interface LoginFormData {
  username: string;
  password: string;
}

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  constructor(
    private _dialogRef: MatDialogRef<LoginFormComponent>,
    private _usersSrv: UsersSrvService
  ) {
    //get a reference of the dialog
    //_dialogRef.afterClosed().subscribe(() => {
    //console.log(this.oLoginData);
    //});
  }

  //variable used for 2-way-binding with the template inputs
  public oLoginData: LoginFormData = {
    username: "",
    password: ""
  };
  public hide = true;
  public bLoginFailed = false;
  public oUserData: User = {
    fullname: "",
    emailAddress: "",
    homeAddress: "",
    phoneNo: "",
    password: "",
    username: "",
    avgBooksPerMonth: 0
  };

  ngOnInit() {}

  onDialogLoginBtnPress(oEvent) {
    //retrieve the user input from the login form
    console.log(this.oLoginData);

    //call the users srv
    this._usersSrv.loginUser(this.oLoginData).subscribe((data: User[]) => {
      if (data.length > 0) {
        this.oUserData = data[0];
        this.bLoginFailed = false;

        //close the dialog and pass data back to the parent component
        this._dialogRef.close(this.oUserData);
      } else {
        this.bLoginFailed = true;
      }
    });
  }
}
