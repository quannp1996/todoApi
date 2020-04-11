const express       = require('express');
const router        = express.Router();
const dataModel     = require('./../dataModel/models');
const Auth          = require('./../middleware/item.middleware');
router.get('/', async (req, res) => {
    try {
        const user   = await dataModel.UserModel.findById(req.signedCookies.userid).exec();
        if(user.typeUser == 1){
            var result = await dataModel.ItemModel.find().exec();
        }else{
            var result = await dataModel.ItemModel.find({
                user: req.signedCookies.userid
            }).exec();
        }
        res.send(result);
    }catch (error) {
        res.status(500).send(error);
    }
});
router.post('/', async(req, res) => { 
    const data = {
        ...req.body,
        user: req.signedCookies.userid
    };
    try{
        const result = await dataModel.ItemModel.create(data);
        res.send(result);
    }catch{
        res.status(500).send(error);
    }
})
router.delete('/:id', Auth.ItemAuth , async (req, res) => {
    try {
        const result = await dataModel.ItemModel.findByIdAndRemove(req.params.id).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})
router.put('/:id', Auth.ItemAuth, async (req, res) => {
    const data = req.body
    console.log(data);
    
    try {
        const result = await dataModel.ItemModel.findByIdAndUpdate(req.params.id, 
            {
                $set : {
                    value  : data.value,
                    checked: data.checked
                }
            },
            {
                new : true
            },
            (error, updated) => {
                if(error){
                    res.send({
                        message: 'Cập nhật không thành công'
                    });
                }
            }
        ).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;