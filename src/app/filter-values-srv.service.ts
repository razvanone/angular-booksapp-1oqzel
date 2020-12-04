import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class FilterValuesSrvService {
  private subject = new Subject<any>();

  constructor() {}

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  onMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
