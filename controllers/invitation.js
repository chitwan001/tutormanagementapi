const invitationModel = require('../models/invitations');
const classModel = require('../models/classes');
exports.createInvi = (req,res,next) => {

    classModel.findById(req.body.cid).then(data => {
        const newInvi = new invitationModel({
            bystudent : req.userId,
            totutor : data.teachers,
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