app.service('ds', function() {
  /************************************
  * Connect and login to deepstreamHub
  ************************************/
  //establish a connection. You can find your endpoint url in the
  //deepstreamhub dashbo
 return deepstream( 'wss://154.deepstreamhub.com?apiKey=108e2b38-d342-4f09-9b89-e2fb7465b1f8' ).login()
})
