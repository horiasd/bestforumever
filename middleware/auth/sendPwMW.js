/**
*Új jelszót küldd annak a felhasználónak aki elfelejtette a jelszavát.
* */

const requireOption = require("../requireOptions");

module.exports = function(objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
            
            if(typeof req.body.email === 'undefined') {
                return next();
            }

            const generator = require('generate-password');
            const bcrypt = require('bcrypt');
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);

            const newpw = generator.generate({length: 10, numbers: true}); 
            const hash = bcrypt.hashSync(newpw, salt);

            const filter = { email: req.body.email };
            const update = { password: hash };

            UserModel.findOneAndUpdate(filter, update, (err, result) => {
                if(err) {
                    return next(err);
                }
                if(!result) {
                    res.locals.error = 'There\'s no user with this email address.';
                    return next();
                }
                //new: true
            });

            const nodemailer = require('nodemailer');
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'emailadressyouaresendingfrom',
                    pass: 'password'
                }
            });

            const mailOptions = {
                from: 'bestforumeverCompany@gmail.com',
                to: req.body.email,
                subject: 'Here is your new password',
                text: newpw
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return next(error);
                } 
                else {
                    console.log('Email sent: ' + info.response);
                    return res.redirect('/');
                }
            });

            

    };
};
