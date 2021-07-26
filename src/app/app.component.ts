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
    // .pipe(
    //   map(d => {
    //     return this.sort(d);
    //   })
    // )

    this.service.getData().subscribe(d => (this.data = d));
  }

  sort(items: Item[]): Item[] {
    for (var i = 0; i < items.length - 1; i++) {
      let smallestItemIndex = i;
      for (var j = i + 1; j < items.length; j++) {
        if (items[j].value < items[smallestItemIndex].value) {
          smallestItemIndex = j;
        }
      }
      let temp = items[i];
      items[i] = items[smallestItemIndex];
      items[smallestItemIndex] = temp;
    }
    return items;
  }
}
