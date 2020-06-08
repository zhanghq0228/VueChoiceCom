<template>
	<div class="comment_tree">
		<ul class="tab_list" v-if="treeType == 'ALL_TYPE'">
			<li v-for="(item, index) in tabList" :key="item.type" @click="tabHandler(item, index)" :class="{ active: index == activeIndex }">
				{{ item.title }}
			</li>
		</ul>
		<Tree
			:data="treeData"
			:render="treeRenderContent"
			multiple
			:show-checkbox="showCheckBox"
			:check-strictly="true"
			@on-check-change="onCheckChange"
		></Tree>
	</div>
</template>

<script>
export default {
	name: 'iview-tree',
	props: {
		showCheckBox: {
			type: Boolean,
			default: false,
		},
		treeData: {
			type: Array,
		},
		echoData: {
			//树结构回显数据
			type: Object,
		},
		isShowCheckbox: Boolean,
		treeType: String,
	},
	data() {
		return {
			nodeItem: {},
			activeIndex: 0,
			tabList: [
				{ title: '部门', type: 'DEPT_TYPE' },
				{ title: '角色', type: 'ROLE_TYPE' },
				{ title: '岗位', type: 'POST_TYPE' },
			],
		}
	},
	methods: {
		//点击了复选框
		onCheckChange(data) {
			this.$emit('on-check-change', data)
		},
		nodeChilkHandle(val) {
			if (this.nodeItem.nodeKey == val.nodeKey) return
			this.nodeItem.selected = false
			this.$set(val, 'selected', val.selected == undefined ? true : !val.selected)
			this.$set(val, 'expand', val.expand == undefined ? true : true)
			this.nodeItem = val
			this.$emit('on-tree-click', val)
		},
		treeRenderContent(h, { root, node, data }) {
			return (
				<span class={data.selected ? 'span_title selected' : 'span_title'} title={data.title} onClick={() => this.nodeChilkHandle(data)}>
					<img class="treeImg" src={require(`../assets/img/${data.selected ? 'approval_7.png' : 'approval_8.png'}`)} />
					<span>{data.title}</span>
				</span>
			)
		},
		handleDefaultTreeData(data) {
			data.map(item => {
				item.checked == undefined || item.checked == '' ? (item.checked = false) : ''
				if (item.children && item.children.length) {
					this.handleDefaultTreeData(item.children)
				}
				// item.checked ?item.checked = false
			})
		},
		tabHandler(item, index) {
			this.activeIndex = index
			this.$emit('tabHandler', item)
		},
	},
}
</script>

<style lang="less" scoped></style>
<style lang="less">
.comment_tree {
	padding: 0 10px;
	overflow-y: auto;
	.treeImg {
		vertical-align: text-bottom;
		margin-right: 10px;
		margin-left: 10px;
	}
	ul {
		li {
			margin: 15px 0;
			.span_title {
				display: inline-block;
				cursor: pointer;
				color: #9eabbe;
				font-size: 12px;
				padding: 5px 10px 5px 0;
				&.selected {
					color: #5a65b0;
					font-weight: bold;
					background-color: #f4f6fa;
					max-width: 100%;
				}
			}
		}
	}
	.tab_list {
		cursor: pointer;
		margin: 17px 24px 0;
		border: 1px solid #9eabbe;
		line-height: 35px;
		color: #9eabbe;
		font-size: 14px;
		font-weight: 700;
		background-color: #f4f6fa;
		border-radius: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		li {
			text-align: center;
			margin: 0;
			flex: 1;
		}
		.active {
			background-color: #5c63ac;
			color: #fff;
		}
	}
}
</style>
