import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SingletonService } from '../singleton.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   constructor() { }


  ngOnInit() {
  }

}
