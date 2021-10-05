const Sauce = require('../models/Sauce');
const fs = require('fs');

//get
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then((sauces) => { res.status(200).json(sauces); })
        .catch((error) => { res.status(400).json({ error: error }); });
};

//get/:id
exports.getOneSauce = (req, res, next) => {
    Sauce.findById(req.params.id)
        .then((sauce) => { res.status(200).json(sauce); })
        .catch((error) => { res.status(404).json({ error: error }); });
};
//post
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => { res.status(201).json({ message: 'Sauce enregistrée avec succés !' }); })
        .catch((error) => { res.status(400).json({ error: error.message }); });

}


//put/:id
exports.modifySauce = (req, res, next) => {
    if (req.file) {
        Sauce.findById(req.params.id)
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => { console.log("image supprimée") });
            });
    }
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    Sauce.findByIdAndUpdate(req.params.id, { ...sauceObject })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error: error.message }));
};

//delete/:id
exports.deleteSauce = (req, res, next) => {
    Sauce.findById(req.params.id)
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.findByIdAndDelete(req.params.id)
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};



//post/:id/like
exports.addLikeToSauce = (req, res, next) => {

    //si like = 1 => add to [usersLiked], if =0 => remove in arrays, if =-1 => add to [usersDisliked]
    //foreach [usersLiked]=> +1 to likes & foreach [usersDisliked]=> +1 to dislikes
    Sauce.findById(req.params.id).then(sauce => {
        switch (req.body.like) {
            case 1:
                sauce.usersLiked.push(req.body.userId);
                //add to [usersLiked]
                //updateOne ? findOneAndUpdate ?
                sauce.likes += 1;
                break;
            case -1:
                sauce.usersDisliked.push(req.body.userId);
                //add to [usersDisliked]
                sauce.dislikes += 1;
                break;
            case 0://remove in arrays
                let index = sauce.usersLiked.indexOf(req.body.userId);
                if (index !== -1) {
                    sauce.usersLiked.splice(index, 1);
                    //pull ?
                    sauce.likes += -1;
                } else {
                    index = sauce.usersDisliked.indexOf(req.body.userId);
                    sauce.usersDisliked.splice(index, 1);
                    //pull ?
                    sauce.dislikes += -1;
                }
                break;
        }

        //...sauce do not work ?
        Sauce.findByIdAndUpdate(req.params.id, { ...sauce })
            .then(() => res.status(201).json({ message: 'Votre vote a bien été enregistré !' }))
            .catch(error => res.status(400).json({ error }));
    })
        .catch(error => res.status(500).json({ error }));


};