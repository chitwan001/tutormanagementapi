const favs = require('../models/favs');
const announcement = require('../models/announcements');
exports.addfavs = (req,res,next) => {
    const newfav = new favs({
        whom : req.userId,
        announcement : req.body.iid
    });
    newfav.save().then(data => {
        res.send({response : 'ok'});
    })
}
exports.getfav = (req,res,next) => {
    // console.log(req.userId);
    favs.find({whom : req.userId}).then(data => {
        var annonunceid = data[0].announcement;
        console.log(data);
        announcement.findById(annonunceid).then(anndata => {
            res.send(anndata);
            // console.log('Kyaa');
        })
    })
}