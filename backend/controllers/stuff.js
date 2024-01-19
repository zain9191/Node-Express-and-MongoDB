const Thing = require ("../models/Thing")


exports.cretThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };


  exports.modifyThing = (req,res,next)=>{
    Thing.findOne({_id: req.params._id})
    .then(thing => res.status(201).json(thing))
    .catch(error => res.status(404).json({error}))
    
  };

  exports.deletThing =  (req,res,next)=>(
    Thing.deleteOne({_id: req.params._id})
    .then(()=>res.status(200).json({message:"lóbject est bein supprimé"})) 
    .catch(error=> res.status(400).json({error}))
  );

  exports.getOneThing = (req,res,next)=>{
    Thing.updateOne({_id: req.params._id}, {...req.body,_id:req.params._id})
    .then(thing => res.status(201).json(thing))
    .catch(error => res.status(400).json({error}))
  };

  exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error}));
} 