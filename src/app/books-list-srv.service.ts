import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Book } from "./book";

@Injectable()
export class BooksListSrvService {
  constructor(private _http: HttpClient) {}

  getBooksList(sFilter): Observable<Book[]> {
    let url = "https://my-json-server.typicode.com/ancarg/demo/books";
    if (sFilter !== "") {
      url = url + "?Author=" + sFilter;
    }
    return this._http.get<Book[]>(url); //it will return an observable
  }

  getBookById(iId): Observable<Book[]> {
    let url = "https://my-json-server.typicode.com/ancarg/demo/books";
    if (iId > 0) {
      url = url + "?Id=" + iId;
    }
    return this._http.get<Book[]>(url); //it will return an observable
  }
}
