const express = require("express");

const CheckinCtrl = require("../controllers/checkin-ctrl");

const router = express.Router();

router.post("/checkin", CheckinCtrl.createCheckin);
router.get("/checkins",CheckinCtrl.getCheckins);
module.exports = router;
