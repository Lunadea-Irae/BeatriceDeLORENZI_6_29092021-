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
    Sauce.findOne({
        _id: req.params.id
    })
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
        .catch((error) => { res.status(400).json({ error: error }); });
};

//put/:id
exports.modifySauce = (req, res, next) => {

  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
  .catch(error => res.status(400).json({ error }));
};

//delete/:id
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };



//post/:id/like
exports.addLikeToSauce = (req, res, next) => {
    //si like = 1 => add to [usersLiked], if =0 => remove in arrays, if =-1 => add to [usersDisliked]
    //foreach [usersLiked]=> +1 to likes & foreach [usersDisliked]=> +1 to dislikes
    const sauce = Sauce.findOne({ _id: req.params.id })
    let field;
    switch (req.body.like) {
        case 1:
            field = usersLiked;
            sauce.usersLiked.push(req.body.userID)
            //add to [usersLiked]
            //updateOne ? findOneAndUpdate ?

            break;
        case -1:
            field = usersDisliked;
            sauce.usersDisliked.push(req.body.userID);
            //add to [usersDisliked]
            break;
        case 0://remove in arrays
            let index = sauce.usersLiked.indexOf(req.body.userID);
            if (index !== -1) {
                sauce.usersLiked.splice(index, 1);
                //pull ?
            } else {
                index = sauce.usersDisliked.indexOf(req.body.userID);
                sauce.usersDisliked.splice(index, 1);
                //pull ?
            }
            break;
        default: console.error(error);
    }
};