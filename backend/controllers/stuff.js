// in controllers/stuff.js

const Thing = require('../models/Thing');
//********fs ---> file system ----> système de fichiers */
//****Il nous donne accès aux fonctions qui nous permettent de
// modifier le système de fichiers, y compris aux fonctions permettant de supprimer les fichiers. */
const fs = require ('fs');

//**********CREER NOUVEL OBJ ****************************************/
exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    
  });
  thing.save()
  .then(() => {res.status(201).json({message: 'Post saved successfully!'});})
  .catch((error) => {res.status(400).json({error: error});});
};


//************************MODIFIER OBJET *****************************/
exports.modifyThing =  (req, res, next) => {
  const thingObject = req.file ?
  { 
    ...JSON.parse(req.body.thing),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
    Thing.updateOne({_id: req.params.id}, { ...thingObject, _id: req.params.id })
    .then(() => {res.status(201).json({message: 'Objet modifié!'});})
    .catch((error) => {res.status(400).json({error: error});});
  }

//*******************SUPPRIMER OBJ ****************************************/
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
//*****************Récupérer 1 seul obj ***********************************/
  exports.getOneThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
    .then((thing) => {res.status(200).json(thing);})
    .catch((error) => {res.status(404).json({error: error});
  });
  }
 
  //*************Récupérer TOUS LES OBJ ***********************************/
  exports.getAllThings = (req, res, next) => {
   Thing.find()
  .then((things) => {res.status(200).json(things);})
  .catch((error) => { res.status(400).json({ error: error});});
}