# vue-department-staff

### Install
```
npm install vue-department-staff
```

### How to use
在 **main.js** 中引用如下
```
import Vue from 'vue';
import VueChoiceCom from 'department-tree';
// 接口API
const apiRes = {
  POST_TYPE: 'aaa',
  ROLE_TYPE: 'bb',
  DEPT_TYPE: 'ccc',
  COST_TYPE: 'vdd',
  ALL_TYPE: 'rrrr'
};
Vue.use(VueChoiceCom, apiRes);
```

### 组件中使用
```
<VueChoiceCom 
          v-model="show" 
          :checked="selectList"
          @handler-close="" 
          @handler-submit="submitContact"/>
```

### 参数说明
**title**弹框标题<br />
**width**宽度 默认610<br />
**show**显示隐藏<br />
**visibleShow**fun  操作外部显隐 必传<br />
**showCheckBox**是否显示复选<br />
**treeType**组件展示类似 <br />
**reverSelect**已选人员 <br />

