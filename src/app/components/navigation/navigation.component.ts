import { Component, OnInit, ViewChild, ElementRef, Renderer2, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  trigger: boolean = true;
  control: FormControl = new FormControl();
  search: EventEmitter<string> = new EventEmitter<string>();
  searchText

  constructor(private authService: UserService, private renderer2: Renderer2) { }

  ngOnInit() {
      this.search.emit(this.searchText)
  }

  searchPhoto(event: any) {
      console.log(event)
  }


  toggleEffect() {
        this.trigger = !this.trigger
  }
  

}
