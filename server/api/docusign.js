/**
 * This is a quick start example of listing the user's envelopes. 
 * Language: Node.js
 * 
 * See the Readme and Setup files for more information.
 * 
 * Copyright (c) DocuSign, Inc.
 * License: MIT Licence. See the LICENSE file.
 * 
 * This example does not include authentication. Instead, an access token
 * must be supplied from the Token Generator tool on the DevCenter or from
 * elsewhere.
 * 
 * This example also does not look up the DocuSign account id to be used.
 * Instead, the account id must be set. 
 * 
 * For a more production oriented example, see:
 *   JWT authentication: https://github.com/docusign/eg-01-node-jwt 
 *   or Authorization code grant authentication. Includes express web app:
 *      https://github.com/docusign/eg-03-node-auth-code-grant 
 * @file index.js
 * @author DocuSign
 * @see <a href="https://developers.docusign.com">DocuSign Developer Center</a>
 */

const router = require('express').Router()
module.exports = router

const docusign = require('docusign-esign')
    , process = require('process')
    , moment = require('moment')
    , basePath = 'https://demo.docusign.net/restapi'
    , envir = process.env
    ;

async function listEnvelopesController (req, res) {
  const qp =req.query;
  // Fill in these constants or use query parameters of ACCESS_TOKEN and ACCOUNT_ID
  // or environment variables.

  // Obtain an OAuth token from https://developers.hqtest.tst/oauth-token-generator
  const accessToken = envir.ACCESS_TOKEN || qp.ACCESS_TOKEN || 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCA_V03fZrWSAgAgD2BRcCa1kgCAOEpRctIjgdBsxnPldRZmIAVAAEAAAAYAAEAAAAFAAAADQAkAAAAZjBmMjdmMGUtODU3ZC00YTcxLWE0ZGEtMzJjZWNhZTNhOTc4EgABAAAACwAAAGludGVyYWN0aXZlMACA0Cw2fZrWSDcAoAkC2lqF5kCHBgkqTzNl6w.PQYrHiNWVlQo-G0WimowfKSiYcF4uaoOpB-KCpTWfqe-wlhDHs5mJzjr5Xq2bIvnvMpURk5RIy5MmnSfuW0NUBGpn221-BSxbIbUvn3O8GReVp2ZJ0pNpZ1Cu7bk8p_pzrUgHK9pefxfAZQu9PmrE2_Wc9c7lSNJO37bZgSVxecQw7KHjccTwRev2fgnH2jfnB9RrM1-a2bqYCN87qi1CmQqglhQ-bk3YcTWGIFTMcRB24dNZVT7Bcy0oaI5Ku_CVgX0jKLbJfDIGFNJoVF0gQYYgpPM4okC7toCelWBGbAcbFsOSjd52Q5eZJPS9JJIUZJb7WQOwpqYm3Ao9dnapA';

  // Obtain your accountId from demo.docusign.com -- the account id is shown in the drop down on the
  // upper right corner of the screen by your picture or the default picture. 
  const accountId = envir.ACCOUNT_ID || qp.ACCOUNT_ID || '7988829'; 

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Step 1. Prepare the request object
   */
  let options = {fromDate: moment().subtract(10, 'days').format()};
  /**
   * Step 2. Get and display the results
   *         We're using a promise version of the SDK's listStatusChanges method.
   */
  const apiClient = new docusign.ApiClient();
  apiClient.setBasePath(basePath);
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);
  // Set the DocuSign SDK components to use the apiClient object
  docusign.Configuration.default.setDefaultApiClient(apiClient);

  let envelopesApi = new docusign.EnvelopesApi()
    , envelopID = '3C4BD218-E497-4DCB-98E4-0765A67C64AD'
    , results
    ;

  try {
    // results = await envelopesApi.listStatusChanges(accountId, options)
    
    results = await envelopesApi.listRecipients(accountId, envelopID, null)

  } catch  (e) {
    let body = e.response && e.response.body;
    if (body) {
      // DocuSign API exception
      res.send (`<html lang="en"><body>
                  <h3>API problem</h3><p>Status code ${e.response.status}</p>
                  <p>Error message:</p><p><pre><code>${JSON.stringify(body, null, 4)}</code></pre></p>`);
    } else {
      // Not a DocuSign exception
      throw e;
    }
  }
  // Process results:
  if (results) {
    res.send (`${JSON.stringify(results, null, 4)}`);
  }
}

router.get('/', listEnvelopesController)
  
