// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **



'use strict';

function main(name) {
  // [START retail_v2beta_generated_ProductService_GetProduct_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. Full resource name of
   *  Product google.cloud.retail.v2beta.Product, such as
   *  `projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`.
   *  If the caller does not have permission to access the
   *  Product google.cloud.retail.v2beta.Product, regardless of whether or not
   *  it exists, a PERMISSION_DENIED error is returned.
   *  If the requested Product google.cloud.retail.v2beta.Product  does not
   *  exist, a NOT_FOUND error is returned.
   */
  // const name = 'abc123'

  // Imports the Retail library
  const {ProductServiceClient} = require('@google-cloud/retail').v2beta;

  // Instantiates a client
  const retailClient = new ProductServiceClient();

  async function callGetProduct() {
    // Construct request
    const request = {
      name,
    };

    // Run request
    const response = await retailClient.getProduct(request);
    console.log(response);
  }

  callGetProduct();
  // [END retail_v2beta_generated_ProductService_GetProduct_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
