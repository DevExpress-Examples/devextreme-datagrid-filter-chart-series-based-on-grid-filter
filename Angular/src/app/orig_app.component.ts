import { Component, ViewChild } from "@angular/core";
import { DxChartComponent } from "devextreme-angular";
import query from "devextreme/data/query";

import { Order, Service } from "./app.service";

@Component({
  selector: 'app-root',
  providers: [Service],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(DxChartComponent) chart: DxChartComponent;
  orders: Order[];

  constructor(service: Service) {
    this.orders = service.getOrders();
  }

  onOptionChanged(e) {
    if (e.fullName.indexOf("filterValue") > -1) {
      setTimeout(() => {
        var filterExpr = e.component.getCombinedFilter(true);
        var filteredData = this.orders;

        if (filterExpr) {
          filteredData = query(this.orders)
            .filter(filterExpr)
            .toArray();
        }
        this.chart.instance.option("dataSource", filteredData);
      });
    }
  }
}