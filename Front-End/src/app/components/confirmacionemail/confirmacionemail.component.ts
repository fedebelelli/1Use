import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacionemail.component.html',
  styleUrls: ['./confirmacionemail.component.css']
})
export class ConfirmacionEmailComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router, private route: ActivatedRoute ) { }

  private token: string;

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
   }

  confirmar(){
    this._auth.confirmar(this.token).subscribe(
      res => {
        this._router.navigate(['/home'])
      },
      err => console.log(err)
    )
  }

}
