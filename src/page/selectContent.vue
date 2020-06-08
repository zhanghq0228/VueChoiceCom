<template>
	<div class="selectCon">
		<p class="selectTitle">
			<span>已选</span>
			<span class="title_num approvalNum">({{ selectData.length ? selectData.length : 0 }})</span>
		</p>
		<ul class>
			<li class="cl" v-for="(item, index) in selectData" :key="index">
				<div :title="item.title">
					<Icon v-if="treeType == 'ALL_TYPE'" type="md-person" />
					<Icon v-else type="ios-folder-open" />
					<span class="right_title">{{ item.title }}</span>
				</div>
				<Icon @click.native="delRangeData(index, item)" size="26" class="right_li_icon" type="ios-close" />
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ['selectData', 'treeType'],
	methods: {
		delRangeData(index, item) {
			this.$emit('del_select_data', index, item)
		}
	}
}
</script>

<style lang="less" scoped>
.selectCon {
	padding: 24px;
	padding-top: 0;
	ul {
		height: 75vh;
		overflow-y: auto;
	}
	li {
		position: relative;
		color: #9eabbe;
		font-size: 12px;
		height: 32px;
		line-height: 32px;
		padding: 0 11px;
		margin-bottom: 10px;
		.right_title {
			margin-left: 10px;
		}
		&:hover {
			background-color: #f4f6fa;
			color: #5c64ae;

			.right_li_icon {
				color: #5f5c7f;
			}
		}
	}

	.right_li_icon {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 7px;
		cursor: pointer;
	}
	.selectTitle {
		padding: 14px 0;
		color: #9eabbe;
		font-size: 14px;
		font-weight: bold;
		.approvalNum {
			color: #5864b5;
			margin: 0 10px;
		}
	}
}
</style>
