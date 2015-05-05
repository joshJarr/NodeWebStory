var HttpRouter = require('edu/dat/Web/Router');
var router = new HttpRouter();
router.setPublicDir('public');
router.get('/', respond);
router.get('/{name}', respond);


function respond(app, request, response, args)
{
	var story = app.get('story');
	var templates = app.get('templates');
	var msg = "";

	if(typeof args.name === "undefined"){

		location = "start";
	}
	else{
		location = args.name;
	}

	if(story.hasLocation(location)){

		var storyLocation = story.fetchLocation(location);

		msg = templates.render(
			'template',
			 {
		 		'name': storyLocation.getName(),
		 		'description': storyLocation.getDescription(),
		 		'exits': storyLocation.getExits(),
		 		'image': storyLocation.getKey()
		 	});

		response.write(msg);
		response.end();
	}

	else{
		router.triggerErrorListener('404', request, response);
	}

	//response.write(msg);
	//response.end();
};


router.error('404', function(app, request, response, args) {

	response.write('error404');
	response.end();

});

module.exports = router;