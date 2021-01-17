<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Consignment No"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-input v-model="consignmentNo" placeholder="Please enter" :allowClear="true"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Branch"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-select placeholder="Please choose" v-model="branch" >
                  <template v-for="(item, index) in branches">
                    <a-select-option :key="index" :value="item.branchCode">{{item.branchName}}</a-select-option>
                  </template>
                </a-select>
              </a-form-item>
            </a-col>
            <!--DIMENSION-->
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Dimension"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-select
                  show-search
                  placeholder="Please choose"
                  v-model="dimension"
                  option-filter-prop="children"
                  :filter-option="filterOptionDimension"
                  @focus="handleFocusDimension"
                  @blur="handleBlurDimension"
                  @change="handleChangeDimension"
                >
                  <template v-for="(item, index) in dimensions">
                    <a-select-option :key="index" :value="item">{{item}}</a-select-option>
                  </template>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="advanced">
            <!--TYPE-->
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Type"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-select placeholder="Please choose" v-model="type">
                  <template v-for="(item, index) in types">
                    <a-select-option :key="index" :value="item.materialType">{{item.materialTypeName}}</a-select-option>
                  </template>
                </a-select>
              </a-form-item>
            </a-col>
            <!--CUSTOMER-->
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Customer"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-input v-model="customer" style="width: 100%" placeholder="Please enter" :maxLength="44" :allowClear="true"/>
              </a-form-item>
            </a-col>
            <!--DELIVERY ADD-->
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Delivery add"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-input v-model="deliveryAddress" style="width: 100%" placeholder="Please enter" :maxLength="44" :allowClear="true"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="advanced">
            <!--LENGTH-->
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Length"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-input-number v-model="length" style="width: 100%" placeholder="Please enter" :max="13000" :min="1" />
              </a-form-item>
            </a-col>
            <!--DELIVERY DATE-->
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Delivery date"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-date-picker style="width: 100%" placeholder="Please choose" v-model="deliveryDate"/>
              </a-form-item>
            </a-col>
            <!--STATUS-->
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Status"
                :labelCol="{span: 7}"
                :wrapperCol="{span: 16, offset: 1}"
              >
                <a-select
                  show-search
                  placeholder="Please choose"
                  v-model="status"
                  option-filter-prop="children"
                  :filter-option="filterOptionDimension"
                  @focus="handleFocusDimension"
                  @blur="handleBlurDimension"
                  @change="handleChangeDimension"
                >
                    <a-select-option value="IMPORTED">IMPORTED</a-select-option>
                    <a-select-option value="PLAN">PLAN</a-select-option>
                    <a-select-option value="TORIAI">TORIAI</a-select-option>
                    <a-select-option value="EXPORTED">EXPORTED</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-space size="small">
            <a-button @click="handleSearch" type="primary">Search</a-button>
            <a-button @click="resetSearchField">Reset</a-button>
            <a @click="toggleAdvanced" >
              {{advanced ? 'Hide' : 'Show'}}
              <a-icon :type="advanced ? 'up' : 'down'"/>
            </a>
          </a-space>
        </span>
      </a-form>
    </div>
    <div>
      <div class="operator">
        <a-space size="small">
          <a-button @click="addNew" type="primary">New</a-button>
          <a-dropdown>
            <a-menu @click="handleMenuClick" slot="overlay">
              <a-menu-item key="delete">Delete</a-menu-item>
              <a-menu-item key="toriai" :disabled="this.selectedRows.length === 0">Toriai</a-menu-item>
            </a-menu>
            <a-button>
              Bulk operation
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </a-space>
      </div>
      <standard-table-v2
        :columns="columns"
        :dataSource="dataSourceSearch"
        :selectedRows.sync="selectedRows"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle"/>
        </template>
      </standard-table-v2>
    </div>
    <modal-toriai ref="modalToriai" />
  </a-card>
</template>

<script>
  import moment from 'moment';
  import StandardTableV2 from "@/components/table/StandardTableV2";
  import BranchRepository from "@/repositories/BranchRepository";
  import {mapActions, mapGetters} from "vuex";
  import ModalToriai from "@/pages/components/toriai/ModalToriai";

  const columns = [
    {
      title: 'Consignment No',
      dataIndex: 'consignmentNo',
      sorter: true
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      sorter: true,
      scopedSlots: {customRender: 'Branch'}
    },
    {
      title: 'Dimension',
      dataIndex: 'dimension',
      sorter: true
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: true
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      sorter: true,
    },
    {
      title: 'Delivery Add',
      dataIndex: 'deliveryAddress',
      sorter: true,
    },
    {
      title: 'Length',
      dataIndex: 'length',
      sorter: true,
      needTotal: true,
      customRender: (text) => text + ' mm'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: true,
      needTotal: true,
    },
    {
      title: 'Delivery Date',
      dataIndex: 'deliveryDate',
      sorter: true
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: false
    },
  ];

  export default {
    name: 'MaterialList',
    inject: ['OrderRepository', 'MaterialTypeRepository', 'BranchRepository'],
    components: {ModalToriai, StandardTableV2},
    data() {
      return {
        advanced: true,
        columns,
        dataSource: [],
        dataSourceSearch: [],
        selectedRows: [],
        consignmentNo: undefined,
        branch: undefined,
        dimension: undefined,
        type: undefined,
        customer: undefined,
        deliveryAddress: undefined,
        length: undefined,
        deliveryDate: undefined,
        status: undefined,
        dataTest: [],
      }
    },
    authorize: {
      deleteRecord: 'delete'
    },
    computed: {
      ...mapGetters('branch', ['branches']),
      ...mapGetters('materialType', ['dimensions', 'types']),
    },
    created() {
      this.fetchAllData();
    },
    methods: {
      ...mapActions('branch', ['getBranches']),
      ...mapActions('materialType', ['getDimensions', 'getTypes']),
      async fetchAllData() {
        try {
          this.getBranches();
          this.getDimensions();
          this.getTypes();
          let consignments = await this.OrderRepository.findAllConsignments();
          this.dataSource = consignments.data;
          this.dataSourceSearch = [...this.convertDataSource(this.dataSource)];
        } catch (e) {
          console.log("fetchAllData error", e);
        }
      },
      handleSearch() {
        try {
          let dataFilter = this.dataSource.filter(item => {
            let no = !this.consignmentNo || item.consignmentNo.toLowerCase().includes(this.consignmentNo.toLowerCase());
            let branch = !this.branch || item?.order?.branch?.branchCode == this.branch;
            let dimension = !this.dimension || item.materialType.dimension == this.dimension;
            let type = !this.type || item.materialType.materialType == this.type;
            let customer = !this.customer || item.order.customer.toLowerCase().includes(this.customer.toLowerCase());
            let deliveryAddress = !this.deliveryAddress || item.order.deliveryAddress.toLowerCase().includes(this.deliveryAddress.toLowerCase());
            let length = !this.length || item.length == this.length;
            let deliveryDate = !this.deliveryDate || moment(item.order.deliveryDate).format('YYYY-MM-DD') == this.deliveryDate.format('YYYY-MM-DD');
            let status = !this.status || item.status == this.status;
            return no && branch && dimension && type && customer && deliveryAddress && length && deliveryDate && status;
          });
          this.dataSourceSearch = [...this.convertDataSource(dataFilter)];
        } catch (e) {
          console.log("284 handleSearch exception: ", e)
        }
      },
      resetSearchField() {
        this.consignmentNo = undefined;
        this.branch = undefined;
        this.dimension = undefined;
        this.type = undefined;
        this.customer = undefined;
        this.deliveryAddress = undefined;
        this.type = undefined;
        this.length = undefined;
        this.deliveryDate = undefined;
        this.status = undefined;
        this.handleSearch();
      },
      deleteRecord(key) {
        this.dataSource = this.dataSource.filter(item => item.key !== key);
        this.selectedRows = this.selectedRows.filter(item => item.key !== key)
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
      },
      remove() {
        let ids = [];
        let consignmentNos = [];
        for (let i = 0; i < this.selectedRows.length; i++) {
          let item = this.selectedRows[i];
          ids.push(item.id);
          consignmentNos.push(item.consignmentNo);
        }
        console.log(ids);
        const payload = {
          data: {
            ids
          }
        };
        this.OrderRepository.deleteAllByIds(payload).then(() => {
          let dataFilter = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.id === item.id) === -1);
          let dataFilterSearch = this.dataSourceSearch.filter(item => this.selectedRows.findIndex(row => row.id === item.id) === -1);
          this.dataSourceSearch = [...dataFilterSearch];
          this.dataSource = [...dataFilter];
          this.selectedRows = [];
          this.$message.info('You removed Materials No: ' + consignmentNos.join(', '))
        });
      },
      toriai() {
        this.$refs.modalToriai.setToriaiVisible();
        let gyoData = this.convertGyoData(this.selectedRows);
        this.$refs.modalToriai.setGyoData(gyoData);
        /*let retsuData = [
          {key: 1, retsuNo: 1, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0, lengthUsed: 0, lengthRemaining: 0},
          {key: 2, retsuNo: 2, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0, lengthUsed: 0, lengthRemaining: 0},
          {key: 3, retsuNo: 3, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0, lengthUsed: 0, lengthRemaining: 0},
          {key: 4, retsuNo: 4, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0, lengthUsed: 0, lengthRemaining: 0},
          {key: 5, retsuNo: 5, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0, lengthUsed: 0, lengthRemaining: 0},
          {key: 6, retsuNo: 6, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0, lengthUsed: 0, lengthRemaining: 0},
          {key: 7, retsuNo: 7, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0, lengthUsed: 0, lengthRemaining: 0},
          {key: 8, retsuNo: 8, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0, lengthUsed: 0, lengthRemaining: 0},
          {key: 9, retsuNo: 9, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0, lengthUsed: 0, lengthRemaining: 0},
          {key: 10, retsuNo: 10, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0, lengthUsed: 0, lengthRemaining: 0},
          {key: 11, retsuNo: 11, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0, lengthUsed: 0, lengthRemaining: 0},
          {key: 12, retsuNo: 12, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0, lengthUsed: 0, lengthRemaining: 0},
        ];
        let kankeiPreData = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          /!*TWO LAST ARRAY IS NUMBER LENGTH STEEL USED AND REMAINING *!/
          retsuData.map(item => item.lengthUsed),
          retsuData.map(item => item.lengthRemaining),
        ];
        this.$refs.modalToriai.setRetsuDataPreKankei(gyoData, retsuData, kankeiPreData);*/
        this.$refs.modalToriai.setRetsuDataPreKankei(gyoData);
        console.log(this.selectedRows[0]);
        let summaryData = [
          {
            key: '1',
            branch: this.selectedRows[0].branch,
            type: this.selectedRows[0].type,
            dimension: this.selectedRows[0].dimension,
            machiningCompletionDate: '2015/01/01',
            totalLengthExpected: gyoData.reduce((acc,  el) => acc + el.length * el.quantity, 0),
            totalQuantity: gyoData.reduce((acc,  el) => acc + el.quantity, 0),
            totalLengthRemain: '',
            rateUse: '',
            rateRemain: '',
          }
        ];
        this.$refs.modalToriai.setSummaryData(summaryData);
      },
      convertGyoData(data) {
        try {
          let convertGyoData = [];
          data.forEach((item, index) => {
            convertGyoData.push({
              key: index + 1,
              gyoNo: index + 1,
              length: item.length,
              quantity: item.quantity
            });
          });
          convertGyoData.push(
            {
              key: (convertGyoData[convertGyoData.length - 1]?.key || 1) + 1,
              gyoNo: (convertGyoData[convertGyoData.length - 1]?.key || 1) + 1,
              length: 0,
              quantity: 0
            });
          convertGyoData.push(
            {
              key: convertGyoData[convertGyoData.length - 1]?.key + 1,
              gyoNo: convertGyoData[convertGyoData.length - 1]?.key + 1,
              length: 0,
              quantity: 0
            });
          return convertGyoData;
        } catch (e) {
          console.log('exception in convertGyoData: ', e);
        }

      },
      onClear() {
        this.$message.info('You cleared all checked rows')
      },
      onStatusTitleClick() {
        this.$message.info('You clicked on the status bar header')
      },
      onChange() {
        // this.$message.info('Table status changed')
      },
      onSelectChange() {
        // this.$message.info('The selected row has changed')
      },
      addNew() {
        this.$router.push('/order/new');
      },
      handleMenuClick(e) {
        if (e.key === 'delete') {
          this.remove()
        } else {
          this.toriai();
        }
      },
      handleChangeDimension(value) {
        console.log(`selected ${value}`);
      },
      handleBlurDimension() {
        console.log('blur');
      },
      handleFocusDimension() {
        console.log('focus');
      },
      filterOptionDimension(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
      convertDataSource(dataSource) {
        let dataReturn = [];
        try {
          for (let i = 0; i < dataSource.length; i++) {
            let item = dataSource[i];
            dataReturn.push({
              id: item.id,
              consignmentNo: item.consignmentNo,
              branch: item?.order?.branch?.branchName,
              dimension: item?.materialType?.dimension,
              type: item?.materialType?.materialTypeName,
              customer: item?.order?.customer,
              deliveryAddress: item?.order?.deliveryAddress,
              length: item.length,
              quantity: item.quantity,
              deliveryDate: item?.order?.deliveryDate,
              status: item.status
            });
          }
        } catch (e) {
          console.log('369 exception: ', e)
        }
        return dataReturn;
      }
    }
  }
</script>

<style lang="less" scoped>
  .search {
    margin-bottom: 54px;
  }

  .fold {
    width: calc(100% - 216px);
    display: inline-block
  }

  .operator {
    margin-bottom: 18px;
  }

  .ant-table td {
    white-space: nowrap;
  }

  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
