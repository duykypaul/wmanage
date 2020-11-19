<template>
  <div>
    <a-card :title="$t('material')" :bordered="false">
      <add-material ref="material" />
    </a-card>
    <!--<footer-tool-bar>
      <a-button type="primary" @click="validate" :loading="loading">{{$t('submit')}}</a-button>
    </footer-tool-bar>-->
  </div>
</template>

<script>
import AddMaterial from './AddMaterial'
import FooterToolBar from '@/components/tool/FooterToolBar'

export default {
  name: 'AddNewMaterial',
  components: {AddMaterial},
  i18n: require('./i18n'),
  data () {
    return {
      loading: true
    }
  },
  computed: {
    desc() {
      return this.$t('desc')
    }
  },
  methods: {
    validate () {
      /*this.$refs.material.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      });
      this.$refs.task.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })*/
    }
  }
}
</script>

<style lang="less" scoped>
  .card{
    margin-bottom: 24px;
  }
</style>
