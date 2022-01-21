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
    invitationModel.find({totutor : [req.userId]}).then(data => {
        res.send(data);
    })
}