import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OwnerService {
  public API = 'http://localhost:3000';
  public OWNER_API = this.API + '/api/owners';

  constructor(private http: HttpClient) {
  }
  getAll(): Observable<any> {
    return this.http.get(this.OWNER_API+"/get/");
  }

  get(id: string) {
    return this.http.get(this.OWNER_API + '/get/' + id);
  }

  createUser(owner: any): Observable<any>{
    let result: Observable<Object>;
    result = this.http.post(this.OWNER_API, owner);
    return result;
  }

  verifyId(dni: string){
    console.log("buscar este dni ",dni);
    return this.http.get(this.OWNER_API + '/verifyOwner/' + dni);
  }

  createToken(token): Observable<any>{
    this.http.post(this.OWNER_API+'/token/', token);
    return
  }

  update(owner: any): Observable<any>{
    let result: Observable<Object>;
    result = this.http.put(this.OWNER_API + '/' + owner._id, owner);
    return result;
  }

  remove(owner: any) {
    return this.http.delete(owner.userID);
  }
}