import { Component, OnInit } from '@angular/core';
import { NavigationItem } from 'src/app/models/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navigationList: NavigationItem[] = [
    {
      category: ["action"]
    },
    {
      category: ["strategy"]
    },
    {
      category: ["retro"]
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
