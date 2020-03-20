import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public httpClient: HttpClient) { }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json'
    })
  }
  getUsers(searchTerm): Observable<any>{
    return this.httpClient.get(searchTerm, this.httpOptions).pipe(map((response: Response) => {
      return response;
  }))
  }
  getUserInfo(userUrl): Observable<any>{
    return this.httpClient.get(userUrl, this.httpOptions).pipe(map((response: Response) => {
      return response;
  }))
  }
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
}

}
