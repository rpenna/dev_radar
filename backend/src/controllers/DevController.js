/*
Controller's functions usual names:
- Store: save data on database
- Index: list data from database
- show: find one element from database
- update: change one element from database
- destroy: delete one element from database
*/

const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../util/parseStringAsArray');
module.exports = {
    async destroy (request, response) {
        const github_username = request.query.github_username;
        const result = await Dev.deleteOne({ github_username });
        return response.json(result);
    },

    async show (request, response) {
        const github_username = request.query.github_username;

        const result = await Dev.findOne({ github_username });
        return response.json(result);
    },

    async index (request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async update (request, response) {
        const { name, bio, techs, latitude, longitude } = request.body;
        const github_username = request.query.github_username;
        let update = {};

        if (name) {
            update.name = name;
        }

        if (bio) {
            update.bio = bio;
        }

        if (latitude && longitude) {
            update.location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        }

        if(techs ) {
            update.techs = parseStringAsArray(techs);
        }

        const dev = await Dev.updateOne({ github_username }, {
            $set: update
        });

        return response.json(dev);
    },

    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const techsArray = parseStringAsArray(techs);

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            let { name = login, avatar_url, bio } = apiResponse.data; 
            //if no name registered, app is going to consider the github username as name of the dev
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: techsArray,
                location     
            });
        }
        return response.json(dev);
    }
}