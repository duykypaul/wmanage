import Mock from 'mockjs'
import '@/mock/extend'

const user = Mock.mock({
  name: '@ADMIN',
  avatar: '@AVATAR',
  address: '@CITY',
  position: '@POSITION'
})
Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/login`, 'post', ({body}) => {
  let result = {};
  const {name, password} = JSON.parse(body);
  console.log(name, password);
  if (name !== 'duykypaul' || password !== '123456') {
    result.code = -1;
    result.message = 'Incorrect user name or password (admin/123456)'
  } else {
    result.code = 0;
    result.message = Mock.mock('@TIMEFIX').US + '，welcome back';
    result.data = {};
    result.data.user = user;
    result.data.token = 'Authorization:' + Math.random();
    result.data.expireAt = new Date(new Date().getTime() + 8 * 3600 * 1000);
    result.data.permissions = [{id: 'queryForm', operation: ['add', 'edit']}];
    result.data.roles = [{id: 'admin', operation: ['add', 'edit', 'delete']}]
  }
  return result;
});
