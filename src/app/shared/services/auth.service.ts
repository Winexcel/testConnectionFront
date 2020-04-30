import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token(): string {
    return localStorage.getItem('accessToken');
  }

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user.auth`, user).pipe(
      switchMap(response => {
        if (response.error) {
          return throwError(response);
        }

        return of(response);
      }),
      tap(this.setToken.bind(this)),
    );
  }

  logout() {
    this.setToken(null);

  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response) {
    if (!!response) {
      localStorage.setItem('accessToken', response.response.accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }
}
