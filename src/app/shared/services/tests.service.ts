import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {PostParam, Test} from '../interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestsService {

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  // TODO: вынести функцию в shared модуль, чтобы любой сервис мог ей воспользоваться
  preparePost(postParams: PostParam[]) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    const body = new URLSearchParams();
    postParams.forEach(param => {
      body.set(param.name, param.value.toString());
    });

    return {
      body,
      options,
    };
  }

  startTest(value: number) {
    const post = this.preparePost([
      {name: 'value', value: value.toString()},
      {name: 'accessToken', value: this.authService.token},
    ]);

    return this.http.post<any>(`${environment.apiUrl}/user.startTest`, post.body.toString(), post.options).pipe(
      map(response => {
        return (response.response as Test);
      })
    );
  }

  getTest(): Observable<Test> {
    const post = this.preparePost([
      {name: 'accessToken', value: this.authService.token},
    ]);

    return this.http.post<any>(`${environment.apiUrl}/user.getTest`, post.body.toString(), post.options).pipe(
      map(response => {
        return (response.response as Test);
      })
    );
  }

  tick(): Observable<Test> {
    const post = this.preparePost([
      {name: 'accessToken', value: this.authService.token},
    ]);

    return this.http.post<any>(`${environment.apiUrl}/user.tick`, post.body.toString(), post.options).pipe(
      map(response => {
        return (response.response as Test);
      })
    );
  }

  finishTesh(): Observable<Test> {
    const post = this.preparePost([
      {name: 'accessToken', value: this.authService.token},
    ]);

    return this.http.post<any>(`${environment.apiUrl}/user.finishTest`, post.body.toString(), post.options).pipe(
      map(response => {
        return (response.response as Test);
      })
    );
  }
}
