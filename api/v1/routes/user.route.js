const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller.js");
const middleware = require("../middleware/auth.middleware.js");

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/password/forgot', controller.forgotPassword);
router.post('/password/otp', controller.otp);
router.post('/password/reset', controller.reset);
router.get('/detail',middleware.requireAuth, controller.detail);
router.get("/list", middleware.requireAuth, controller.list);


module.exports = router;