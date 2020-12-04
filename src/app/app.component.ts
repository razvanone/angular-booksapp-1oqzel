import { Component, VERSION } from "@angular/core";
import { UsersSrvService } from "./users-srv.service";
import { LoginFormComponent } from "./login-form/login-form.component";
import { MatDialog } from "@angular/material/dialog";
import { User } from "./user";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + "11";

  public sUserName = "My name";
  public fAvgNoOfBooks = 5.4;
  public iCurrentPage = 1;
  public bIsUserLoggedIn = false;
  public oLoggedInUserDetails: User = {
    fullname: "",
    emailAddress: "",
    homeAddress: "",
    phoneNo: "",
    password: "",
    username: "",
    avgBooksPerMonth: 0
  };

  public averageValueState = {
    "text-valid": this.fAvgNoOfBooks >= 5,
    "text-error": this.fAvgNoOfBooks < 5
  };

  constructor(private _usersSrv: UsersSrvService, private _dialog: MatDialog) {}

  getReadBooksAvg() {
    return Math.round(this.fAvgNoOfBooks);
  }

  onGetUsersBtnPress(oEvent) {
    console.log(this._usersSrv.getUsers());
  }

  onLoginBtnPress(oEvent) {
    const dialogRef = this._dialog.open(LoginFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //set the properties displayed in the template using interpolation
        this.sUserName = result.fullname;
        this.fAvgNoOfBooks = result.avgBooksPerMonth;

        //get overview information about the logged in user
        this.bIsUserLoggedIn = true;
        this.oLoggedInUserDetails = result;
        this._usersSrv.setCurrentUser(this.oLoggedInUserDetails);
      } else {
        this.resetLoggedInUser();
      }
    });
  }

  resetLoggedInUser() {
    this.oLoggedInUserDetails = {
      fullname: "",
      emailAddress: "",
      homeAddress: "",
      phoneNo: "",
      password: "",
      username: "",
      avgBooksPerMonth: 0
    };
    this.bIsUserLoggedIn = false;
    this.sUserName = "";
    this.fAvgNoOfBooks = 0;
    this._usersSrv.setCurrentUser(this.oLoggedInUserDetails);
  }

  onLogoutBtnPress(oEvent) {
    this.resetLoggedInUser();
  }

  handlePagination(oEvent) {
    if (oEvent === "-" && this.iCurrentPage > 1) {
      this.iCurrentPage--;
    } else if (oEvent === "+") {
      this.iCurrentPage++;
    } else {
      return;
    }
  }
}
