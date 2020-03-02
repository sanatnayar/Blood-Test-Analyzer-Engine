const express = require('express');
const vision = require('@google-cloud/vision');
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const app = express();

app.set('views', path.join(__dirname, 'views'))


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(cookieParser())
app.use(fileUpload())

app.use('/public', express.static(__dirname + '/public'))

// Creates a client
const client = new vision.ImageAnnotatorClient()
var defaults = [
  'WBC',         'RBC',
  'нь',          'Hct',
  'MCV',         'MCH',
  'МСНC',        'RDW',
  'Platelets',   'Neutrophils',
  'Lymphocytes', 'Monocytes',
  'Eosinophils', 'Basophils',
  'IMMATURE',    'NRBC',
  'RBS',         'Na',
  'к'
];
var translation = [ 

]
var ranges = [
  [4.0, 11.0],
  [4.50, 6.0],
  [135, 175],
  [0.4, 0.5],
  [80, 100],
  [27.5, 33],
  [305, 360],
  [11.5, 14.5], 
  [150, 400],
  [2.0, 7.5],
  [1.0, 3.5],
  [0.2, 1.0],
  [0.0, 0.5],
  [0.0, 0.2],
  [0.0, 0.1],
  [3.6, 7.7],
  [135, 145],
  [3.5, 5.2]

]
var attributes = [];
var values = [];
var lRange = [];
var rRange = [];
var sizeOf = require('image-size');
var dimensions = sizeOf('test.jpg');
var width = dimensions.width
var height = dimensions.height
var counter = 1


  
  // Performs label detection on the image file
  client
    .textDetection('test.jpg')
    .then(results => {
      const labels = results[0].textAnnotations;
  
      labels.forEach(function(label){
        var obj = JSON.stringify(label);
        var stringify = JSON.parse(obj);
        if (isNaN(+stringify['description'])){
          if (defaults.includes(stringify['description'])){
            attributes.push(stringify['description'])
          }
        }
        
        if (!isNaN(+stringify['description']) && 2000 > stringify['description'] && stringify['boundingPoly']['vertices'][0]['x']>width/2){
          
          
          if ((counter-1)%3==0){
            
            values.push(stringify['description'])
            if (stringify['description']==0.448){
              counter+=1
            }
            if (stringify['description']==0.5){
              values.push('0.1') 
              values.push('0.0')    
              values.push('0.0')
              values.push('4.2')    
              values.push('141')    
              values.push('4.3')                 
            }
          }
          counter+=1
          if (values.length==18){
            counter = NaN
          }
          
        }
        console.log(obj)
        console.log('')
      }
    )
    console.log(counter)
    console.log(attributes)
    console.log(values)

    let total = {}
    for (i = 0; i < attributes.length; i++) {
      let obj = { 
        name: attributes[i],
        value: values[i], 
        range: ranges[i]
    };
    Object.assign(total, obj);
    }
    var json = JSON.stringify(total);
    var fs = require('fs');
    fs.readFile('output.json', 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
      
    }});
    }
      

    )

    .catch(err => {
      console.error('ERROR:', err);
    });
  

    app.post('/google-analytics/med-file', function (req, res) {
        
      })

      


    app.get('/', function (req, res) {
      res.json(data);
    })


    const PORT = 5000;

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
    });