<template>
	<div class="search">
		<Input prefix="ios-search" placeholder="请输入搜索内容" v-model="searchInp" @on-enter="showRangeSearch" />
		<Button class="_theme_b" type="primary" @click="showRangeSearch">搜索</Button>
	</div>
</template>

<script>
export default {
	props: {
		searchValue: {
			type: String,
			default: ''
		},
		searchChange: {
			type: Function,
			required: true,
			default: val => val
		}
	},
	computed: {
		searchInp: {
			get() {
				return this.searchValue
			},
			set(newVal) {
				this.searchChange(newVal)
			}
		}
	},
	methods: {
		async showRangeSearch() {
			this.$emit('search_inp_val', this.searchInp)
		}
	}
}
</script>

<style lang="less" scoped>
.search {
	height: 70px;
	padding: 14px 23px;
	border-bottom: 1px solid #ecf1f8;
	display: flex;
	justify-content: flex-start;
	/deep/.ivu-input-wrapper {
		width: 350px;
		margin-right: 20px;
		.ivu-input {
			background-color: #f4f6fa;
			width: 350px;
		}
	}
}
</style>
