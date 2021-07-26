import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export class Item {
  public name: string;
  constructor(public value: number) {
    this.name = `id${value}`;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private array: Item[] = [
    new Item(6),
    new Item(2),
    new Item(3),
    new Item(1),
    new Item(5),
    new Item(4)
  ];

  getData(): Observable<Item[]> {
    return of(this.array);
  }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: Item[];

  constructor(private service: DataService) {}

  ngOnInit() {
    this.sortStream();
  }

  sortStream() {
    this.service.getData().subscribe(d => (this.data = d));
  }

  sort(items: Item[]): Item[] {
    return null;
  }
}

// Selection Sort Algorithm //

// selectionSort(array, size)
//   repeat (size - 1) times
//   set the first unsorted element as the minimum
//   for each of the unsorted elements
//     if element < currentMinimum
//       set element as new minimum
//   swap minimum with first unsorted position
// end selectionSort
