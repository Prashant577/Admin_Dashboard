const path = require('path');
const paymentController = require('../controllers/paymentController');

const express = require('express');
const router = express();

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended:false }));



router.set('view engine','ejs');
router.set('views',path.join(__dirname, '../views'));



router.get('/buy', paymentController.renderBuyPage);
router.post('/payment', paymentController.payment);
router.get('/success', paymentController.success);
router.get('/failure', paymentController.failure);

module.exports = router;