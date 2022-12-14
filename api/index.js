const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const https = require('https');
const http = require('http');
// var termsData = require('./termsData.js')

app.set('port', (process.env.PORT || 8081));

app.get('/api/skills', (req, res) => {
	try{
		//console.log("About to send all the skills");
		res.send("transformedSkills");				
	}
	catch(err) {
		res.send("error");
	}			
})
	
	

app.listen(app.get('port'), function() {
  console.log('Express app vercel-express-react-demo is running on port', app.get('port'));
});

module.exports = app	