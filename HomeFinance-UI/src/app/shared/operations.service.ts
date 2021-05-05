import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FbCreateResponse, Operation} from "./interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class OperationsService {

  constructor(
    private http: HttpClient
  ) {
  }

  create(operation: Operation): Observable<Operation> {
    return this.http.post(`${environment.fbDbUrl}/operations.json`, operation)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...operation,
            id: response.name,
            date: new Date(operation.date)
          }
        }
       )
      )
  }

  getAll(): Observable<Operation[]> {
    return this.http.get(`${environment.fbDbUrl}/operations.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return Object
            .keys(response)
            .map(key=> ({
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }))

        })
      )
  }

  getById(id: string): Observable<Operation> {
    return this.http.get<Operation>(`${environment.fbDbUrl}/operations/${id}.json`)
      .pipe(
        map((operation: Operation) => {
            return {
              ...operation,
              id,
              date: new Date(operation.date)
            }
          }
        )
      )
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/operations/${id}.json`)
  }

  update(operation: Operation): Observable<Operation> {
    return this.http.patch<Operation>(`${environment.fbDbUrl}/operations/${operation.id}.json`, operation)
  }
}
