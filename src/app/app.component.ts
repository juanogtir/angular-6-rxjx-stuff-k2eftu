import { Component } from '@angular/core';
import {
  map,
  mergeMap,
  tap,
  catchError,
  flatMap,
  merge,
  concat,
  zip,
  combineLatest,
} from 'rxjs/operators';
import { throwError, from, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// https://www.youtube.com/watch?v=hkVq7u94Vzw

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';

  constructor(public http: HttpClient) {
    // this.test__flatMap();
    this.test_forkJoin();
  }

  test__flatMap() {
    const post: any = this.getPosts();
    const users: any = this.getUsers();
    post
      .pipe(
        mergeMap((val) => {
          console.log('posts', val);
          return users;
        })
      )
      .subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      );
  }

  test_forkJoin() {
    const post: any = this.getPosts(false);
    const users: any = this.getUsers(false);
    forkJoin([post, users]).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }

  getUsers(promise = false) {
    const url = 'https://jsonplaceholder.typicode.com/users';
    if (promise) {
      return new Promise((resolve, reject) => {
        this.http.get(url).subscribe(
          (response: any) => {
            resolve(response);
          },
          (err) => {
            reject(err);
          }
        );
      });
    } else {
      return this.http.get(url);
    }
  }

  getPosts(promise = false) {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    if (promise) {
      return new Promise((resolve, reject) => {
        this.http.get(url).subscribe(
          (response: any) => {
            resolve(response);
          },
          (err) => {
            reject(err);
          }
        );
      });
    } else {
      return this.http.get(url);
    }
  }
}
