import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthApiService {
  login(
    username: string,
    password: string
  ): Observable<{ id: string; name: string }> {
    // TODO 認証APIを呼び出す
    if (password !== 'success') {
      throw new Error('Login failure.');
    }
    return of({ id: '1', name: username });
  }
}
