var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , port = 8080
  , qs = require('querystring')



var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    // Note the new case handling search

    // Note we no longer have an index.html file, but we handle the cases since that's what the browser will request
    case '/':
      sendFile(res, 'Event1.html','text/html')
      break
    case '/index.html':
      sendFile(res, 'Event1.html','text/html')
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


	function sendFile(res, filename, contentType) {
	  contentType = contentType || 'text/html'

	  fs.readFile(filename, function(error, content) {
	    res.writeHead(200, {'Content-type': contentType})
	    res.end(content, 'utf-8')
	  })

	}


