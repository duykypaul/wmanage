<template>
  <div>
    <a-card class="card" :title="$t('order_head')" :bordered="false">
      <order-head-form ref="orderHead" :showSubmit="false" />
    </a-card>
    <a-card :title="$t('consignments')" :bordered="false">
      <add-order ref="consignments" />
    </a-card>
    <footer-tool-bar>
      <a-space>
        <a-button type="primary" @click="createOrder" :loading="loading">{{$t('submit')}}</a-button>
      </a-space>
    </footer-tool-bar>
  </div>
</template>

<script>
import FooterToolBar from '@/components/tool/FooterToolBar'
import AddOrder from "@/pages/order/add/AddOrder";
import OrderHeadForm from "@/pages/order/add/OrderHeadForm";
import {mapActions, mapGetters} from "vuex";
import moment from 'moment';

export default {
  name: 'AddNewOrder',
  components: {OrderHeadForm, AddOrder, FooterToolBar},
  i18n: require('./i18n'),
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters('order', ['listConsignment']),
    desc() {
      return this.$t('desc')
    }
  },
  methods: {
    ...mapActions('order', ['saveOrder']),
    createOrder () {
      let consignmentBeans = this.listConsignment;
      this.$refs.orderHead.form.validateFields((err, values) => {
        if (!err) {
          if (consignmentBeans.length > 0) {
            let orderBean = {
              customer: values.orderBean.name,
              deliveryAddress: values.orderBean.delivery_address,
              deliveryDate: moment(values.orderBean.delivery_date).format('YYYY-MM-DD'),
              branch: {
                branchCode: values.orderBean.branch
              },
              status: 'IMPORTED',
              consignments: consignmentBeans
            };
            this.saveOrder(orderBean).then(result => {
              if (result.status === 200) {
                this.$message.success("Save data success!", 3);

                // reset data in screen
                this.$refs.orderHead.resetData();
                this.$refs.consignments.resetData();
              } else {
                this.$message.error(result.message);
              }
            })
          } else {
            this.$message.error('Please fill out list consignment');
          }
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
  .card{
    margin-bottom: 24px;
  }
</style>
