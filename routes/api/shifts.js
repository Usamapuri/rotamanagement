const express = require("express");
const router = express.Router();
const shiftController = require("../../controllers/shiftController");
//const userController = require("../../controllers/userController")

// Matches with "/id"  get all avaliavle shifts within their team
router.route("/:id").get(shiftController.findAll);

// Matches with "/id" find one shift
router.route("/findOneShift/:id").get(shiftController.findById);

// Matches with "/manager/addshift"  create a shift
router.route("/manager/addshift").post(shiftController.create);

// Matches with "/manager/addemployee"  create a employee
// router.post("/manager/addemployee", authController.doRegister);
//router.route("/manager/addemployee").post(userController.create);

// Matches with "/manager/:id" update the capacity of on shift
router.route("/manager/shift/:id").put(shiftController.update);

// Matches with "/manager/:id" delete shift
router.route("/manager/deleteshift/:id").delete(shiftController.remove);

router.route("/manager/fillShift/:id").put(shiftController.fill);

module.exports = router;
