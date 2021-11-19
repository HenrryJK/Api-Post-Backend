const express = require('express');
const router = express.Router();

const  UserCtr = require('../controllers/users.controller')
const { checkToken } = require('../auth/token_validation');
router.get('/list/',checkToken ,UserCtr.readUsers); 
router.get('/list/:id',checkToken ,UserCtr.readUserid);
router.post('/add/',checkToken, UserCtr.createUser); 
router.delete('/delete/:id',checkToken, UserCtr.deleteUser); 
router.put('/update/:id',checkToken, UserCtr.updateUser); 

module.exports = router;