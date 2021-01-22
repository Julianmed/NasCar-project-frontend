import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

}
