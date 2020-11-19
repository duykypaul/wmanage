<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Material No"
                :labelCol="{span: 6}"
                :wrapperCol="{span: 17, offset: 1}"
              >
                <a-input v-model="materialNo" placeholder="Please enter"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Branch"
                :labelCol="{span: 6}"
                :wrapperCol="{span: 17, offset: 1}"
              >
                <a-select placeholder="Please choose" v-model="branch" >
                  <template v-for="(item, index) in branches">
                    <a-select-option :key="index" :value="item.branchCode">{{item.branchName}}</a-select-option>
                  </template>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Length"
                :labelCol="{span: 6}"
                :wrapperCol="{span: 17, offset: 1}"
              >
                <a-input-number v-model="length" style="width: 100%" placeholder="Please enter" :max="13000" :min="1"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Input day"
                :labelCol="{span: 6}"
                :wrapperCol="{span: 17, offset: 1}"
              >
                <a-date-picker style="width: 100%" placeholder="Please enter input date" v-model="inputDay"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Dimension"
                :labelCol="{span: 6}"
                :wrapperCol="{span: 17, offset: 1}"
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
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Type"
                :labelCol="{span: 6}"
                :wrapperCol="{span: 17, offset: 1}"
              >
                <a-select placeholder="Please choose" v-model="type">
                  <template v-for="(item, index) in types">
                    <a-select-option :key="index" :value="item.materialType">{{item.materialTypeName}}</a-select-option>
                  </template>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item
                label="Status"
                :labelCol="{span: 6}"
                :wrapperCol="{span: 17, offset: 1}"
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
                    <a-select-option value="ACTIVE">ACTIVE</a-select-option>
                    <a-select-option value="INACTIVE">INACTIVE</a-select-option>
                    <a-select-option value="PLAN">PLAN</a-select-option>
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
              <a-menu-item key="audit">Audit</a-menu-item>
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
  </a-card>
</template>

<script>
  import moment from 'moment';
  import StandardTableV2 from "@/components/table/StandardTableV2";
  import BranchRepository from "@/repositories/BranchRepository";
  import {mapActions, mapGetters} from "vuex";

  const columns = [
    {
      title: 'Material No',
      dataIndex: 'materialNo',
      sorter: true
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      sorter: true,
      scopedSlots: {customRender: 'Branch'}
    },
    {
      title: 'Length',
      dataIndex: 'length',
      sorter: true,
      needTotal: true,
      customRender: (text) => text + ' mm'
    },
    {
      title: 'Input day',
      dataIndex: 'inputDay',
      sorter: true
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
      title: 'Status',
      dataIndex: 'status',
      sorter: false
    },
  ];

  export default {
    name: 'MaterialList',
    inject: ['MaterialRepository', 'MaterialTypeRepository', 'BranchRepository'],
    components: {StandardTableV2},
    data() {
      return {
        advanced: true,
        columns: columns,
        dataSource: [],
        dataSourceSearch: [],
        selectedRows: [],
        materialNo: undefined,
        branch: undefined,
        length: undefined,
        inputDay: undefined,
        dimension: undefined,
        type: undefined,
        status: undefined,
        dataTest: []
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
          console.log("fetchAllData list material");
          this.getBranches();
          this.getDimensions();
          this.getTypes();
          let materials = await this.MaterialRepository.findAll();
          this.dataSource = materials.data;
          this.dataSourceSearch = [...this.convertDataSource(this.dataSource)];
        } catch (e) {
          console.log("fetchAllData error", e);
        }
      },
      handleSearch() {
        let dataFilter = this.dataSource.filter(item => {
          let no = !this.materialNo || item.materialNo.toLowerCase().includes(this.materialNo.toLowerCase());
          let branch = !this.branch || item.branch.branchCode.equals(this.branch);
          let length = !this.length || item.length == this.length;
          let inputDay = !this.inputDay || moment(item.createdAt).format('YYYY-MM-DD') == this.inputDay.format('YYYY-MM-DD');
          let dimension = !this.dimension || item.materialType.dimension == this.dimension;
          let type = !this.type || item.materialType.materialType == this.type;
          let status = !this.status || item.status == this.status;
          return no && branch && length && inputDay && dimension && type && status;
        });
        this.dataSourceSearch = [...this.convertDataSource(dataFilter)];
      },
      resetSearchField() {
        this.materialNo = undefined;
        this.branch = undefined;
        this.length = undefined;
        this.inputDay = undefined;
        this.dimension = undefined;
        this.type = undefined;
        this.status = undefined;
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
        let materialsNo = [];
        for (let i = 0; i < this.selectedRows.length; i++) {
          let item = this.selectedRows[i];
          ids.push(item.id);
          materialsNo.push(item.materialNo);
        }
        console.log(ids);
        const payload = {
          data: {
            ids
          }
        };
        this.MaterialRepository.deleteAllByIds(payload).then(() => {
          let dataFilter = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.id === item.id) === -1);
          let dataFilterSearch = this.dataSourceSearch.filter(item => this.selectedRows.findIndex(row => row.id === item.id) === -1);
          this.dataSourceSearch = [...dataFilterSearch];
          this.dataSource = [...dataFilter];
          this.selectedRows = []
          this.$message.info('You removed Materials No: ' + materialsNo.join(', '))
        });
      },
      onClear() {
        this.$message.info('You cleared all checked rows')
      },
      onStatusTitleClick() {
        this.$message.info('You clicked on the status bar header')
      },
      onChange() {
        this.$message.info('Table status changed')
      },
      onSelectChange() {
        // this.$message.info('The selected row has changed')
      },
      addNew() {
        this.$router.push('/material/new');
      },
      handleMenuClick(e) {
        if (e.key === 'delete') {
          this.remove()
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
        for (let i = 0; i < dataSource.length; i++) {
          let item = dataSource[i];
          dataReturn.push({
            id: item.id,
            materialNo: item.materialNo,
            branch: item.branch.branchName,
            length: item.length,
            inputDay: moment(item.createdAt).format('YYYY-MM-DD'),
            dimension: item.materialType.dimension,
            type: item.materialType.materialTypeName,
            status: item.status
          })
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

  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
