 var Web = require('edu/dat/Web'),
	Story = require('edu/dat/Story');

var story = new Story.Story();
story.buildFromJsonFile(__dirname + "/adventure.json");

var templates = new Web.Templates();

templates.add('template', __dirname + "/templates/template.html");
 
var app = new Web.Application();

app.setPort(8081);

app.set('templates', templates);
app.set('story', story);

app.setRouter(require(__dirname + '/controllers.js'));

app.run();
