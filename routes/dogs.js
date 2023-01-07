/** Dog routes for express-pg-oo */

const express = require("express");

const Dog = require("../models/dog");

const router = new express.Router();


/** get all dogs: [{id, name, age}, ...] */

router.get("/", async function (req, res, next) {
  try {
    let dogs = await Dog.getAll();
    dogs.forEach(dog => dog.speak());
    return res.json(dogs);
  } catch (e) {
   return next(e) 
  }
});

/** get dog by id: {id, name, age} */

router.get("/:id", async function (req, res, next) {
  try {
    let dog = await Dog.getById(req.params.id);
    return res.json(dog); 
  } catch (e) {
    return next(e);
  }
});

/** create dog from {name, age}: return id */

router.post("/", async function (req, res, next) {
  const {name, age} = req.body;
  let id = await Dog.create(name, age);
  return res.json(id);
});

/** delete dog from {id}; returns "deleted" */

router.delete("/:id", async function (req, res, next) {
  let dog = await Dog.getById(req.params.id);
  await dog.remove();
  return res.json("deleted");
});


/** age dog: returns new age */

router.patch("/:id/age", async function (req, res, next) {
  let dog = await Dog.getById(req.params.id);
  dog.age += 1;
  await dog.save();
  return res.json(dog.age);
});


module.exports = router;