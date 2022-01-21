const invitationModel = require('../models/invitations');
const classModel = require('../models/classes');
exports.createInvi = (req,res,next) => {
    classModel.findById(req.body.cid).then(data => {
        const newInvi = new invitationModel({
            bystudent : req.userId,
            totutor : data.teachers,
            batchname : req.body.batch,
            subject : req.body.subject,
            teacher : req.body.teacher,
            forbatch : req.body.cid,
            isaccepted : false
        });
        newInvi.save().then(data =>{
            res.send({
                response : 'ok'
            })
        })
    
    })
}
exports.getInviStu = (req,res,next) => {
    invitationModel.find({bystudent : req.userId}).then(data => {
        res.send(data);
    })
}
exports.getInviTut = (req,res,next) => {
    invitationModel.find({totutor : [req.userId] , isaccepted : false}).then(data => {
        res.send(data);
    })
}
exports.acceptinvi = (req,res,next) => {
    invitationModel.updateOne({_id : req.body.inviid},{
        isaccepted : true
    }).then(data => {
        classModel.findById(req.body.batchid).then(batchdata => {
            var avalslots = batchdata.availableslots;
            var stual = batchdata.students;
            classModel.updateOne({_id : req.body.batchid},{
                students : [...stual , req.body.stuid],
                availableslots : avalslots - 1
            }).then(data => {
                res.send({
                    response : 'ok'
                })
            })
        })
    })
}