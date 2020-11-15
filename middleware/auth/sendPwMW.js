/**
*Új jelszót küldd annak a felhasználónak aki elfelejtette a jelszavát.
* */

module.exports = function(objectrepository) {

    return function(req, res, next) {
            
            if(typeof req.body.email === 'undefined') {
                return next();
            }

            const nodemailer = require('nodemailer');
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'bestforumeverCompany@gmail.com',
                    pass: 'ahosszujelszavakmindignagyonjok'
                }
            });

            const mailOptions = {
                from: 'bestforumeverCompany@gmail.com',
                to: req.body.email,
                subject: 'Here is your new password',
                text: 'mi van cica van gazdád??? grrrrrr'
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