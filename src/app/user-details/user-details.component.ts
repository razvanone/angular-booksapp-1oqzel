import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { UsersSrvService } from "../users-srv.service";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"]
})
export class UserDetailsComponent implements OnInit {
  constructor(private _usersSrv: UsersSrvService, private _fb: FormBuilder) {}
  userForm: FormGroup;
  bFormError = false;

  ngOnInit() {
    this._usersSrv.castCurrentUser.subscribe(user => {
      this.handleSubsc(user);
    });
  }

  onSubmit() {
    if (
      this.userForm.valid &&
      this.userForm.value.password1 === this.userForm.value.password2
    ) {
      this.bFormError = false;
      alert("User details ready for save!");
    } else {
      this.bFormError = true;
    }
  }

  handleSubsc(user) {
    this.userForm = this._fb.group({
      username: this._fb.control({ value: user.username, disabled: true }),
      password1: this._fb.control({ value: user.password, disabled: false }),
      password2: this._fb.control({ value: user.password, disabled: false }),
      fullname: this._fb.control({ value: user.fullname, disabled: false }, [
        Validators.minLength(5)
      ]),
      emailAddress: this._fb.control(
        {
          value: user.emailAddress,
          disabled: false
        },
        [Validators.email]
      ),
      homeAddress: this._fb.control(
        {
          value: user.homeAddress,
          disabled: false
        },
        [Validators.minLength(10)]
      ),
      phoneNo: this._fb.control({ value: user.phoneNo, disabled: false }),
      avgBooksPerMonth: this._fb.control({
        value: user.avgBooksPerMonth,
        disabled: true
      })
    });
  }
}
