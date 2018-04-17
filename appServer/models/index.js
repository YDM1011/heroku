const express = require('express');
const router = express.Router();

const page = require('../controlers/db/page');
const user = require('../controlers/db/user');

router.get('/', (req,res)=>{page.pageReadOne(req,res,"index")});
router.get('/home/', (req,res)=>{page.pageReadOne(req,res,"index")});
router.get('/home/:lan/', (req,res)=>{page.pageReadOne(req,res,"index")});
router.get('/user/', (req,res)=>{page.pageReadOne(req,res,"user")});
router.get('/user/:lan', (req,res)=>{page.pageReadOne(req,res,"user")});
router.get('/login/', (req,res)=>{page.pageReadOne(req,res,"login")});
router.get('/login/:lan', (req,res)=>{page.pageReadOne(req,res,"login")});

router.get('/confirmMail/:id', (req,res)=>{user.userCreate(req,res)});

router.post('/confirm', (req,res)=>{ user.userConfirm(req,res,"confirm") });
module.exports = router