import { Component, OnInit } from '@angular/core';
import { VehicleControllerService } from 'src/app/api/services/vehicle-controller.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  private vehicleList: any;

  constructor(private service: VehicleControllerService) { }

  ngOnInit() {

    var params: VehicleControllerService.ListUsingGET1Params = {
      unpaged: false,
      sortUnsorted: false,
      sortSorted: true,
      paged: true,
      pageSize: 100,
      pageNumber: 0,
      offset: 0,
      sort: "dateAdded,asc",
      size: 100
    };

    this.service.list(params).subscribe(response => {

      this.vehicleList = response['data'];

      console.log(this.vehicleList);
    })
  }

}
