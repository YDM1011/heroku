const mongoose = require('mongoose');
const ejs = require('ejs');
const fs = require('fs');
const User = mongoose.model('user');

const errPage = res => {
    const err = new Error('ops, this page not found');
    err.status = 404;
    res.locals.message = err.message;
    res.locals.error = '';
    res.status(err.status);
    res.render('error');
}
module.exports.userConfirm = function(req, res, page){
    User
    .findOne({email: req.body.email})
    .exec(function(err, content) {
        if(!content){
            let keyConfirm;
            User.create({
                email: req.body.email,
                login: req.body.login,
                password: req.body.password,
                veryfi: false
            }, function(err, user) {
                if(err) {
                    console.log(err);
                    errPage(res);
                    return;
                } else {
                    keyConfirm = user._id;
                    const nodemailer = require('nodemailer');
                    const transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'ydm101194@gmail.com',
                            pass: 'ADN45HrF'
                        }
                    });

                    console.log('created');
                    const contentMail ={
                        mensagem: 'Hello from Talants',
                        link: 'https://pure-beyond-93105.herokuapp.com/confirmMail/' + keyConfirm
                    }
                    transporter.sendMail({
                        from: 'ydm101194@gmail.com',
                        to: req.body.email,
                        subject: 'hello world!',
                        html: ejs.render( fs.readFileSync('appServer/views/mail/e-mail.ejs', 'utf-8') , contentMail)
                    }, (err, info) => {
                        if (err) {
                            return console.log(err);
                        }
                        console.log(`Message ${info.messageId} sent: ${info.response}`);
                    });
                    res.render(page, {email: req.body.email})
                }
            });
        }else if(content) {
            res.redirect('/login');
            return
        } else if(err) {
            console.log(err);
            res.status(500).send('Something broke!');
            return
        }
    });
}
module.exports.userCreate = function(req, res) {
        User
        .findById(req.params.id)
        .exec(function(err, content) {
            if(!content){
                res.status(500).send('Something broke!');
                return;
            }else if(content) {
                content.veryfi = true;
                content.save(function(err, content) {
                    if(err) {
                        errPage(res);
                        return;
                    } else {
                        res.status(202).send(content);
                    }
                });
            } else if(err) {
                console.log(err);
                res.status(500).send('Something broke!');
                return;
            }
        });
}