import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class VehicleService {
  public API = 'http://localhost:3000';
  public VEHICLE_API = this.API + '/api/vehicles';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.VEHICLE_API);
  }

  get(id: string) {
    return this.http.get(this.VEHICLE_API + '/' + id);
  }

  getAny(placa: string) {
    return this.http.get(this.VEHICLE_API+'/state/'+placa);
  }
  createVehicle(vehicle: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.VEHICLE_API, vehicle);
    return result;
  }
  verifyPlaca(placa: string){
    return this.http.get(this.VEHICLE_API + '/verifyVehicle/' + placa);
  }

  updateAuthorization(authorization: string, placa: string): Observable<any> {
    let result: Observable<Object>;
    console.log(this.VEHICLE_API+"/authorization/"+placa, {authorization});
    result = this.http.put(this.VEHICLE_API+"/authorization/"+placa, {authorization});
    return result;
  }

  updateStatus(vehicleStatus: string, placa: string): Observable<any>{
    let result: Observable<any>;
    console.log(this.VEHICLE_API+"/vehicle-status/"+placa, {vehicleStatus});
    result = this.http.put(this.VEHICLE_API+"/vehicle-status/"+placa, {vehicleStatus});
    return result;
  }

  updateVehicle(vehicle: any): Observable<any>{
    let result: Observable<Object>;
    result = this.http.put(this.VEHICLE_API+"/"+vehicle._id, vehicle);
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
