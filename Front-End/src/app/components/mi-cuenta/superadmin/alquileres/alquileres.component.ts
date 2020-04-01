import { Component, OnInit } from '@angular/core';
import { SingletonService } from 'src/app/components/singleton.service';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.css']
})
export class AlquileresComponent implements OnInit {

  constructor(private singleton: SingletonService) { }

  ngOnInit() {
  }

}
