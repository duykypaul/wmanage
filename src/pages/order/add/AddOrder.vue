<template>
	<div>
		<template v-for="(dataSource, index) in dataSources">
			<form :autoFormCreate="(form) => this.form = form" :key="index">
				<a-table
					:columns="dataColumns"
					:dataSource="dataSource"
					:pagination="false"
				>
					<template v-for="(col, i) in ['dimension', 'type', 'length', 'quantity']" :slot="col"
										slot-scope="text, record">
						<template v-if="`dimension`.includes(col)">
							<a-select
								show-search
								:key="col"
								v-if="!text.key"
								placeholder="Please choose"
								option-filter-prop="children"
								:filter-option="filterOption"
								@change="(value, option) => handleChangeSelect(value, option, record.key, col, index)"
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
								v-if="!text.key"
								placeholder="Please choose"
								option-filter-prop="children"
								:filter-option="filterOption"
								@change="(value, option) => handleChangeSelect(value, option, record.key, col, index)"
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
								:default-value="record.length"
								@change="value => handleChange(value, record.key, col, index)"
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
								:default-value="record.quantity"
								@change="value => handleChange(value, record.key, col, index)"
							/>
							<template v-else>{{text}}</template>
						</template>

					</template>
					<template slot="operation" slot-scope="text, record">
						<template v-if="record.editable">
          <span v-if="record.isNew">
            <a @click="saveRow(record.key, index)">{{$t('add')}}</a>
            <a-divider type="vertical"/>
            <a-popconfirm :title="$t('deleteConfirm')" @confirm="remove(record.key, index)">
              <a>{{$t('delete')}}</a>
            </a-popconfirm>
          </span>
							<span v-else>
            <a @click="saveRow(record.key, index)">{{$t('save')}}</a>
            <a-divider type="vertical"/>
            <a @click="cancel(record.key, index)">{{$t('cancel')}}</a>
          </span>
						</template>
						<span v-else>
          <a @click="toggle(record.key, index)">{{$t('edit')}}</a>
          <a-divider type="vertical"/>
          <a-popconfirm :title="$t('deleteConfirm')" @confirm="remove(record.key, index)">
            <a>{{$t('delete')}}</a>
          </a-popconfirm>
        </span>
					</template>
				</a-table>
				<a-button style="width: 15%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus"
									@click="newMember(index)">
					{{$t('newProduct')}}
				</a-button>
			</form>
		</template>
		<a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus"
							@click="newConsignment">
			{{$t('newConsignment')}}
		</a-button>
	</div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  const columns = [
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
      width: '20%',
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

  const dataSources = [
    [
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
      }
    ]

  ];

  export default {
    name: 'AddOrder',
    i18n: require('./i18n-order'),
    data() {
      return {
        columns,
        dataSources,
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
      ...mapActions('order', ['setListConsignment']),
      async fetchAllData() {
        try {
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
      newMember(index) {
        this.dataSources[index].push({
          key: this.dataSources.reduce((a, b) => a + b.length, 0) + 1,
          dimension: {
            key: this.dataSources[index][0] ? this.dataSources[index][0].dimension.key : '',
            value: this.dataSources[index][0] ? this.dataSources[index][0].dimension.value : ''
          },
          type: {
            key: this.dataSources[index][0] ? this.dataSources[index][0].type.key : '',
            value: this.dataSources[index][0] ? this.dataSources[index][0].type.value : ''
          },
          length: '',
          quantity: '',
          editable: true,
          isNew: true
        });
        this.dataSources.splice(index, 1, this.dataSources[index]);

      },
      newConsignment() {
        this.dataSources.push([
          {
            key: this.dataSources.reduce((a, b) => a + b.length, 0) + 1,
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
          }
        ])
      },
      remove(key, index) {
        let dataSource = this.dataSources[index].filter(item => item.key !== key);
        this.dataSources.splice(index, 1, dataSource);
        this.setListConsignment(this.dataSources);
      },
      saveRow(key, index) {
        let target = this.dataSources[index].filter(item => item.key === key)[0];
        if (!target.dimension.key || !target.type.key || !target.length || !target.quantity) {
          this.$message.info("Please fill out all information", 3)
        } else {
          target.editable = false;
          target.isNew = false
        }
        this.setListConsignment(this.dataSources);
      },
      toggle(key, index) {
        let target = this.dataSources[index].filter(item => item.key === key)[0];
        target.editable = !target.editable
      },
      getRowByKey(key, newData) {
        const data = this.dataSource;
        return (newData || data).filter(item => item.key === key)[0]
      },
      cancel(key, index) {
        let target = this.dataSources[index].filter(item => item.key === key)[0];
        target.editable = false
      },
      handleChange(value, key, column, index) {
        const newData = [...this.dataSources[index]];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.dataSources[index] = newData
        }
      },
      handleChangeSelect(value, option, key, col, index) {
        const newData = [...this.dataSources[index]];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[col].key = value;
          target[col].value = option.componentOptions.children[0].text;
          this.dataSources[index] = newData
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
          if (result.status === 200) {
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
