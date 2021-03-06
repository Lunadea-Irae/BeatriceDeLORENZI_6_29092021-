//get - get/:id - post - put/:id - delete/:id
//post/:id/like

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const regExpValidator = require('../middleware/regex-validator');
const sauceCtrl = require('../controllers/sauces');

router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, regExpValidator, sauceCtrl.createSauce);
router.put('/:id', auth, multer, regExpValidator, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.addLikeToSauce);

module.exports = router;