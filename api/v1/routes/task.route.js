const express = require('express');
const router = express.Router();
const controller = require("../controllers/task.controller");
const validate = require("../validate/task.validate");

router.get('/', controller.index);

router.get('/detail/:id', controller.detail);
router.patch('/change-status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
router.post('/create',validate.createPost, controller.create);
router.patch('/edit/:id',validate.editPatch, controller.edit);
router.delete('/delete/:id', controller.delete);

module.exports = router;