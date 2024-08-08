const express = require('express');
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.post('/job/create',isAuthenticated,isAdmin,createJob);
router.get('/job',isAuthenticated,isAdmin,getJobs);
router.get('/job/:id',isAuthenticated,isAdmin,getJobById);
router.put('/job/:id',isAuthenticated,isAdmin,updateJob);
router.delete('/job/:id',isAuthenticated,isAdmin,deleteJob);

module.exports = router;
