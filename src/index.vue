<template>
	<Drawer class="drawer_range" :width="width" @on-close="$emit('closeHandler')" :title="title" v-model="drawerShow">
		<div class="selectTree">
			<searchInput :searchValue="searchValue" @search_inp_val="searchInpHandler" :searchChange="searchChange"></searchInput>
			<peopleList :staffListData="searchList" @staffListHandler="staffListHandler" v-if="searchValue != '' && showSearchList"></peopleList>
			<div class="content">
				<div class="left">
					<treeConent
						:treeType="treeType"
						@tabHandler="tabHandler"
						:treeData="treeData"
						:showCheckBox="showCheckBox"
						@on-check-change="checkHandler"
						@on-tree-click="clickHandler"
					></treeConent>
					<div class="borderCenter"></div>
					<staffList
						v-if="treeType == 'ALL_TYPE'"
						:staffListData="staffListData"
						@handleReachEdge="handleReachEdge"
						@staffListHandler="staffListHandler"
					></staffList>
				</div>
				<div class="borderCenter"></div>
				<div class="rigth">
					<selectContent :selectData="selectData" :treeType="treeType" @del_select_data="delSelectHandler"></selectContent>
				</div>
			</div>
		</div>
		<div class="footer">
			<Button @click="clearHandler">取消</Button>
			<Button @click="submit" type="primary">确定</Button>
		</div>
	</Drawer>
</template>

<script>
import searchInput from './components/searchInput'
import peopleList from './components/peopleList'
import selectContent from './page/selectContent'
import treeConent from './page/treeConent'
import staffList from './page/staffList'
import { convertTree, responseTree } from './util/util'
export default {
	props: {
		// 操作外部显隐函数 必传
		visibleShow: {
			type: Function,
			required: true,
			default: val => val
		},
		width: {
			type: String,
			default: '610'
		},
		title: {
			type: String,
			default: '选择'
		},
		show: {
			type: Boolean,
			default: false
		},
		showCheckBox: {
			type: Boolean,
			default: true
		},
		// 树需要展示数据 POST_TYPE:岗位 ROLE_TYPE:角色 DEPT_TYPE:部门 COST_TYPE:费用类型 ALL_TYPE:角色岗位部门
		treeType: {
			type: String,
			default: 'COST_TYPE'
		},
		reverSelect: {
			type: Array,
			default: []
		}
	},
	computed: {
		drawerShow: {
			get() {
				return this.show
			},
			set(val) {
				this.visibleShow(val)
			}
		}
	},
	components: { searchInput, selectContent, treeConent, staffList, peopleList },
	watch: {
		show(val) {
			if (val) {
				this.initTree(this.treeType)
			}
		},
		reverSelect(val) {
			this.selectData = val
		}
	},
	data() {
		return {
			selectData: [], //选择数据
			treeData: [], //树列表
			staffListData: [], //人员列表
			pageNum: 1,
			pageSize: 20,
			staffListTotal: 0, //人员总数 用于滚动
			departmentId: '', //部门id
			DEPT_TYPE: [], //部门树
			ROLE_TYPE: [], //角色树
			POST_TYPE: [], //岗位数
			searchList: [], //搜索list
			showSearchList: false,
			searchValue: ''
		}
	},
	methods: {
		//初始化tree
		async initTree(treeType) {
			let flag = false
			if (treeType == 'ALL_TYPE') {
				treeType = 'DEPT_TYPE'
				flag = true
			}
			const params = {
				companyId: sessionStorage.companyId,
				compId: sessionStorage.companyId,
				pageSize: 1000000
			}
			const getTreeDataMethod = this.$config[treeType]
			let { data } = treeType == 'COST_TYPE' ? await this.$config[treeType](4) : await getTreeDataMethod(params)
			if (data.code !== 10200) {
				this.$Message.info(data.message)
				return
			}
			const selectIdList = this.selectData.map(item => item.id)
			const response = responseTree(treeType, data, selectIdList)
			flag ? this.getStaffList() : ''
			this.treeData = response
			return response
		},
		//获取成员列表
		async getStaffList() {
			let { data } = await this.$config['ALL_TYPE']({
				compId: sessionStorage.companyId,
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				departmentId: this.departmentId
			})
			if (data.code !== 10200) {
				this.$Message.info(data.message)
				return
			}
			const response = convertTree(data.data.data, {
				id: 'id',
				userId: 'userId',
				children: 'children',
				title: 'userName'
			})
			this.staffListData = [...this.staffListData, ...response]
			this.staffListTotal = data.data.total
		},
		//切换岗位
		async tabHandler(item) {
			console.log(item.type, 'this[item.type] ')
			if (this[item.type].length > 0) {
				this.treeData = this[item.type]
			} else {
				let response = await this.initTree(item.type)
				this[item.type] = response
			}
		},
		//搜索
		async searchInpHandler(val) {
			const dogSwitch = breed =>
				({
					POST_TYPE: this.$config.POST_TYPE,
					ROLE_TYPE: this.$config.ROLE_TYPE,
					DEPT_TYPE: this.$config.DEPT_TYPE,
					COST_TYPE: this.$config.COST_TYPE,
					ALL_TYPE: this.$config.SEARCH_DEPT
				}[breed])
			// POST_TYPE:岗位 ROLE_TYPE:角色 DEPT_TYPE:部门 COST_TYPE:费用类型 ALL_TYPE:角色岗位部门
			const promiseFun = dogSwitch(this.treeType)

			const params = {
				companyId: sessionStorage.companyId,
				compId: sessionStorage.companyId,
				positionName: val,
				departName: val,
				roleName: val,
				keyword: val,
				pageSize: 100
			}
			this.searchList = []
			let { data } = await promiseFun(params)
			if (data.code != 10200) {
				this.$Message.info(data.message)
				return
			}
			this.showSearchList = true
			const response = responseTree(this.treeType, data)
			this.searchList = response
		},
		searchChange(val) {
			this.showSearchList = false
			this.searchValue = val
		},
		//滚动加载更多
		handleReachEdge() {
			this.staffListData.length < this.staffListTotal ? this.pageNum++ : ''
			this.getStaffList()
		},
		// tree 单击
		clickHandler(data) {
			if (this.treeType == 'ALL_TYPE') {
				this.departmentId = data.id
				this.staffListData = []
				this.getStaffList()
			} else if (!this.showCheckBox) {
				this.dupRemove(data)
			}
			// this.showCheckBox ? '' : this.dupRemove(data)
		},
		// tree 复选框单击
		checkHandler(data) {
			this.selectData = data
		},
		//人员选中
		staffListHandler(item) {
			this.showSearchList = false
			this.dupRemove(item)
		},
		//删除选中
		delSelectHandler(index, item) {
			this.selectData.splice(index, 1)
			item.checked = false
		},
		//选中去重
		dupRemove(data) {
			const selectIndex = this.selectData.findIndex(item => item.id == data.id)
			selectIndex >= 0 ? this.selectData.splice(selectIndex, 1) : this.selectData.push(data)
		},
		//确定
		submit() {
			this.$emit('submit', this.selectData)
		},
		//取消
		clearHandler() {
			this.drawerShow = false
			this.selectData = []
			this.showSearchList = false
			this.searchValue = ''
		}
	}
}
</script>

<style lang="less" scoped>
@widths: 100%;
.selectTree {
	position: relative;
	height: 100%;
}
.peopleList {
	border: 1px solid #ecf1f8;
	border-radius: 5px;
	z-index: 111;
	top: 50px;
	left: 20px;
	position: absolute;
	height: 150px;
	overflow-y: auto;
	background-color: #ffffff;
	min-width: 350px;
}
.content {
	display: flex;
	flex-direction: row;
	height: calc(100% - 160px);
	.left {
		width: 65%;
		overflow: auto;
		display: flex;
		/deep/.comment_tree {
			width: 100% !important;
		}
		/deep/.ivu-scroll-wrapper {
			min-width: 50%;
		}
	}
	.borderCenter {
		border-right: 1px solid #ecf1f8;
	}
	.rigth {
		width: 35%;
	}
}
.footer {
	position: absolute;
	bottom: 28px;
	width: 100%;
	text-align: center;
	border-top: 1px solid #ecf1f8;
	padding: 28px 0;
	height: 40px;
	background: #fff;
	/deep/.ivu-btn {
		width: 150px;
		height: 40px;
		background-color: #f4f6fa;
	}
	/deep/.ivu-btn-primary {
		margin-left: 20px;
		color: #fff;
		background: linear-gradient(159deg, #5665b4 0%, #755f90 100%);
	}
}
</style>
