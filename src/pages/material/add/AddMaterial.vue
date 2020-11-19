<template>
	<form :autoFormCreate="(form) => this.form = form">
		<a-table
			:columns="dataColumns"
			:dataSource="dataSource"
			:pagination="false"
		>
			<template v-for="(col, i) in ['branch', 'dimension', 'type', 'length', 'quantity']" :slot="col"
								slot-scope="text, record">

				<template v-if="`branch`.includes(col)">
					<a-select
						show-search
						:key="col"
						v-if="record.editable"
						placeholder="Please choose"
						option-filter-prop="children"
						:filter-option="filterOption"
						@change="(value, option) => handleChangeSelect(value, option, record.key, col)"
					>
						<template v-for="(item, index) in branches">
							<a-select-option :key="index" :value="item.branchCode">{{item.branchName}}</a-select-option>
						</template>
					</a-select>
					<template v-else>{{text.value}}</template>
				</template>

				<template v-else-if="`dimension`.includes(col)">
					<a-select
						show-search
						:key="col"
						v-if="record.editable"
						placeholder="Please choose"
						option-filter-prop="children"
						:filter-option="filterOption"
						@change="(value, option) => handleChangeSelect(value, option, record.key, col)"
					>
						<template v-for="(item, index) in dimensions">
							<a-select-option :key="index" :value="item">{{item}}</a-select-option>
						</template>
					</a-select>
					<template v-else>{{text.value}}</template>
				</template>

				<template v-else-if="`type`.includes(col)">
					<a-select
						show-search
						:key="col"
						v-if="record.editable"
						placeholder="Please choose"
						option-filter-prop="children"
						:filter-option="filterOption"
						@change="(value, option) => handleChangeSelect(value, option, record.key, col)"
					>
						<template v-for="(item, index) in types">
							<a-select-option :key="index" :value="item.materialType">{{item.materialTypeName}}</a-select-option>
						</template>
					</a-select>
					<template v-else>{{text.value}}</template>
				</template>

				<template v-else-if="`length`.includes(col)">
					<a-input-number
						:key="col"
						v-if="record.editable"
						style="margin: -5px 0"
						:placeholder="columns[i].title"
						:max="13000" :min="1"
						@change="value => handleChange(value, record.key, col)"
					/>
					<template v-else>{{text}}</template>
				</template>

				<template v-else>
					<a-input-number
						:key="col"
						v-if="record.editable"
						style="margin: -5px 0"
						:max="1000" :min="1"
						:placeholder="columns[i].title"
						@change="value => handleChange(value, record.key, col)"
					/>
					<template v-else>{{text}}</template>
				</template>

			</template>
			<template slot="operation" slot-scope="text, record">
				<template v-if="record.editable">
          <span v-if="record.isNew">
            <a @click="saveRow(record.key)">{{$t('add')}}</a>
            <a-divider type="vertical"/>
            <a-popconfirm :title="$t('deleteConfirm')" @confirm="remove(record.key)">
              <a>{{$t('delete')}}</a>
            </a-popconfirm>
          </span>
					<span v-else>
            <a @click="saveRow(record.key)">{{$t('save')}}</a>
            <a-divider type="vertical"/>
            <a @click="cancel(record.key)">{{$t('cancel')}}</a>
          </span>
				</template>
				<span v-else>
          <a @click="toggle(record.key)">{{$t('edit')}}</a>
          <a-divider type="vertical"/>
          <a-popconfirm :title="$t('deleteConfirm')" @confirm="remove(record.key)">
            <a>{{$t('delete')}}</a>
          </a-popconfirm>
        </span>
			</template>
		</a-table>
		<a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">
			{{$t('newMaterial')}}
		</a-button>
    <a-row type="flex" justify="start">
      <a-col :span="1" >
        <a-button type="primary" @click="saveAllData" :loading="loading">{{$t('submit')}}</a-button>
      </a-col>
    </a-row>
	</form>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  const columns = [
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      width: '20%',
      scopedSlots: {customRender: 'branch'}
    },
    {
      title: 'Dimension',
      dataIndex: 'dimension',
      key: 'dimension',
      width: '20%',
      scopedSlots: {customRender: 'dimension'}
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '15%',
      scopedSlots: {customRender: 'type'}
    },
    {
      title: 'Length',
      dataIndex: 'length',
      key: 'length',
      width: '15%',
      scopedSlots: {customRender: 'length'}
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '15%',
      scopedSlots: {customRender: 'quantity'}
    },
    {
      title: 'Operation',
      key: 'operation',
      scopedSlots: {customRender: 'operation'}
    }
  ];

  const dataSource = [
    /*{
			id: 1,
			branch: {
				key: 'hn',
				value: 'HaNoi'
			},
			dimension: {
				key: '6X200X200',
				value: '6X200X200'
			},
			type: {
				key: 'A',
				value: 'Good'
			},
			length: '13000',
			quantity: '20',
			editable: false
		}*/
    {
			key: 1,
			branch: {
				key: '',
				value: ''
			},
			dimension: {
				key: '',
				value: ''
			},
			type: {
				key: '',
				value: ''
			},
			length: '',
			quantity: '',
			editable: true
		}
  ];

  export default {
    name: 'AddMaterial',
    i18n: require('./i18n-material'),
    data() {
      return {
        columns,
        dataSource,
        loading: false
      }
    },
    created() {
      this.fetchAllData();
    },
    computed: {
      ...mapGetters('branch', ['branches']),
      ...mapGetters('materialType', ['dimensions', 'types']),
      dataColumns() {
        return this.columns.map(column => {
          column.title = this.$t('table.' + column.key);
          return column
        })
      }
    },
    methods: {
      ...mapActions('branch', ['getBranches']),
      ...mapActions('materialType', ['getDimensions', 'getTypes']),
      ...mapActions('material', ['saveAllMaterial']),
      async fetchAllData() {
        try {
          console.log("fetchAllData list material");
          this.getBranches();
          this.getDimensions();
          this.getTypes();
        } catch (e) {
          console.log("fetchAllData error", e);
        }
      },
      handleSubmit(e) {
        e.preventDefault()
      },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
      newMember() {
        this.dataSource.push({
          key: this.dataSource.length + 1,
          branch: {
            key: '',
            value: ''
          },
          dimension: {
            key: '',
            value: ''
          },
          type: {
            key: '',
            value: ''
          },
          length: '',
          quantity: '',
          editable: true,
          isNew: true
        })
      },
      remove(key) {
        this.dataSource = this.dataSource.filter(item => item.key !== key)
      },
      saveRow(key) {
        let target = this.dataSource.filter(item => item.key === key)[0];
        console.log(!target.branch.value);
        if (!target.branch.key || !target.dimension.key || !target.type.key || !target.length || !target.quantity) {
          this.$message.info("Please fill out all information", 3)
        } else {
          target.editable = false;
          target.isNew = false
        }
      },
      toggle(key) {
        let target = this.dataSource.filter(item => item.key === key)[0];
        target.editable = !target.editable
      },
      getRowByKey(key, newData) {
        const data = this.dataSource;
        return (newData || data).filter(item => item.key === key)[0]
      },
      cancel(key) {
        let target = this.dataSource.filter(item => item.key === key)[0];
        target.editable = false
      },
      handleChange(value, key, column) {
        console.log("handleChange: ", value, key, column);
        const newData = [...this.dataSource];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.dataSource = newData
        }
      },
      handleChangeSelect(value, option, key, col) {
        const newData = [...this.dataSource];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[col].key = value;
          target[col].value = option.componentOptions.children[0].text;
          this.dataSource = newData
        }
      },
      saveAllData() {
        this.loading = true;
        let listData = [];
        this.dataSource.forEach(item => {
          listData.push({
            branchCode: item.branch.key,
            dimension: item.dimension.value,
            materialType: item.type.key,
						length: item.length,
						quantity: item.quantity
					})
				});
        this.saveAllMaterial(listData).then(result => {
          if(result.status === 200) {
            this.dataSource = [
              {
                key: 1,
                branch: {
                  key: '',
                  value: ''
                },
                dimension: {
                  key: '',
                  value: ''
                },
                type: {
                  key: '',
                  value: ''
                },
                length: '',
                quantity: '',
                editable: true
              }
            ];
            this.$message.success("Save data success!", 3);
					} else {
            this.$message.error(result.message);
					}
          this.loading = false;
				})
			}
    }
  }
</script>

<style scoped>

</style>
