const invitationModel = require('../models/invitations');
const classModel = require('../models/classes');
const studentModel = require('../models/student');

exports.createInvi = (req,res,next) => {
    classModel.findById(req.body.cid).then(data => {
        studentModel.findById(req.userId).then(studata => {
            console.log(studata);
            const newInvi = new invitationModel({
                bystudent : req.userId,
                totutor : data.teachers,
                batchname : req.body.batch,
                subject : req.body.subject,
                teacher : req.body.teacher,
                forbatch : req.body.cid,
                stuname : studata.name,
                isaccepted : false
            });
            newInvi.save().then(data =>{
                res.send({
                    response : 'ok'
                })
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
        studentModel.findById(req.body.stuid).then(studentdata => {
            classModel.findById(req.body.batchid).then(batchdata => {
                var avalslots = batchdata.availableslots;
                var stual = batchdata.students;
                stual = [...stual , [req.body.stuid]];
                console.log(avalslots);
                avalslots--;
                classModel.updateOne({_id : req.body.batchid},{
                    students : stual,
                    availableslots : avalslots
                }).then(data => {
                    res.send({
                        response : 'ok'
                    })
                })
            })
        })
        
    })
}
exports.delete = (req,res,next) => {
    invitationModel.remove({_id : req.body.inviid}).then(data => {
        res.send({response : 'ok'});
    })
}