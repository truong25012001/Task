const Task = require("../model/task.model");
const paginationHelper = require("../../../helper/pagination");
const searchHelper = require("../../../helper/search");


// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {

	// Bộ lọc
	//Lấy ra công việc của người tạo ra task hoặc người tham gia vào task
	let find = {
		$or: [
			{createdBy: req.user.id},
			{listUsers: req.user.id}
		],
		deleted: false
	}
	if (req.query.status) {
		find.status = req.query.status;
	}

	// Bộ lọc

	//Pagination
	const countTasks = await Task.countDocuments(find);
	let objectPagination = paginationHelper(
		{
			limitItem: 2,
			currentPage: 1
		},
		req.query,
		countTasks
	);

	//Pagination

	// Sort
	let sort = {}

	if (req.query.sortKey && req.query.sortValue) {
		sort[req.query.sortKey] = req.query.sortValue;
	} else {
		sort.title = "asc";
	}

	// Sort


	//Search

	let objectSearch = searchHelper(req.query);
	if(objectSearch.regex) {
		find.title = objectSearch.regex;
	}

	//Search


	const task = await Task.find(find)
		.limit(objectPagination.limitItem)
		.skip(objectPagination.skip)
		.sort(sort);

	res.json(task);
}


// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
	const id = req.params.id;

	const task = await Task.findOne({
		_id: id,
		deleted: false
	})

	res.json(task);
}

// [PATCH] /api/v1/tasks/change-status/:id

module.exports.changeStatus = async (req, res) => {

	try {
		const id = req.params.id;
		await Task.updateOne({
			_id: id
		}, {status: req.body.status});

		res.json({
			code: 200,
			message: "Cập nhật trạng thái thành công"
		})
	} catch (error) {
		res.json({
			code: 400,
			message: "Cập nhật trạng thái không thành công",
		})
	}

	
}

//[PATCH] /api/v1/tasks/change-multi

module.exports.changeMulti = async (req, res) => {

	try {
		const {ids, key, value} = req.body;

		switch (key) {
			case "status":
				await Task.updateMany({_id: {$in: ids}}, {key: value});
				res.json({
					code: 200,
					message: "Cập nhật trạng thái thành công"
				})
				break;
			case "delete":
				await Task.updateMany({_id: {$in: ids}}, {
					deleted: true,
					deletedAt: new Date()
				});
				res.json({
					code: 200,
					message: "Xóa công việc thành công"
				})
				break;
			
			default:
				res.json({
					code: 400,
					message: "Cập nhật trạng thái không thành công"
				})
				break;
		}
	} catch (error) {
		res.json({
			code: 400,
			message: "Cập nhật trạng thái không thành công"
		})
		
	}
}


//[POST] /api/v1/tasks/create

module.exports.create = async (req, res) => {

	try {
		req.body.createdBy = req.user.id;
		const data = new Task(req.body);
		await data.save();

		res.json({
			code: 200,
			message: "Tạo công việc thành công", 
			data: data
		})
	} catch (error) {
		res.json({
			code: 400,
			message: "Tạo mới công việc thất bại"
		})
	}
}

//[PATCH] /api/v1/tasks/edit/:id

module.exports.edit = async (req, res) => {

	try {

		const id = req.params.id;
		await Task.updateOne({
			_id: id
		}, req.body);

		res.json({
			code: 200,
			message: "Cập nhật công việc thành công"
		})
	} catch (error) {
		res.json({
			code: 400,
			message: "Cập nhật công việc thất bại"
		})
	}
}

//[DELETE] /api/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {

	try {
		const id = req.params.id;
		await Task.updateOne({
			_id: id
		}, {
			deleted: true,
			deletedAt: new Date()
		})
		res.json({
			code: 200,
			message: "Xóa công việc thành công"
		})
	} catch (error) {
		res.json({
			code: 400,
			message: "Lỗi"
		})
	}
}