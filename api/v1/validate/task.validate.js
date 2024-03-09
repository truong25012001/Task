module.exports.createPost = (req, res, next) => {
	if(!req.body.title) {
		res.json({
			code: 400,
			message: "Vui lòng nhập tiêu đề"
		})
		return;
	}

	if(!req.body.content) {
		res.json({
			code: 400,
			message: "Vui lòng nhập nội dung"
		})
		return;
	}

	next();
}


module.exports.editPatch = (req, res, next) => {
	if(!req.body.title) {
		res.json({
			code: 400,
			message: "Vui lòng nhập tiêu đề"
		})
		return;
	}

	if(!req.body.content) {
		res.json({
			code: 400,
			message: "Vui lòng nhập nội dung"
		})
		return;
	}

	next();
}