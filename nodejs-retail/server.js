const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.options('*', cors());

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const searchService = require('./samples/interactive-tutorials/search/search-simple-query');

app.get('/search', (req, res) => {
    const { text, facets } = req.query
    const facetArray= facets && facets.split(',') || []; 
    const facetObj = facetArray.map((facet) => ({ facetKey: { key: facet }}));
    searchService(text, facetObj)
        .then(result => {
            return res.send(result);
        })
        .catch(err => res.send(err))
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);