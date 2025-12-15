<template>
  <div>
    <dx-data-grid :data-source="orders" :show-borders="true" @option-changed="onOptionChanged">
        <dx-filter-row :visible="true">
        </dx-filter-row>

        <dx-paging :pageSize="5">
        </dx-paging>

        <dx-column data-field="OrderNumber" caption="Invoice Number">
        </dx-column>
        <dx-column data-field="OrderDate" dataType="date">
        </dx-column>
        <dx-column data-field="SaleAmount" format="currency">
        </dx-column>
        <dx-column data-field="Employee">
        </dx-column>
        <dx-column data-field="CustomerStoreCity" caption="City">
        </dx-column>
    </dx-data-grid>

    <dx-chart :ref="chartRefName" :data-source="orders" resolveLabelOverlapping="stack">
        <dx-argument-axis argumentType="datetime">
        </dx-argument-axis>
        <dx-series type="bar" argumentField="OrderDate" valueField="SaleAmount">
            <dx-label :visible="true"></dx-label>
        </dx-series>
    </dx-chart>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxFilterRow
} from 'devextreme-vue/data-grid';
import DxChart, {
  DxArgumentAxis,
  DxLabel,
  DxSeries
} from 'devextreme-vue/chart';

import query from 'devextreme/data/query';
    
import service from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxFilterRow,
    DxPaging,
    DxChart,
    DxArgumentAxis,
    DxLabel,
    DxSeries
  },
  data() {
    return {
      orders: service.getOrders(),
      chartRefName: 'chart'
    };
  },
  methods: {
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

              this.$refs[this.chartRefName].instance.option("dataSource", filteredData);
          });
      }
    }
  }
};
</script>