import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Category, NavigationItem } from 'src/app/models/models';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalTitle') modalTitle!: ElementRef
  @ViewChild('container', {read: ViewContainerRef, static: true})
  container!: ViewContainerRef
  cartItems: number = 0;

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
  constructor(private navigationService: NavigationService, public utilityService: UtilityService) { }

  ngOnInit(): void {
    //* Get Category List
    this.navigationService
    .getCategoryList()
    .subscribe()  

    //* Cart
    if (this.utilityService.isLoggedIn()) {
      this.navigationService
        .getActiveCartOfUser(this.utilityService.getUser().id)
        .subscribe((res: any) => {
          this.cartItems = res.cartItems.length;
        })
    }

    this.utilityService.changeCart.subscribe((res: any) => {
      if (parseInt(res) === 0) this.cartItems = 0
      this.cartItems += parseInt(res);
    });
  }

  openModal(name: string): void{
    this.container.clear()

    let componentType!: Type<any>;
    if (name === 'login'){
      componentType = LoginComponent
      this.modalTitle.nativeElement.textContent = 'Enter Login Information'
    }
    if (name === 'register'){
      componentType = RegisterComponent
      this.modalTitle.nativeElement.textContent = 'Enter Register Information'
    } 

    this.container.createComponent(componentType)
  }


}
