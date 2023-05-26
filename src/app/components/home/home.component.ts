import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchControl: FormControl = new FormControl();

  searchText: string = '';
  currentPage: number = 1;
  books: any[] = [];

  constructor(public bookSearch: BookService) { }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.searchBooks();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
        this.searchText = value; // Update the search text
        this.currentPage = 1; // Reset the current page
        this.searchBooks(); // Perform the search
      });
  }
  searchBooks() {
    this.bookSearch.searchBooks(this.searchText, this.currentPage)
      .subscribe((data: any) => {
        this.books = data.docs;
      });
  }
  nextPage() {
    this.currentPage++;
    this.searchBooks();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchBooks();
    }
  }

  clearSearch() {
    this.searchText = '';
    this.searchBooks();
  }
}
