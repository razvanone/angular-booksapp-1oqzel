import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { BooksListSrvService } from "../books-list-srv.service";
import { FilterValuesSrvService } from "../filter-values-srv.service";
import { Book } from "../book";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";

type BookTableDetails = {
  Id: number;
  Title: string;
  Author: string;
  Rating: number;
  Price: number;
};

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})
export class ContentComponent implements OnInit, OnDestroy {
  constructor(
    private _booksSrv: BooksListSrvService,
    private _filtersSrv: FilterValuesSrvService
  ) {
    this.subscription = this._filtersSrv.onMessage().subscribe(message => {
      if (message) {
        this.filters = message.text;
      } else {
        this.filters = "";
      }

      console.log("Filter to apply: " + this.filters);
      //call the books service each time a new filter is received
      this.getBooksList();
    });
  }

  @Input("userNameFromMainComp") public sUserNme;

  @Output() public contentEvent = new EventEmitter();

  filters: any = "";
  subscription: Subscription;

  public matTableDataSource = new MatTableDataSource<BookTableDetails>([]);
  public aBooksTableData = [];
  public aColHeaders = [];
  public aBooksList = [];
  public iCurrentPage = 1;
  public iMaxPageNo = 1;
  public iBooksPerPage = 3;

  ngOnInit() {
    //called only the first time the component is initialized
    this.getBooksList();
  }

  getBooksList() {
    this._booksSrv.getBooksList(this.filters).subscribe((data: Book[]) => {
      this.aBooksList = data;
      this.iMaxPageNo = Math.ceil(this.aBooksList.length / this.iBooksPerPage);
      this.initTableHeaders();
      this.prepareTableData();
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  prevPage() {
    //decrease page number
    this.contentEvent.emit("-");
    if (this.iCurrentPage > 1) {
      this.iCurrentPage--;
    }
  }

  nextPage() {
    //increase page number
    this.contentEvent.emit("+");
    if (this.iCurrentPage < this.iMaxPageNo) {
      this.iCurrentPage++;
    }
  }
  onPaginateChange(oEvent) {
    this.iCurrentPage = oEvent.pageIndex + 1; //because the page indexes start from 0
  }

  initTableHeaders() {
    this.aColHeaders = [];
    for (let prop in this.aBooksList[0]) {
      if (
        prop !== "Description" &&
        prop !== "Id" &&
        prop !== "CoverPhoto" &&
        prop !== "OffPercent"
      ) {
        this.aColHeaders.push(prop);
      }
    }
  }

  prepareTableData() {
    this.aBooksTableData.length = 0;
    //a new type with less properties than Book interface

    for (let i = 0; i < this.aBooksList.length; i++) {
      //create and initialize an object of BookTableDetails type
      let oBook: BookTableDetails = {
        Id: 0,
        Title: "",
        Author: "",
        Rating: 0,
        Price: 0
      };
      oBook.Id = this.aBooksList[i].Id;
      oBook.Title = this.aBooksList[i].Title;
      oBook.Author = this.aBooksList[i].Author;
      oBook.Rating = this.aBooksList[i].Rating;
      oBook.Price =
        this.aBooksList[i].Price -
        (this.aBooksList[i].Price / 100) * this.aBooksList[i].OffPercent;

      //push it in the array that will be used as a data source for the table
      this.aBooksTableData.push(oBook);
    }

    this.matTableDataSource.data = this.aBooksTableData;
  }
}
