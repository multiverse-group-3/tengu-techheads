const express = require("express");
const router = express.Router();
const { Person } = require("../models");

// GET /Person
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

module.exports = router;
