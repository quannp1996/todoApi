const express   = require('express');
const router    = express.Router();
const dataModels = require('./../dataModel/models');
module.exports.ItemAuth = async (req, res , next) => {
    const item = await dataModels.ItemModel.findById(req.params.id).exec();
    const user = await dataModels.UserModel.findById(req.signedCookies.userid).exec();
    if(item){
        if(item.user == req.signedCookies.userid || user.typeUser == 1){
            next();
            return
        }
        res.json({
            error: 'Bạn không có quyền truy cập'
        })
    }
    res.status(500).json({
        error: 'Không tìm thấy dữ liệu'
    })
}