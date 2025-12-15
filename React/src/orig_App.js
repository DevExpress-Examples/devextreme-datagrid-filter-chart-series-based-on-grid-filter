import React from "react";
import './App.css';

import DataGrid, {
  Column,
  FilterRow,
  Paging
} from "devextreme-react/data-grid";
import Chart, { ArgumentAxis, Series, Label } from "devextreme-react/chart";
import query from "devextreme/data/query";

import service from "./data.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.orders = service.getOrders();
    this.chart = null;
    this.onOptionChanged = this.onOptionChanged.bind(this);

    this.state = {
      chartData: this.orders
    };
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

        this.setState({
          chartData: filteredData
        });
      });
    }
  }

  render() {
    return (
      <div>
        <DataGrid
          dataSource={this.orders}
          showBorders={true}
          onOptionChanged={this.onOptionChanged}
        >
          <FilterRow visible={true} />
          <Paging pageSize={5} />
          <Column dataField={"OrderNumber"} caption={"Invoice Number"} />
          <Column dataField={"OrderDate"} dataType={"date"} />
          <Column dataField={"SaleAmount"} format={"currency"} />
          <Column dataField={"Employee"} />
          <Column dataField={"CustomerStoreCity"} caption={"City"} />
        </DataGrid>
        <Chart
          ref={ref => (this.chart = ref)}
          dataSource={this.state.chartData}
          resolveLabelOverlapping={"stack"}
        >
          <ArgumentAxis argumentType={"datetime"} />
          <Series
            type={"bar"}
            argumentField={"OrderDate"}
            valueField={"SaleAmount"}
          >
            <Label visible={true} />
          </Series>
        </Chart>
      </div>
    );
  }
}

export default App;