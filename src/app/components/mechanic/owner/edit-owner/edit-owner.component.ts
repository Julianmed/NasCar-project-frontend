import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm} from '@angular/forms';
import { NgModule } from '@angular/core';
import { OwnerService } from 'src/app/services/owner/owner.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.scss']
})
export class EditOwnerComponent implements OnInit {
  sub: Subscription;
  owner: any = {}

  constructor(private ownerService: OwnerService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(){
    this.sub = this.activatedRoute.params.subscribe(params => {
      const id = params.dni;
      if(id) {
        this.ownerService.get(id).subscribe((owner: any) =>{
          if(owner) {
            this.owner = owner;
          }else{
            console.log('Owner no found.')
          }
        })
      }
    });
  }

  updateVehicle(form: NgForm){
    console.log("el owner es: ",form);
    this.ownerService.update(form).subscribe(result =>{
      console.log(result);
    });
    this.router.navigate(['tasks']);
  }

}
