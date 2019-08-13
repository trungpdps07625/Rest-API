const errors = require('restify-errors');
const Customer = require('../models/Customers');
const rjwt = require('restify-jwt-community');
const config = require('../config');

module.exports = server => {
    // Get Customers
    server.get('/customers' , async (req , res , next) => {    
        try {  
            const customers = await Customer.find({});
            res.send(customers);
            next();
        } catch (error) {
            return next(new errors.InvalidContentError(error))
        }
    });
    // Get Single Customers
    server.get('/customers/:id' , async (req , res , next) => {    
        try {  
            const customer = await Customer.findById(req.params.id);
            res.send(customer);
            next();
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`There is no customers with the id of ${req.params.id}`))
        }
    });

    // Add Customers
    server.post('/customers', rjwt({secret: config.JWT_SECRET}), async (req, res, next) => {
        // check for Json
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("expects 'application/json'"));
        }

        const {name, email, balance} = req.body;

        const customer = new Customer({
            name,
            email,
            balance
        });

        try {
            const newCustomer = await customer.save();
            res.send(201);
            next();
        } catch (error) {
            return next(new errors.InvalidContentError(error))
        }
    })
    // Update Customers
    server.put('/customers/:id',rjwt({secret: config.JWT_SECRET}), async (req, res, next) => {
        // check for Json
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("expects 'application/json'"));
        }

        try {
            const updateCustomer = await Customer.findOneAndUpdate({ _id: req.params.id}, req.body);
            res.send(201);
            next();
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`There is no customers with the id of ${req.params.id}`))
        }
    });

    // Delete Customers
    server.del('/customers/:id',rjwt({secret: config.JWT_SECRET}), async (req, res, next) => {
        try {   
            const delete_customer = await Customer.findOneAndRemove({ _id: req.params.id})
            res.send(204);
            next();
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`There is no customers with the id of ${req.params.id}`))            
        }
    })
}