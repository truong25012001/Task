const User = require("../model/user.model");
const md5 = require("md5");
const generate = require("../../../helper/generate");
const ForgotPassword = require("../model/forgot-password.model");
const sendMailHelper = require("../../../helper/sendMail");

//[POST] /api/v1/users/register
module.exports.register = async (req, res) => {
	try {

		const checkEmail = await User.findOne({
			deleted: false,
			email: req.body.email
		})

		if(checkEmail) {
			res.json({
				message: 'Email đã tồn tại',
				
			})
			return;
		}
		req.body.password = md5(req.body.password);
		req.body.tokenUser = generate.generateRadomString(20);
		const user = new User(req.body);
		await user.save();
		res.cookie("tokenUser", user.tokenUser);
		res.json({
			code: 200,
			message: "Đăng kí thành công",
			user: user
		})
	} catch (error) {
		res.json({
			code: 400,
			message: "Lỗi",
			error: error
		})
	}
}

// [POST] /api/v1/users/login

module.exports.login = async (req , res) => {
	const email = req.body.email;
	const password = req.body.password;

	const user = await User.findOne({
		email: email,
		deleted: false
	});

	if(!user) {
		res.json({
			code: 400,
			message: "Email không chính xác"
		});
		return;
	}

	if(md5(password) !== user.password) {
		res.json({
			code: 400,
			message: "Mật khẩu không chính xác"
		})
		return;
	}

	const tokenUser = user.tokenUser;
	res.cookie("tokenUser", tokenUser);

	res.json({
		code: 200,
		message: "Đăng nhập thành công",
		tokenUser: tokenUser
	})
}

//[POST] /api/v1/users/password/forgot

module.exports.forgotPassword = async (req, res) => {
	const email = req.body.email;

	const user = await User.findOne({
		deleted: false,
		email: email
	})

	if(!user) {
		res.json({
			code: 400,
			message: "Không tìm thấy email"
		})
		return;
	}

	const otp = generate.generateRadomNumber(6);
	const timeExpire = 5;

	const objectForgotPassword = {
		otp: otp,
		email: email,
		expireAt: Date.now() + timeExpire * 60 * 1000
	}

	
	//Lưu vào database
	const forgotPassword = new ForgotPassword(objectForgotPassword);
	await forgotPassword.save();


	// Gửi mail
	const subject = 'Mã xác minh lấy lại mật khẩu';
	const html = `Mã OTP để lấy lại mật khẩu của bạn là: <b>${otp}</b>. Sử dụng trong ${timeExpire} phút`
	sendMailHelper.sendMail(email, subject, html);
	res.json({
		code: 200
	})


}

//[POST] /api/v1/users/password/otp

module.exports.otp = async (req, res) => {

	const email = req.body.email;
	const otp = req.body.otp;

	const forgotPassword = await ForgotPassword.findOne({
		email: email,
		otp: otp
	});

	if(!forgotPassword) {
		res.json({
			code: 400,
			message: "Otp không hợp lệ"
		})
		return;
	}

	const user = await User.findOne({
		email: email
	});

	res.cookie("tokenUser", user.tokenUser);

	res.json({
		code: 200,
		message: "Xác thực thành công",
		tokenUser: user.tokenUser
	})
}

//[POST] /api/v1/users/password/reset

module.exports.reset = async (req, res) => {
	const tokenUser = req.body.tokenUser;
	const password = req.body.password;

	const user = await User.findOne({
		deleted: false,
		tokenUser: tokenUser
	})

	if(!user) {
		res.json({
			code: 400,
			message:"User không tồn tại"
		})
		return;
	}

	await User.updateOne({
		tokenUser: tokenUser
	}, {
		password: md5(password)
	})

	res.json({
		code: 200,
		message: "Đổi mật khẩu thành công"
	})
}

//[GET] /api/v1/users/detail

module.exports.detail = async (req, res) => {
	

	res.json({
		code: 200,
		message: "Thành công",
		user: req.user
	})
}

//[GET] /api/v1/users/list

module.exports.list =  async (req, res) => {

	const list = await User.find({
		deleted: false
	}).select("fullName email");


	res.json({
		code: 200,
		message: "Thành công",
		users: list
	})
}