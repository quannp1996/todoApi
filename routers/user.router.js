const express   = require('express');
const md5       = require('md5');
const dataModel = require('./../dataModel/models');
const router    = express.Router();
router.post('/', async (req, res) => {
  const data = req.body;
  let userData = {
    ...data,
    typeUser: 0,
    password: md5(data.password)
  }
  try {
      const user   = await dataModel.UserModel.findOne({
          email   : userData.email,
          username: userData.username
      })
      if(user){
          res.send({
            status: false,
            message: 'Tài khoản đã tồn tại'
          })
          return
      }else{
        const result = await dataModel.UserModel.create(userData);
        res.send({
          ...result,
            status: true
        });
      }
  }catch (error) {
      res.status(500).send(error);
  }
});
router.post('/login', async (req, res) => {
  const data = req.body;
  const userData = {
    ...data,
    password: md5(data.password)
  }
  try{
    const user = await dataModel.UserModel.findOne({
      ...userData
    });
    if(user === null){
       res.send({
         logged: false,
         message: 'Tài khoản không tồn tại'
       }) 
       return
    }
    res.cookie('userid', user._id, {
        signed: true,
        maxAge: 10000000000000
    });
    res.send({
      username: user.username,
      logged: true
    });
  }catch (error){
    res.status(500).send(error);
  }
})
router.get('/auth_logged', async (req, res) => {
    const userId = req.signedCookies.userid;
    if(userId){
        const user = await dataModel.UserModel.findById(userId).exec();
        if(user){
            res.json({
                logged: true,
                name: user.username
            })
        }
        res.json({
            logged: false
        })
    }
    res.json({
        logged: false
    })
})
router.get('/auth_loggout',  (req, res) => {
  const userId = req.signedCookies.userid;
  (userId) && res.clearCookie('userid');
  res.json({
      complete: true
  })
})
module.exports = router;
