const res = require('express/lib/response');
const announceModel = require('../models/announcements');
const classModel = require('../models/classes');
exports.sendannounce = (req,res,next) => {
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
exports.getannounce = (req,res,next) => {
    announceModel.find({whichclass : req.body.classid}).sort({createdAt : -1}).then(data => {
        res.send(data);
    })
}