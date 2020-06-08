/**
 * tree 数据转换
 * @param {*} tree tree 待转换的 tree
 * @param {*} map map  键值对映射
 * @param {*} selectData selectData  选择数据list
 * @return {Array}      转换后的 tree
 */
export const convertTree = (tree, map, selectData = []) => {
	// console.log(selectData)
	const result = []
	tree.forEach(item => {
		const id = item[map.id]
		const title = item[map.title]
		let children = item[map.children]
		let userId = item[map.userId]
		let level = item[map.level]
		const selected = selectData.includes(id) ? true : false
		children == null ? (children = []) : (children = convertTree(children, map, selectData))
		result.push({
			id,
			title,
			expand: false,
			selected,
			checked: selected,
			children,
			userId,
			level,
			disabled: level == 2 ? true : false
		})
	})
	return result
}
const dogSwitch = breed =>
	({
		POST_TYPE: 'positionName',
		DEPT_TYPE: 'departName',
		ROLE_TYPE: 'roleName',
		COST_TYPE: 'name',
		ALL_TYPE: 'userName'
	}[breed])

export const responseTree = (treeType, data, selectIdList = []) => {
	console.log(treeType)
	const coverType = {
		id: treeType == 'POST_TYPE' || treeType == 'COST_TYPE' ? 'id' : 'nodeId',
		children: 'children',
		level: 'level',
		title: dogSwitch(treeType)
		//  treeType == 'POST_TYPE' ? 'positionName' : treeType == 'DEPT_TYPE' ? 'departName' : 'roleName'
	}
	const reqData = treeType == 'ROLE_TYPE' || treeType == 'ALL_TYPE' ? data.data.data : treeType == 'COST_TYPE' ? data.data : data.data.dataTree
	const response = convertTree(reqData, coverType, selectIdList)
	return response
}
