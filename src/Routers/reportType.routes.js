const express = require('express');
const router = express.Router()
const reportTypeController = require('../Controllers/reportType.controllers');

router.post('/createTypeReport', reportTypeController.createTypeReport),
router.get('/getAllReportType', reportTypeController.getAllReportType),

module.exports = router