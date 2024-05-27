"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_user_controller_1 = require("../controllers/create-user-controller");
const get_users_controller_1 = require("../controllers/get-users-controller");
const router = (0, express_1.Router)();
router.get('/users', get_users_controller_1.getUsers);
router.post('/create-user', create_user_controller_1.createUser);
exports.default = router;
