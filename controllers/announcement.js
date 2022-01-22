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
                var oldannounces = gotclass.announcements;
                oldannounces = [...oldannounces , data._id];
                classModel.updateOne({_id : req.body.classid},{
                    announcements : oldannounces
                }).then(data => {
                    res.send({
                        response : 'ok'
                    })
                })
            })
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
                var oldannounces = gotclass.announcements;
                oldannounces = [...oldannounces , data._id];
                classModel.updateOne({_id : req.body.classid},{
                    announcements : oldannounces
                }).then(data => {
                    res.send({
                        response : 'ok'
                    })
                })
            })
        })
    }
}
exports.getannounce = (req,res,next) => {
    // console.log(path.join(__dirname, 'attachements'));
    announceModel.find({whichclass : req.body.classid}).sort({createdAt : -1}).then(data => {
        res.send(data);
    })
}