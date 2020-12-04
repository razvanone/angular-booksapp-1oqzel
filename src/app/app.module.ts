import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination"; // <-- import the module
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { RoutingModule } from "./routing.module"; //the generated routing module
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { FiltersComponent } from "./filters/filters.component";
import { ContentComponent } from "./content/content.component";
import { BooksListSrvService } from "./books-list-srv.service";
import { BookDetailsSmallComponent } from "./book-details-small/book-details-small.component";
import { FilterValuesSrvService } from "./filter-values-srv.service";
import { UsersSrvService } from "./users-srv.service";
import { BooksComponent } from "./books/books.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { ContactComponent } from "./contact/contact.component";
import { BookDetailsPageComponent } from "./book-details-page/book-details-page.component";
import { LoginFormComponent } from "./login-form/login-form.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    RouterModule,
    RoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    FiltersComponent,
    ContentComponent,
    BookDetailsSmallComponent,
    BooksComponent,
    UserDetailsComponent,
    ContactComponent,
    BookDetailsPageComponent,
    LoginFormComponent
  ],
  bootstrap: [AppComponent],
  providers: [BooksListSrvService, FilterValuesSrvService, UsersSrvService]
})
export class AppModule {}
