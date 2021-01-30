const express = require('express');

const Drone = require('../models/Drone.model');

const router = express.Router();

router.get('/drones', (req, res, next) => {

  Drone.find()
  .then(allDronesFromDB=>{

    res.render('drones/list.hbs',{drones: allDronesFromDB})

  }).catch(err =>console.error(err))

  
});

router.get('/drones/create', (req, res, next) => {

    res.render('drones/create-form.hbs')

});

router.post('/drones/create', (req, res, next) => {

  const {name, propellers, maxSpeed}  = req.body;

  Drone.create({name,propellers,maxSpeed})
  .then(droneFromDB=>{

    console.log(`Created drone ${droneFromDB.name}`)

    res.redirect('/drones')

  }).catch(error=> console.error('Could not create drone, error: ',error))

});

router.get('/drones/:id/edit', (req, res, next) => {
  const {id} = req.params;

  Drone.findById(id)
  .then(drone=>{

    res.render('drones/update-form.hbs', drone)

  }).catch(error=> console.error('Could not edit drone, error: ',error))

});

router.post('/drones/:id/edit', (req, res, next) => {

  const {id} = req.params;
  const {name, propellers, maxSpeed} = req.body;

  Drone.findByIdAndUpdate(id,{name,propellers, maxSpeed}, {new:true})
  .then(updatedDrone => {

    res.redirect(`/drones`);

  }).catch(err => {console.log(`Error ocurred while editing drone: ${err}`)})


});

router.get('/drones/:id/delete', (req, res, next) => {

  const {id} = req.params;

  Drone.findByIdAndDelete(id)
  .then(()=>{

    res.redirect('/drones')
  
  }).catch(err => {console.log(err)});



});

module.exports = router;
