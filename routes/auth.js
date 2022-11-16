const express = require('express');
const router = express.Router();
const registration_controller = require('../controllers/auth_accounts');

router.post("/register", registration_controller.addAccount);
router.post("/login", registration_controller.loginAccount);
router.get("/updatestudent/:email", registration_controller.updateForm);
router.post("/updateuser", registration_controller.updateUser);
router.get("/deleteuser/:email", registration_controller.deleteUser);
router.get("/logout", registration_controller.logoutAccount)

module.exports = router;