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

module.exports = router;
