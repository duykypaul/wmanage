<template>
  <div>
    <a-card :title="$t('material')" :bordered="false">
      <user-form />
    </a-card>
    <footer-tool-bar>
      <a-button type="primary" @click="validate" :loading="loading">{{$t('submit')}}</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import UserForm from './AddMaterial'
import FooterToolBar from '@/components/tool/FooterToolBar'

export default {
  name: 'AddNewMaterial',
  components: {FooterToolBar, UserForm},
  i18n: require('./i18n'),
  data () {
    return {
      loading: false
    }
  },
  computed: {
    desc() {
      return this.$t('desc')
    }
  },
  methods: {
    validate () {
      /*this.$refs.repository.form.validateFields((err, values) => {
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
