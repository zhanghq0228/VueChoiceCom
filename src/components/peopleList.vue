<template>
	<ul class="peopleList">
		<li v-if="staffListData.length == 0" class="emitList">暂无数据</li>
		<li v-for="item in staffListData" :key="item.od" @click="$emit('staffListHandler', item)" v-else>
			<div class="li_img"></div>
			<div class="li_name ellipsis">{{ item.title }}</div>
			<div class="li_icon"></div>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		staffListData: {
			type: Array,
			default: []
		}
	}
}
</script>
<style lang="less" scoped>
ul {
	.emitList {
		text-align: center;
	}
	li {
		height: 32px;
		line-height: 32px;
		padding: 0 11px;
		color: #9eabbe;
		font-size: 12px;
		position: relative;
		margin-bottom: 10px;
		&:hover {
			background-color: #f4f6fa;
			color: #5c64ae;
			.li_img {
				background-image: url('../assets/img/approval_5.png');
			}
			.li_icon {
				color: #5f5c7f;
				display: block;
				background-image: url('../assets/img/approval_9.png');
			}
		}
	}
	.li_img {
		position: absolute;
		width: 18px;
		height: 18px;
		left: 11px;
		top: 50%;
		transform: translateY(-50%);
		background-image: url('../assets/img/approval_6.png');
		background-size: contain;
		background-repeat: no-repeat;
	}
	.li_name {
		padding-left: 28px;
		padding-right: 36px;
	}
	.li_icon {
		position: absolute;
		width: 24px;
		height: 24px;
		top: 50%;
		transform: translateY(-50%);
		right: 7px;
		background-repeat: no-repeat;
		background-size: auto;
		background-position: center;
		display: none;
	}
}
</style>
