import { Component, OnInit } from '@angular/core';
import { SuggestedProduct } from 'src/app/models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  suggestedProducts: SuggestedProduct[] = [
    {
      banerImage: 'baner/actionBaner.jpg',
      category: {
        id: 0,
        category: 'action',
      }
    },
    {
      banerImage: 'baner/strategyBaner.jpg',
      category: {
        id: 1,
        category: 'strategy',
      }
    },
    {
      banerImage: 'baner/retroBaner.jpg',
      category: {
        id: 2,
        category: 'retro',
      }
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
