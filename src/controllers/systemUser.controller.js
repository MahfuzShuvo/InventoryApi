const SystemUser = require('../models/systemUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

/**
 * POST /systemUser/signup
 * Purpose: Register a system user
 */
signUp = async (req, res) => {
    try {
        // const hashPass = await bcrypt.hash(req.body.password, 12);
        const systemUser = new SystemUser(_.pick(req.body, 
            ['firstName', 'lastName', 'userName', 'phone', 'userType', 'password']
        ));
        systemUser.password = await bcrypt.hash(systemUser.password, 12);

        await systemUser.save();
        res.status(200).json({
            status: true,
            responseObj: _.pick(systemUser, 
                ['_id', 'firstName', 'lastName', 'userName', 'phone', 'userType']
            ),
            message: 'Register successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            error: "Sign up failed!"
        });
    }
    
};

/**
 * POST /systemUser/login
 * Purpose: Login in the system
 */
login = async (req, res) => {
    try {
        const systemUser  = await SystemUser.find({ userName: req.body.userName});
        
        if (systemUser && systemUser.length > 0) {
            const isValidPass = await bcrypt.compare(req.body.password, systemUser[0].password);
            if (isValidPass) {
                // generate JWT token
                const token = jwt.sign({
                    userName: systemUser[0].userName,
                    userId: systemUser[0]._id
                }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                res.status(200).json({
                    access_token: token,
                    message: "Login successfully"
                });
            } else {
                res.status(401).json({
                    status: false,
                    error: "Authentication failed!"
                });
            }
        } else {
            res.status(401).json({
                status: false,
                error: "Authentication failed!"
            });
        }
    } catch (err) {
        res.status(401).json({
            status: false,
            error: err
        });
    }

}

/**
 * PUT /systemUser/edit
 * Purpose: Edit logged in system user
 */
editSystemUser = async (req, res) => {
    try {
        const systemUser = await SystemUser.findByIdAndUpdate({ ...req.body, _id: req.userId}, _.pick(req.body, 
            ['firstName', 'lastName', 'phone', 'password']
        ), {
            new: true,
            useFindAndModify: false
        });
        systemUser.password = await bcrypt.hash(systemUser.password, 12);
        await systemUser.save();
        res.status(200).json({
            status: true,
            responseObj: _.pick(systemUser, 
                ['_id', 'firstName', 'lastName', 'userName', 'phone', 'userType']
            ),
            message: 'System user updated successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        });
    }
}



module.exports = {
    signUp, login, editSystemUser
}