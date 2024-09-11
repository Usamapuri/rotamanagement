const express = require("express");
const router = express.Router();
const teamController = require("../../controllers/teamController");

// route for adding a new team
router.route("/addteam").post(teamController.addTeam);

// route to deleting a team
router
  .route("/removeteam/:id")
  .get(teamController.findById)
  .delete(teamController.removeTeam);

//route to display all teams
router.get("/all", teamController.displayTeam);

module.exports = router;
