
const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient()
  
  // Performs label detection on the image file
  client
    .textDetection('test.jpg')
    .then(results => {
      const labels = results[0].textAnnotations;
  
      console.log('Labels:');
      labels.forEach(function(label){
        var obj = JSON.stringify(label);
        var stringify = JSON.parse(obj);
        if (isNaN(+stringify['description'])){
            console.log(stringify['description'])
            console.log(stringify['boundingPoly']['vertices'][0])
        }
      }
    )
    })

    .catch(err => {
      console.error('ERROR:', err);
    });
  

    app.post('/google-analytics/med-file', function (req, res) {
        res.send('Got a PUT request at /user')
      })

    app.get('/', function (req, res) {
        res.send('Hello World!')
      })


    const PORT = 5000;

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
    });

    

    