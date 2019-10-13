import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { IPhoto } from 'src/app/interfaces/Photo';
import { Router } from '@angular/router';
import * as sal from "sal.js";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    sal({
      threshold: 1,
      once: false
    })
  }



  

}
