import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-book-details-small",
  templateUrl: "./book-details-small.component.html",
  styleUrls: ["./book-details-small.component.css"]
})
export class BookDetailsSmallComponent implements OnInit {
  constructor(private _router: Router) {}

  @Input() public bookDetails;

  ngOnInit() {}

  handleBookCoverClick(oEvent) {
    console.log(oEvent);
    let sNavPath = "/books/detail/" + oEvent.attributes.alt.nodeValue;
    this._router.navigate([sNavPath]);
  }
}
