import { Component, OnInit, ViewChild, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  trigger: boolean = true;
  searchText: string;


  constructor(
    private authService: UserService, 
    private renderer2: Renderer2,
    private route: Router
    ) { }

  ngOnInit() {
    
  }

  searchPhoto() {
      this.route.navigate([`/search/:${this.searchText}`])
  }


  toggleEffect() {
        this.trigger = !this.trigger
  }
  

}
