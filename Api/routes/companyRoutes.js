const express = require('express');
const { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany } = require('../controllers/companyController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.post('/companies/create', isAuthenticated, isAdmin,createCompany);
router.get('/companies', isAuthenticated,isAdmin, getCompanies);
router.get('/companies/:id', isAuthenticated,isAdmin,getCompanyById);
router.put('/companies/:id', isAuthenticated, isAdmin,updateCompany);
router.delete('/companies/:id', isAuthenticated,isAdmin,deleteCompany);

module.exports = router;
