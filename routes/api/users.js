const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

// Matches with "/manager" display all employee
router.route("/manager/all/:id").get(userController.findAll);

// Matches with "/manager" display all employee
router.route("/manager/allPending/:id").get(userController.findAllPending);

// Matches with "/employee/shifs/:id" display all employee
router.route("/employee/shifts/:id").get(userController.findById);

// Matches with "/employee/pendingshifs/:id" display all employee
router.route("/employee/pendingShifts/:id").get(userController.findByIdPending);

// Matches with "/manager/:id" update employee
router.route("/manager/employee/:id").put(userController.update);

// Matches with "/manager/:id" delete user
router.route("/manager/deleteuser/:id").delete(userController.remove);

// Matches with "/employee/claimShift/:id"
router.route("/employee/claimShift/:id").put(userController.claim);

// Matches with "/employee/approveShift/:id"
router.route("/employee/approveShift/:id").put(userController.approveShift);

// Matches with "/employee/approveShift/:id"
router.route("/employee/approveShiftPush/:id").put(userController.pushShift);

// Matches with "/employee/declineShift/:id"
router.route("/employee/declineShift/:id").put(userController.declineShift);

// Matches with "/manager/addemplpyee/"
router.route("/manager/addemployee").post(userController.create);

module.exports = router;
