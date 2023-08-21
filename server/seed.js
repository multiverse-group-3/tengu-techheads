const {people, items} = require('./seedData.js');

const {sequelize} = require('./db');
const {Person} = require('./models');

const seed = async () => {

    try {
        // drop and recreate tables per model definitions
        await sequelize.sync({ force: true });
    
        // insert data
        await Promise.all(people.map(person => Person.create(person)));

        console.log("db populated!");
    } catch (error) {
        console.error(error);
    }
}

seed();
