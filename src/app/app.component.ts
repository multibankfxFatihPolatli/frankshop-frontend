import { Component, OnInit } from '@angular/core';
import { CartControllerService } from './api/services/cart-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'frankshop-frontend';

  constructor(
    private cartService: CartControllerService
  ) {

  }

  ngOnInit(): void {
    this.cartService.getCart();
  }
}
