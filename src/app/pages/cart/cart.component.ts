import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/api/models/vehicle';
import { CartControllerService } from 'src/app/api/services/cart-controller.service';
import { VehicleControllerService } from 'src/app/api/services/vehicle-controller.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private vehicleList: Vehicle[];
  private totalPrice: number;

  constructor(
    private service: CartControllerService,
    private vehicleService: VehicleControllerService
  ) { }

  ngOnInit() {

    if (CartControllerService.USER_CART != null && CartControllerService.USER_CART.vehicles != null) {

      this.getVehicles();
    } else {
      this.getCart();
    }
  }

  private getVehicles(): void {

    let vehicles: Array<string> = CartControllerService.USER_CART.vehicles;

    this.vehicleService.listAllByIds(vehicles).subscribe(response => {

      this.vehicleList = response['data'];

      this.calculateTotal();
    })
  }

  public getCart(): void {

    this.service.getUserCart().subscribe(response => {
      CartControllerService.USER_CART = response['data'];
      this.getVehicles();
    });
  }

  public calculateTotal() {
    this.totalPrice = 0;
    this.vehicleList.forEach(i => this.totalPrice += i.price);
  }

}
