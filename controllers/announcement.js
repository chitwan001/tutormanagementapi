const res = require('express/lib/response');
const announceModel = require('../models/announcements');
const classModel = require('../models/classes');
const path = require('path');
exports.sendannounce = (req,res,next) => {
    console.log(req.file);
    if(req.file){
        const attachurl = req.file.path;
        const announce = new announceModel({
            content : '',
            attachements : attachurl,
            bywhom : req.userId,
            whichclass : req.body.classid
        });
        announce.save().then(data => {
            classModel.findById(req.body.classid).then(gotclass => {
                if(gotclass == null){
                    const err = new Error('Class not found!');
                    err.statusCode = 404;
                    throw err;
                }
                else{
                    var oldannounces = gotclass.announcements;
                oldannounces = [...oldannounces , data._id];
                classModel.updateOne({_id : req.body.classid},{
                    announcements : oldannounces
                }).then(data => {
                    res.send({
                        response : 'ok'
                    })
                })
                }
            }).catch(err => {
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
            })
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
    }
    else{
        const announce = new announceModel({
            content : req.body.cont,
            attachements : [],
            bywhom : req.userId,
            whichclass : req.body.classid
        });
        announce.save().then(data => {
            classModel.findById(req.body.classid).then(gotclass => {
                if(gotclass == null){
                    const err = new Error('Class not found!');
                    err.statusCode = 404;
                    throw err;
                }
                else{
                    var oldannounces = gotclass.announcements;
                oldannounces = [...oldannounces , data._id];
                classModel.updateOne({_id : req.body.classid},{
                    announcements : oldannounces
                }).then(data => {
                    res.send({
                        response : 'ok'
                    })
                })
                }
            }).catch(err => {
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
            })
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
    }
}
exports.getannounce = (req,res,next) => {
    // console.log(path.join(__dirname, 'attachements'));
    announceModel.find({whichclass : req.body.classid}).sort({createdAt : -1}).then(data => {
        if(data.length == 0){
            const err = new Error('Announcement not found');
            err.statusCode = 404;
            throw err;
        }
        res.send(data);
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}