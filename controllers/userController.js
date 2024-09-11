const User = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

// Defining methods for the userController
module.exports = {
  findAll: function(req, res) {
    User.find({ teamId: req.params.id, isManager: false })
      .sort({ lastName: -1 })
      .populate("shifts")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllPending: function(req, res) {
    User.find({
      teamId: req.params.id,
      isManager: false
    })
      .sort({ lastName: -1 })
      .populate("pendingShifts")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    User.findById(req.params.id)
      .populate("shifts")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByIdPending: function(req, res) {
    User.findById(req.params.id)
      .populate("pendingShifts")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    User.updateOne({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  claim: function(req, res) {
    User.updateOne({ _id: req.params.id }, { $push: req.body })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    User.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  approveShift: function(req, res) {
    console.log(
      "In userController approveShift method with req.body.shiftId: ",
      req.body.shiftId
    );
    console.log(
      "and in userController approveShift method with req.params.id: ",
      req.params.id
    );
    User.updateOne(
      { _id: req.params.id },
      { $pull: { pendingShifts: new ObjectId(req.body.shiftId) } }
    )
      .populate("pendingShifts")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  pushShift: function(req, res) {
    console.log(
      "In userController pushShift method with req.body: ",
      req.body.shiftId
    );
    User.updateOne(
      { _id: req.params.id },
      { $push: { shifts: req.body.shiftId } }
    )
      .populate("shifts")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  declineShift: function(req, res) {
    console.log(
      "In userController declineShift method with req.body.shiftId: ",
      req.body.shiftId
    );
    console.log(
      "and in userController declineShift method with req.params.id: ",
      req.params.id
    );
    User.updateOne(
      { _id: req.params.id },
      { $pull: { pendingShifts: new ObjectId(req.body.shiftId) } }
    )
      .populate("pendingShifts")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
