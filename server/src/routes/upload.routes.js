const express = require('express');
const uploadRoutes = express.Router();
const uploadController = require('../controllers/upload.controller');

uploadRoutes.post('/', uploadController.uploadFile);

module.exports = uploadRoutes;
