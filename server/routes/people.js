const express = require("express");
const router = express.Router();
const { Person } = require("../models");

// GET /people
router.get("/", async (req, res, next) => {
  try {
    const people = await Person.findAll();
    res.send(people);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const person = await Person.create(req.body);
    res.status(201).send(person);
  } catch (error) {
    next(error);
  }
});

// GET a person
router.get("/:id", async (req, res, next) => {
  const personId = req.params.id;
  try {
    const person = await Person.findByPk(personId);
    res.send(person);
  } catch (error) {
    next(error);
  }
})

// DELETE a person
router.delete("/:id", async (req, res, next) => {
  try {
    const person = await Person.findByPk(req.params.id);

  await person.destroy()

  res.json({})
  } catch (error) {
    next(error);
  }
})



module.exports = router;
