// import assert from 'assert';
// import { parse } from 'csv-parse';

const { parse } = require('csv-parse')
const fs = require('fs')

const habitablePlanets = []

function isHabitable(planet) {
    if (planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6) {
        return planet
    };
}

fs.createReadStream('kepler_data.csv')
//the fs.createReadStream has to parse the read data through a pipe. We specify that comments use "#" at the start of the line and 'true' which signifies key: value pairs rather than just values.
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitable(data)){
            habitablePlanets.push(data)
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        // console.log(habitablePlanets);
        console.log(habitablePlanets.map((planets) => {
            return planets['kepler_name']
        }));
        console.log(`The number of habitable planets found is: ${habitablePlanets.length}`);
    });

