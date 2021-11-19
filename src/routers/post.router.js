const express = require('express');
const router = express.Router();

const  PostCtr = require('../controllers/post.controller')
const { checkToken } = require('../auth/token_validation');

router.get('/list/',checkToken, PostCtr.readPosts); 
router.get('/list/:id',checkToken ,PostCtr.readPostid);
router.post('/add/', checkToken,PostCtr.createPost); 
router.delete('/delete/:id',checkToken, PostCtr.deletePost); 
router.put('/update/:id',checkToken ,PostCtr.updatePost); 

module.exports = router;