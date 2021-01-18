import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/api/models/vehicle';
import { Warehouse } from 'src/app/api/models/warehouse';
import { CartControllerService } from 'src/app/api/services/cart-controller.service';
import { VehicleControllerService } from 'src/app/api/services/vehicle-controller.service';
import { WarehouseControllerService } from 'src/app/api/services/warehouse-controller.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  private vehicleId: string;
  private vehicleDetail: Vehicle;
  private wearhouse: Warehouse;
  private isAlreadyInCart: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: VehicleControllerService,
    private warehouseService: WarehouseControllerService,
    private cartService: CartControllerService) {


    this.activatedRoute.params.subscribe(param => {
      console.log(param);
      this.vehicleId = param["id"];

      this.vehicleDetail = this.router.getCurrentNavigation().extras.state;

      if (this.vehicleDetail == null) {

        this.getVehicleDetail();
      } else {
        this.getWarehouseDetail();
      }

      console.log(this.vehicleDetail);
    })

  }

  ngOnInit() {

    this.getCart();
  }

  private getVehicleDetail(): void {

    this.service.findById(this.vehicleId).subscribe(response => {

      this.vehicleDetail = response['data'];

      console.log(this.vehicleDetail);

      this.getWarehouseDetail();
    })
  }

  private getWarehouseDetail(): void {

    this.warehouseService.findById(this.vehicleDetail.locationId).subscribe(response => {

      this.wearhouse = response['data'];
      console.log(this.wearhouse);
    })
  }

  private addToCart(): void {


    this.cartService.addToCart(this.vehicleId).subscribe(response => {

      console.log(response);
      CartControllerService.USER_CART = response['data'];
      this.setIsAlreadyInCart();
    })
  }

  private removeFromCart(): void {


    this.cartService.removeFromCart(this.vehicleId).subscribe(response => {

      console.log(response);
      CartControllerService.USER_CART = response['data'];
      this.setIsAlreadyInCart();
    })
  }

  private getCart(): void {

    this.cartService.getUserCart().subscribe(response => {
      CartControllerService.USER_CART = response['data'];
      console.log("cart", CartControllerService.USER_CART);
      this.setIsAlreadyInCart();
    });
  }

  private setIsAlreadyInCart() {

    this.isAlreadyInCart = CartControllerService.isExistInCart(this.vehicleId);
  }

}
