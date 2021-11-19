const express = require('express');
const router = express.Router();

const  RolCtr = require('../controllers/rol.controller')
const { checkToken } = require('../auth/token_validation');
router.get('/list/', RolCtr.readRoles); 
router.get('/list/:id', RolCtr.readRolid);
router.post('/add/',checkToken ,RolCtr.createRol); 
router.delete('/delete/:id',checkToken , RolCtr.deleteRol); 
router.put('/update/:id',checkToken , RolCtr.updateRol); 

module.exports = router;