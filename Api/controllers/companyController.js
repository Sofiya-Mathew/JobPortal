const Company = require('../models/companyModel');
const ErrorResponse = require('../utils/errorResponse');

exports.createCompany = async (req, res, next) => {
    try {
        const { name, address, contactEmail } = req.body;

        if (!name || !address || !contactEmail) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const company = new Company({
            name,
            address,
            contactEmail,
        });

        await company.save();
        res.status(201).json({
            success: true,
            data: company,
        });
    } catch (error) {
        next(error);
    }
};

exports.getCompanies = async (req, res, next) => {
    //Pagination
    const pageSize=10;
    const page=Number(req.query.pageNumber) || 1;
    const count=await Company.find({}).estimatedDocumentCount()
    try {
        const companies = await Company.find().skip(pageSize*(page-1)).limit(pageSize);
        res.status(200).json({
            success: true,
            data: companies,
            page,
            pages:Math.ceil(count/pageSize)
        });
    } catch (error) {
        next(error);
    }
};

exports.getCompanyById = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id).populate('jobs');
        if (!company) {
            return next(new ErrorResponse('Company not found', 404));
        }
        res.status(200).json({
            success: true,
            data: company,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateCompany = async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!company) {
            return next(new ErrorResponse('Company not found', 404));
        }
        res.status(200).json({
            success: true,
            data: company,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCompany = async (req, res, next) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return next(new ErrorResponse('Company not found', 404));
        }
        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};
