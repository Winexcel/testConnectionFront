import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Test} from '../interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestsService {

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  startTest(value: number) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    const body = new URLSearchParams();
    body.set('value', value.toString());
    body.set('accessToken', this.authService.token);

    return this.http.post<any>(`${environment.apiUrl}/user.startTest`, body.toString(), options).pipe(
      map(response => {
        return (response.response as Test);
      })
    );;
  }

  getTest(): Observable<Test> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    const body = new URLSearchParams();
    body.set('accessToken', this.authService.token);

    return this.http.post<any>(`${environment.apiUrl}/user.getTest`, body.toString(), options).pipe(
      map(response => {
        return (response.response as Test);
      })
    );
  }

  tick(): Observable<Test> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    const body = new URLSearchParams();
    body.set('accessToken', this.authService.token);

    return this.http.post<any>(`${environment.apiUrl}/user.tick`, body.toString(), options).pipe(
      map(response => {
        return (response.response as Test);
      })
    );
  }

  finishTesh(): Observable<Test> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    const body = new URLSearchParams();
    body.set('accessToken', this.authService.token);

    return this.http.post<any>(`${environment.apiUrl}/user.finishTest`, body.toString(), options).pipe(
      map(response => {
        return (response.response as Test);
      })
    );
  }
}
