<template>
	<Scroll :on-reach-bottom="handleReachEdge" class="staff_list" :distance-to-edge="0">
		<div class="title">成员名称</div>
		<peopleList :staffListData="staffListData" @staffListHandler="staffListHandler"></peopleList>
	</Scroll>
</template>

<script>
import peopleList from '../components/peopleList'
export default {
	props: {
		staffListData: {
			type: Array,
			default: []
		}
	},
	components: { peopleList },
	methods: {
		handleReachEdge() {
			this.$emit('handleReachEdge')
		},
		staffListHandler(item) {
			this.$emit('staffListHandler', item)
		}
	}
}
</script>
<style lang="less" scoped>
.staff_list {
	height: 100%;
	width: 48%;
	margin-right: 0;
	/deep/.ivu-scroll-container {
		height: 100% !important;
		padding: 0 24px 24px 24px;
		overflow-y: auto;
	}
	.title {
		padding: 14px 0;
	}
}
</style>
