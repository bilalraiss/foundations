// Copyright 2022 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

async function main(searchQuery, facets, filters) {
  // Call Retail API to search for a products in a catalog using only search query.

  // Imports the Google Cloud client library.
  const {SearchServiceClient} = require('@google-cloud/retail');

  // Instantiates a client.
  const retailClient = new SearchServiceClient();

  const projectId = await retailClient.getProjectId();

  // Placement is used to identify the Serving Config name.
  const placement = `projects/${projectId}/locations/global/catalogs/default_catalog/placements/default_search`;

  // Raw search query.
  const query = searchQuery; //TRY DIFFERENT QUERY PHRASES   
  const facetSpecs = facets ? facets : [];
  // const filter = filters; // TRY DIFFERENT FILTER EXPRESSIONS
  const filter = '(availability: ANY("OUT_OF_STOCK") AND brands: ANY("Google"))'; // TRY DIFFERENT FILTER EXPRESSIONS

  // A unique identifier for tracking visitors.
  const visitorId = '12345';

  // Maximum number of Products to return.
  const pageSize = 10;

  const IResponseParams = {
    ISearchResult: 0,
    ISearchRequest: 1,
    ISearchResponse: 2,
  };

  const callSearch = async () => {
    // Construct request
    const request = {
      placement,
      query,
      facetSpecs,
      // filter,
      visitorId,
      pageSize,
    };

    // Run request
    const response = await retailClient.search(request, {
      autoPaginate: false,
    });
    const searchResponse = response[IResponseParams.ISearchResponse];
    if (searchResponse.totalSize === 0) {
        return [];
    } else {
      return JSON.stringify(searchResponse, null, 4);
    }
  };

  return callSearch();
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

module.exports = main;
