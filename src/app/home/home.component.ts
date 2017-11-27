import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'mac-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  repos: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const path = 'https://api.github.com/search/repositories?q=angular&sort=stars&order=desc';
    this.repos = this.http.get<any>(path).pipe(
      map(res => res.items)
    );
    this.getInitialItemList();
  }

  // implement a dirty simple caching strategy
  private getInitialItemList() {
    this.repos.subscribe( itemList => localStorage['itemListCache'] = JSON.stringify(itemList));
    this.repos = this.repos.pipe(
      startWith(JSON.parse(localStorage['itemListCache'] || '[]'))
    );
  }

}
