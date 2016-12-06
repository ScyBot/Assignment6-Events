var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , port = 8080
  , qs = require('querystring')

// Add more movies! (For a technical challenge, use a file, or even an API!)
var movies = ['Jaws', 'Jaws 2', 'Jaws 3', 'Doctor Strange', 'The Illusionist', 'Kill Bill']

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    // Note the new case handling search
    case '/search':
      handleSearch(res, uri)
      break
    // Note we no longer have an index.html file, but we handle the cases since that's what the browser will request
    case '/':
      sendIndex(res)
      addMovies(res)
      break
    case '/index.html':
      sendIndex(res)
      break
    case '/style.css':
      sendFile(res, 'style.css', 'text/css')
      break
    case '/js/scripts.js':
      sendFile(res, 'scripts.js', 'text/javascript')
      break
    case '/README.md':
	  sendFile(res, 'README.md', 'text/markdown')
	  break
    default:
      res.end('404 not found')
  }

})

server.listen(process.env.PORT || port)
console.log('listening on 8080')

// subroutines

// You'll be modifying this function
function handleSearch(res, uri) {
	console.log("hi")
	var contentType = 'text/html'
  	res.writeHead(200, {'Content-type': contentType})
	var contentType = 'text/html'
   	, html = ''

  	html = html + '<html>'

  	html = html + '<head>'
  	// You could add a CSS and/or js call here...
  	html = html + '<link rel="stylesheet" type="text/css" href="css/style.css"/>'
  	html = html + '</head>'

  	html = html + '<body>'
  	html = html + '<h1>Movie Search! 2</h1>'

  	// Here's where we build the form YOU HAVE STUFF TO CHANGE HERE
  	html = html + '<form action="search" method="GET">'
  	html = html + '<input type="text" name="search" />'
  	html = html + '<button type="submit">Search</button>'
  	html = html + '</form>'
  	
  	if(uri.query) {
    	// PROCESS THIS QUERY TO FILTER MOVIES ARRAY BASED ON THE USER INPUT
    	console.log( uri.query )
    	var data = qs.parse(uri.query);
    	//var clean = data.search(movies);
    	if(data.search) {
    		console.log(data.search)
    		if(movies.indexOf(data.search) > -1) {
    			html = html + '<ul>';
				for (var i = 0; i < movies.length; i++) {
					//if (data.search(movies[i])) {
					if (movies[i].includes(data.search)) {
						html+= "<li>" + movies[i] + "</li>";
					}
				}
			}
		}
	    }
	    
		
	    console.log("I got here!");

		// Note: the next line is fairly complex. 
		// You don't need to understand it to complete the assignment,
		// but the `map` function and `join` functions are VERY useful for working
		// with arrays, so I encourage you to tinker with the line below
		// and read up on the functions it uses.
		//
		// For a challenge, try rewriting this function to take the filtered movies list as a parameter, to avoid changing to a page that lists only movies.
		//html = html + data.map(function(d) { return '<li>'+data+'</li>' }).join(' ')


		html = html + '</ul>'

		html = html + '</body>'
		html = html + '</html>'
	  
		res.writeHead(200, {'Content-type': contentType})
		res.end(html, 'utf-8')

	    //parse the data
	    //call it data, search through data, data.search is the user input
	    //if statement, if the user input equals 
	}

	// Note: consider this your "index.html" for this assignment
	function sendIndex(res) {
	  var contentType = 'text/html'
	  res.writeHead(200, {'Content-type': contentType})
	  var contentType = 'text/html'
	    , html = ''

	  html = html + '<html>'

	  html = html + '<head>'
	  // You could add a CSS and/or js call here...
	  html = html + '<link rel="stylesheet" type="text/css" href="style.css"/>'
	  html = html + '</head>'

	  html = html + '<body>'
	  html = html + '<h1>Movie Search!</h1>'

	  // Here's where we build the form YOU HAVE STUFF TO CHANGE HERE
	  html = html + '<form action="search" method="GET">'
	  html = html + '<input type="text" name="search" />'
	  html = html + '<button type="submit">Search</button>'
	  html = html + '</form>'

	  html = html + '<ul>'
	  // Note: the next line is fairly complex. 
	  // You don't need to understand it to complete the assignment,
	  // but the `map` function and `join` functions are VERY useful for working
	  // with arrays, so I encourage you to tinker with the line below
	  // and read up on the functions it uses.
	  //
	  // For a challenge, try rewriting this function to take the filtered movies list as a parameter, to avoid changing to a page that lists only movies.
	  html = html + movies.map(function(d) { return '<li>'+d+'</li>' }).join(' ')
	  addMovies(res);
	  html = html + '</ul>'
	  html = html + '<form action="search" method="POST">'
	  html = html + '<input type="text" name="search" />'
	  html = html + '<button type="submit">Add</button>'
	  html = html + '</form>'
	  console.log("and here I am");
	  //if (uri.query) {

	  //}

	  html = html + '</body>'
	  html = html + '</html>'
	  

	  res.writeHead(200, {'Content-type': contentType})
	  res.end(html, 'utf-8')
	}

	function sendFile(res, filename, contentType) {
	  contentType = contentType || 'text/html'

	  fs.readFile(filename, function(error, content) {
	    res.writeHead(200, {'Content-type': contentType})
	    res.end(content, 'utf-8')
	  })

	}


	//movies.push(uri) basically maybe try to push the users query onto the movies array for add movies?
	//movies.pop(uri) to take things away from the array
	function addMovies(res, uri){
	  var contentType = 'text/html'
	  res.writeHead(200, {'Content-type': contentType})
	  var contentType = 'text/html'
	    , html = ''
	  html = html + '<form action="/" method="post">'
	  html = html + '<label for="POST-name">Add?</label>'
	  html = html + '<input id="POST-name" type="text">'
	  html = html + '<input type="submit" value="Save">'
	  html = html + '</form>'
	      if (res.method == 'POST') {
		var body = '';
		request.on('data', function (data) {
		    body += data;
		    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
		    if (body.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
            }
        });
        request.on('end', function () {

            var POST = qs.parse(body);
            // use POST

        });
    }
    movies.push();
}

module.exports.submit = formSubmit

function formSubmit (submitEvent) {
  var name = document.querySelector('input').value
  request({
    uri: "http://example.com/upload",
    body: name,
    method: "POST"
  }, postResponse)
}

function postResponse (err, response, body) {
  var statusMessage = document.querySelector('.status')
  if (err) return statusMessage.value = err
  statusMessage.value = body
}

