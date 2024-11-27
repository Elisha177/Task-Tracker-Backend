const express = require("express");
const {register,login, getUsers} = require('../controllers/authControllerr');
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/register',register);
router.post('/login', login)
router.get("/users",authenticate,authorize(['admin']), getUsers)

module.exports = router