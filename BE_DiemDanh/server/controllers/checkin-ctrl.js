const Checkin = require("../models/checkin-model");
const User = require("../models/user-model");
createCheckin = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a checkin"
    });
  }
  await User.findOne({ _id: req.body.user_id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    user.checked_in = !user.checked_in;
    User.update({ _id: user._id }, user, () => {}).catch(err => {
      return res.status(400).json({ success: false, error: err });
    });
    const checkin = new Checkin(body);
    checkin.user_id = user._id;
    checkin.status = user.checked_in ? "Check in" : "Check out";
    checkin
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: checkin._id,
          status: checkin.status,
          message: "Checkin created"
        });
      })
      .catch(error => {
        return res.status(400).json({
          error,
          message: "Checkin not created"
        });
      });
  }).catch(err => console.log(err));
};

getCheckins = async (req, res) => {
  await Checkin.find({}, (err, checkins) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!checkins.length) {
      return res
        .status(404)
        .json({ success: false, error: `Checkin not found` });
    }
    return res.status(200).json({ success: true, data: checkins });
  }).catch(err => console.log(err));
};

module.exports = {
  createCheckin,
  getCheckins
};
