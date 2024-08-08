const Job = require("../models/jobModel");
const ErrorResponse = require("../utils/errorResponse");

exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

exports.getJobs = async (req, res, next) => {
  // Pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const companyId = req.query.companyId;  // Get the companyId from query parameters

  try {
    // Build the query object
    const query = companyId ? { company: companyId } : {};
     
    // Get the total count of documents
    const count = await Job.countDocuments(query);

    // Fetch jobs with pagination and filtering by companyId (if provided)
    const jobs = await Job.find(query)
      .populate("company")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      data: jobs,
      page,
      pages: Math.ceil(count / pageSize),  // Calculate total number of pages
    });
  } catch (error) {
    console.error(`Error fetching jobs: ${error.message}`);
    next(error);
  }
};



exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate("company");
    if (!job) {
      return next(new ErrorResponse("Job not found", 404));
    }
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return next(new ErrorResponse("Job not found", 404));
    }
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return next(new ErrorResponse("Job not found", 404));
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
