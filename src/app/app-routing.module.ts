import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { VehicleDetailComponent } from './pages/vehicle-detail/vehicle-detail.component';
import { VehicleListComponent } from './pages/vehicle-list/vehicle-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'vehicle-detail/:id', component: VehicleDetailComponent, data: null },
  { path: 'cart', component: CartComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
