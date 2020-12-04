import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./books/books.component";
import { ContactComponent } from "./contact/contact.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { BookDetailsPageComponent } from "./book-details-page/book-details-page.component";
import { ContentComponent } from "./content/content.component";

const appRoutes: Routes = [
  { path: "contact", component: ContactComponent },
  { path: "user", component: UserDetailsComponent },
  {
    path: "books",
    component: BooksComponent,
    children: [
      { path: "list", component: ContentComponent },
      { path: "detail/:id", component: BookDetailsPageComponent },
      { path: "", redirectTo: "list", pathMatch: "full" }
    ]
  },
  { path: "", redirectTo: "/books/list", pathMatch: "full" },
  { path: "**", component: BooksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  declarations: []
})
export class RoutingModule {}
