const express   = require('express');
const router    = express.Router();
const dataModels = require('./../dataModel/models');
module.exports.UserAuth = async (req, res , next) => {
    const userId = req.signedCookies.userid;
    const user = await dataModels.UserModel.findById(userId).exec();
    if(user){next();return;}
    res.json({logged: false})
}