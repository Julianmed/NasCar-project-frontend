import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';

@Injectable({providedIn: 'root'})
export class VehicleService {
  public VEHICLE_API = 'https://nascar-backend.herokuapp.com/api/vehicles';
  //public VEHICLE_API = 'http://localhost:3000/api/vehicles'
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

  addRepairDetail(vehicle: Object, id: string):Observable<any>{
    let result: Observable<Object>;
    result = this.http.put(this.VEHICLE_API+'/insertDetails/'+id, vehicle);
    return result;
  }

  updateStatus(vehicleStatus: string, placa: string): Observable<any>{
    let result: Observable<any>;
    console.log(this.VEHICLE_API+"/vehicle-status/"+placa, {vehicleStatus});
    result = this.http.put(this.VEHICLE_API+"/vehicle-status/"+placa, {vehicleStatus});
    return result;
  }

  updateVehicle(datos: any, vehicle: any): Observable<any>{
    let result: Observable<Object>;
    vehicle.brand = datos.brand;
    vehicle.model = datos.model;
    vehicle.owners = datos.owners;
    vehicle._id = datos._id;
    vehicle.update.date = Date.now();
    console.log("vehículo ",vehicle);
    result = this.http.put(this.VEHICLE_API+"/"+vehicle._id, vehicle);
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
