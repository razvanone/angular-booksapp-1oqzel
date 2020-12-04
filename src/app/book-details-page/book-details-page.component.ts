import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Book } from "../book";
import { BooksListSrvService } from "../books-list-srv.service";

@Component({
  selector: "app-book-details-page",
  templateUrl: "./book-details-page.component.html",
  styleUrls: ["./book-details-page.component.css"]
})
export class BookDetailsPageComponent implements OnInit {
  public iSelectedBookId;
  public bookDetails = {
    Id: 0,
    Title: "",
    Author: "",
    Rating: 0,
    Price: 0,
    OffPercent: 0,
    Description: "",
    CoverPhoto: ""
  };

  constructor(
    private _booksSrv: BooksListSrvService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    //get the parameter from route using snapshot
    //this.iSelectedBookId = this._activatedRoute.snapshot.paramMap.get("id");

    this._activatedRoute.paramMap.subscribe(params => {
      this.iSelectedBookId = params.get("id");
      this.getBooksDetails();
    });
  }

  getBooksDetails() {
    this._booksSrv
      .getBookById(this.iSelectedBookId)
      .subscribe((data: Book[]) => {
        this.bookDetails = data[0];
      });
  }

  handleBackToBookListNav() {
    console.log("navigate back to list view");
    this._router.navigate(["/books/list"]);
  }
}
