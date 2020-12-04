import { Component, OnInit } from "@angular/core";
import { FilterValuesSrvService } from "../filter-values-srv.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.css"]
})
export class FiltersComponent implements OnInit {
  public sFilterInputId = "srcInputId";
  public bIsFieldDisabled = false;
  public sFilterInputValue = "";

  constructor(private _filtersService: FilterValuesSrvService) {}

  ngOnInit() {}

  onFilterBtnPress(oEvent, myInput) {
    console.log(oEvent);
    console.log(myInput.value);

    this._filtersService.sendMessage(myInput.value);
  }
}
