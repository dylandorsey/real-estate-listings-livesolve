// Requires
const express = require('express');
const pg = require('pg');

const router = express.Router();

// create a pool
const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'real-estate',
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('PG is connect');
});

pool.on('error', (error) => {
    console.log('There was an error', error);
});


// Set up routes
// POST route to /
router.post('/', (req, res) => {
    const listing = req.body; // object send form the client with the listing data
    const queryText = `INSERT INTO "livesolve_listings" ("cost", "sqft", "type", "city", "image_path")
                        VALUES ($1,$2,$3,$4,$5);`;
    pool.query(queryText, [listing.cost, listing.sqft, listing.type, listing.city, listing.image_path])
    .then((result) =>{
        res.sendStatus(201);
    }).catch ((error) => {
        console.log('Error making query', error);
        res.sendStatus(500);
    });
})


// Route that returns all properties (rent and sale)
router.get('/all', (req, res) => {
    console.log('GET /all route');
    let queryText = `SELECT * FROM "livesolve_listings"
    ORDER BY "id" DESC;`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error making query', error);
        res.sendStatus(500);
    })
});

// Route that deletes a row
// localhost:5002/listing/5 <- delete item with the id 5
// This is written as a route parameter
// the colon allows us to create a variable and assign that variable as a key to the object req.params

router.delete('/:id', (req, res) => {
    const listing_id = req.params.id;
    let queryText = `DELETE FROM "livesolve_listings"
    WHERE "id" = $1`;
    pool.query(queryText, [listing_id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log ('Error making query', error);
        res.sendStatus(500);
    })
});


module.exports = router; 