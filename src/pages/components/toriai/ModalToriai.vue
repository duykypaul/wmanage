<template>
	<div class="toriai">
		<a-modal
			title="Set plan machining steel"
			:visible="toriaiVisible"
			@cancel="setToriaiVisible"
			:width="'90%'"
		>
			<!--========= START HEAD TORIAI ===========-->
			<div class="headToriai" >
				<a-row>
					<a-col :md="4" :sm="24">
						<a-form-item
							label="Branch"
							:labelCol="{span: 7}"
							:wrapperCol="{span: 16, offset: 1}"
						>
							<a-input style="width: 100%" :defaultValue="summaryData[0].branch" :maxLength="44" :allowClear="false" :disabled="true"/>
						</a-form-item>
					</a-col>
					<a-col :md="4" :sm="24">
						<a-form-item
							label="Type"
							:labelCol="{span: 7}"
							:wrapperCol="{span: 16, offset: 1}"
						>
							<a-input style="width: 100%" :defaultValue="summaryData[0].type" :maxLength="44" :allowClear="false" :disabled="true"/>
						</a-form-item>
					</a-col>
					<!--DIMENSION-->
					<a-col :md="6" :sm="24">
						<a-form-item
							label="Dimension"
							:labelCol="{span: 7}"
							:wrapperCol="{span: 16, offset: 1}"
						>
							<a-input style="width: 100%" :defaultValue="summaryData[0].dimension" :maxLength="44" :allowClear="false" :disabled="true"/>
						</a-form-item>
					</a-col>

					<a-col :md="10" :sm="24">
						<a-form-item
							label="Machining completion date"
							:labelCol="{span: 10}"
							:wrapperCol="{span: 13, offset: 1}"
							:disabled="true"
						>
							<a-date-picker :default-value="moment(summaryData[0].machiningCompletionDate, dateFormat)" :format="dateFormat" :disabled="true"/>
						</a-form-item>
					</a-col>
				</a-row>
			</div>
			<!--========= START HEAD TORIAI ===========-->

			<!--========= START MATRIX TORIAI ===========-->
			<div :style="{ display: 'flex' }">
				<div
					:style="{
            flex: 20,
            display: 'flex',
            flexDirection: 'column-reverse',
          }"
				>
					<!--========= START TABLE ORDER ===========-->
					<a-table
						v-if="gyoData"
						bordered
						:data-source="gyoData"
						:columns="gyoColumns"
						:pagination="false"
						:style="{padding: '16px 9px !important;'}"
					/>
					<!--========= END TABLE ORDER ===========-->
					<div :style="{marginBottom: '10px'}">
						<a-space direction="vertical">
							<a-radio-group v-model="typeToriai" buttonStyle="solid">
								<a-radio-button value="FAST">
									Fast cut
								</a-radio-button>
								<a-radio-button value="SAVES">
									Saves cut
								</a-radio-button>
							</a-radio-group>
							<a-button type="primary" :loading="loadingToriai" :block="true" @click="() => runAlgorithm()">
								Toriai
							</a-button>
						</a-space>

					</div>
				</div>
				<div :style="{ flex: 80, flexDirection: 'column' }">
					<div>
						<!--========= START TABLE MATERIAL===========-->
						<a-table
							rowKey="uid"
							bordered
							:data-source="retsuData"
							:columns="retsuColumns"
							:pagination="false"
						/>
						<!--========= END TABLE MATERIAL ===========-->
					</div>
				</div>
			</div>
			<!--========= END MATRIX TORIAI ===========-->

			<!--========= START SUMMARY RESULT TORIAI ===========-->
			<a-table
				:style="{marginTop: '50px'}"
				:columns="summaryColumns"
				:data-source="summaryData"
				bordered
				:pagination="false"
			>
				<template slot="rateRemain" slot-scope="text" v-if="text">
					<a>{{ text + '%' }}</a>
				</template>
			</a-table>
			<!--========= END SUMMARY RESULT TORIAI ==========-->

			<template slot="footer">
				<a-button type="primary">
					Save Toriai
				</a-button>
				<a-button type="primary" icon="download" >
					Print Toriai
				</a-button>
				<a-button type="dashed" @click="() => setToriaiVisible()">
					Cancel
				</a-button>
			</template>
		</a-modal>
	</div>
</template>

<script>
  import {formatNumber} from "@/utils/util";
  import moment from 'moment';
  import {mapActions} from "vuex";
  const NUMBER_COLUMNS = 12;

  let getGyoColumns = (dataGyo) => {
    let renderGyoContent = (value, row, index) => {
      const obj = {
        children: value,
        attrs: {},
      };
      if (index >= dataGyo.length - 2) {
        obj.attrs.colSpan = 0;
      }
      return obj;
    };
    return [
      {
        title: "Index",
        key: "index",
        dataIndex: "index",
        // customRender: (data, record, index) => index + 1,
        customRender: (text, row, index) => {
          if (index < dataGyo.length - 2) {
            return index + 1;
          }
          if (index === dataGyo.length - 2) {
            return {
              children: 'Used',
              attrs: {
                colSpan: 3
              }
            }
          }
          return {
            children: 'Remain',
            attrs: {
              colSpan: 3
            }
          }
        },
      },
      {title: "Length", dataIndex: "length", customRender: renderGyoContent},
      {title: "Quantity", dataIndex: "quantity", customRender: renderGyoContent},
    ];
	};

  let getRetsuColumns = (dataRetsu) => {
    console.log('dataRetsu.length: ', dataRetsu.length);
    return dataRetsu.map((el, index, _initArr) => ({
      title: index + 1,
      dataIndex: index,
      key: index,
      width: 72,
      textWrap: "word-break",
      ellipsis: true,
      style: {},
      customRender: (data, _record) => {
        // return record[index] || '';
        return data || '.';
      },
    }));
	};

  let convertRetsuData = (data) => {
    let convertRetsuData = [];
    convertRetsuData.push(
      data.reduce(
        (acc, curr, index) => ({
          ...acc,
          [index]: curr.bozaimotoToriaiHeadNo,
        }),
        {}
      )
    );
    convertRetsuData.push(
      data.reduce(
        (acc, curr, index) => ({
          ...acc,
          [index]: curr.length,
        }),
        {}
      )
    );
    convertRetsuData.push(
      data.reduce(
        (acc, curr, index) => ({
          ...acc,
          [index]: curr.quantity,
        }),
        {}
      )
    );
    return convertRetsuData;
  };

  let convertKankeiData = (data) => {
    let convertKankeiData = [];
    data.forEach(item => {
      convertKankeiData.push({...item});
    });
    return convertKankeiData;
	};

  let getRetsuDataDefault = () => {
    let data = [];
    for (let i = 1; i <= NUMBER_COLUMNS; i++) {
      data.push({key: i, retsuNo: i, bozaimotoToriaiHeadNo: "", length: 0, quantity: 0});
    }
    return data;
	};

  /*let gyoData = [
    {key: 1, length: 10000, quantity: 3},
    {key: 2, length: 12000, quantity: 5},
    {key: 3, length: 13000, quantity: 6},
    {key: 4, length: 0, quantity: 0},
    {key: 5, length: 0, quantity: 0},
  ];*/

  const retsuDataDefault = getRetsuDataDefault();

  const itemKankeiDefault = Array.apply(null, Array(NUMBER_COLUMNS)).map(function () {return 0});

  let summaryData = [
    {
      key: '1',
      totalLengthExpected: 168000,
      totalQuantity: 14,
      totalLengthUsed: 182000,
      totalLengthRemain: 14000,
      rateUse: 80,
			rateRemain: 20,
			branch: ''
    }
  ];

  let summaryColumns = [
    {
      title: 'Total length expected',
      dataIndex: 'totalLengthExpected',
			customRender: (data) => {
        return data ? (formatNumber(data) + ' mm') : ''
			}
    },
    {
      title: 'Total quantity',
      dataIndex: 'totalQuantity',
    },
    {
      title: 'Total length Used',
      dataIndex: 'totalLengthUsed',
      customRender: (data) => {
        return data ? (formatNumber(data) + ' mm') : ''
      }
    },
    {
      title: 'Total length remain',
      dataIndex: 'totalLengthRemain',
      customRender: (data) => {
        return data ? (formatNumber(data) + ' mm') : ''
      }
    },
    {
      title: 'Rate of use',
      dataIndex: 'rateUse',
      customRender: (data) => {
        return data ? (data + '%') : ''
      }
    },
		{
      title: 'Rate of remain',
      dataIndex: 'rateRemain',
      scopedSlots: { customRender: 'rateRemain' },
    },
  ];

  export default {
    name: "ModalToriai",
    props: {
      msg: String,
    },
    data() {
      return {
        dateFormat: 'YYYY/MM/DD',
        toriaiVisible: false,
        gyoData: [],
        gyoColumns: [],
        retsuData: [],
        retsuColumns: getRetsuColumns(retsuDataDefault),
        loadingToriai: false,
        typeToriai: 'FAST',
        summaryData,
        summaryColumns,
      };
    },
		created() {

		},
    methods: {
      ...mapActions('toriai', ['exeAlgorithm']),
      moment,
      setToriaiVisible() {
        this.toriaiVisible = !this.toriaiVisible;
      },
			setGyoData(dataGyo) {
        this.gyoData = dataGyo;
        this.gyoColumns = getGyoColumns(dataGyo);
			},
      setRetsuDataPreKankei(dataGyo, dataRetsuParent, dataKankeiParent) {
        let kankeiData = dataKankeiParent || [];
				if (kankeiData.length === 0) {
          for (let i = 0; i < dataGyo.length; i++) {
            kankeiData.push(itemKankeiDefault);
          }
				}
        this.retsuData =  [...convertRetsuData(dataRetsuParent || retsuDataDefault), ...convertKankeiData(kankeiData)];
			},
      setSummaryData(summaryData) {
        this.summaryData = [...summaryData]
			},
      runAlgorithm() {
        try {
          this.loadingToriai = !this.loadingToriai;
          let toriaiHead = {
            branch: {
              branchName: this.summaryData[0].branch
            },
            materialType: {
              materialTypeName: this.summaryData[0].type,
              dimension: this.summaryData[0].dimension,
            },
            typeToriai: this.typeToriai,
            totalLengthExpected: this.summaryData[0].totalLengthExpected,
            totalQuantity: this.summaryData[0].totalQuantity,
            listToriaiGyo: this.gyoData.slice(0, this.gyoData.length - 2),
            listToriaiRetsu: getRetsuDataDefault(),
          };
          console.log("375 toriaiHead: ", toriaiHead);
          this.exeAlgorithm(toriaiHead).then(result => {
            if (result.status === 200) {
              let toriaiHead = result.body;
              let listToriaiRetsu = toriaiHead.listToriaiRetsu;
              let kankeiData = toriaiHead.algorithmResult;
              kankeiData.push(listToriaiRetsu.map(item => item.lengthUsed), listToriaiRetsu.map(item => item.lengthRemaining));
              this.retsuData =  [...convertRetsuData(listToriaiRetsu || retsuDataDefault), ...convertKankeiData(kankeiData)];
              this.summaryData[0].totalLengthUsed = toriaiHead.totalLengthUsed;
              this.summaryData[0].totalLengthRemain = toriaiHead.totalLengthRemain;
              this.summaryData[0].rateUse = toriaiHead.rateUse;
              this.summaryData[0].rateRemain = toriaiHead.rateRemain;
            } else {
              this.$message.error(result.message);
            }
            this.loadingToriai = !this.loadingToriai;
          })
        } catch (e) {
          this.loadingToriai = !this.loadingToriai;
        }
      },
    },
  }
</script>

<style lang="less" scoped>
		.ant-table-thead > tr > th, .ant-table-tbody > tr > td {
			padding: 9px 9px !important;
		}
</style>
