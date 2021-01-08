<template>
	<a-form @submit="handleSubmit" :form="form" class="form">
		<a-row class="form-row">
			<a-col :lg="5" :md="12" :sm="24">
				<a-form-item :label="$t('name')">
					<a-input
						:placeholder="$ta('input|name')"
						autoComplete="off"
						v-decorator="['orderBean.name', {rules: [{ required: true, message: $ta('input|name'), whitespace: true}]}]"
					/>
				</a-form-item>
			</a-col>
			<a-col :xl="{span: 6, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
				<a-form-item :label="$t('delivery_address')">
					<a-input
						:placeholder="$ta('input|delivery_address')"
						autoComplete="off"
						v-decorator="['orderBean.delivery_address', {rules: [{ required: true, message: $ta('input|delivery_address'), whitespace: true}]}]"
					/>
				</a-form-item>
			</a-col>
			<a-col :xl="{span: 6, offset: 1}" :lg="{span: 10}" :md="12" :sm="24">
				<a-form-item :label="$t('delivery_date')">
					<a-date-picker
						style="width: 100%"
						:disabled-date="disabledDeliveryDate"
						:placeholder="$ta('input|delivery_date')"
						v-decorator="['orderBean.delivery_date', {rules: [{ required: true, message: $ta('input|delivery_date')}, {validator: validate}]}]"
					/>
				</a-form-item>
			</a-col>
			<a-col :xl="{span: 4, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
				<a-form-item :label="$t('branch')">
					<a-select
						show-search
						:placeholder="$ta('select|branch')"
						option-filter-prop="children"
						:filter-option="filterOption"
						v-decorator="['orderBean.branch', {rules: [{ required: true, message: $ta('select|branch')}]}]"
					>
						<template v-for="(item, index) in branches">
							<a-select-option :key="index" :value="item.branchCode">{{item.branchName}}</a-select-option>
						</template>
					</a-select>
				</a-form-item>
			</a-col>
		</a-row>
		<a-row class="form-row">

		</a-row>
		<a-form-item v-if="showSubmit">
			<a-button htmlType="submit">Submit</a-button>
		</a-form-item>
	</a-form>
</template>

<script>
  import moment from 'moment';
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: 'OrderHeadForm',
    props: ['showSubmit'],
    i18n: require('./i18n-order-head'),
    data() {
      return {
        form: this.$form.createForm(this),
      }
    },
    created() {
      this.fetchAllData();
    },
    computed: {
      ...mapGetters('branch', ['branches']),
      ...mapGetters('materialType', ['dimensions', 'types']),
      ...mapGetters('order', ['listConsignment']),
    },
    methods: {
      ...mapActions('branch', ['getBranches']),
      ...mapActions('materialType', ['getDimensions', 'getTypes']),
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
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
      validate(rule, value, f) {
        if (value !== undefined && moment(value).isBefore(moment().add(-1, 'days'))) {
          f('输入\'iczer\'试下？')
        }
        f()
      },
      disabledDeliveryDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
			},
			resetData() {
        /*let data = ['name'];
				this.form.resetFields(data);*/
				this.form.resetFields();
			}
    }
  }
</script>

<style lang="less" scoped>
	.form {
		.form-row {
			margin: 0 -8px
		}

		.ant-col-md-12,
		.ant-col-sm-24,
		.ant-col-lg-6,
		.ant-col-lg-8,
		.ant-col-lg-10,
		.ant-col-xl-8,
		.ant-col-xl-6 {
			padding: 0 8px
		}
	}
</style>
