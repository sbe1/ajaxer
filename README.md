# Ajaxer - simple AJAX client for jQuery.

## Version 1.0

## Description:
Ajaxer is a simple client that supports multiple asynchronous AJAX requests. Requires jQuery 3x or greater.

## Usage:

### Data format for single requests:

    {
	"url": "/url/or/uri/to/request",
	"method": "GET",
	"dataType": "json",
	"params": {
            "query": "string",
            "or": "form",
            "params": "or",
            "just": null,
            "for": "none"
	},
	"headers": [{
            "Accept": "application/json"
	}]
    }

### Multiple requests:

    [...array of single requests....]

### Data format for responses (single request example):

    [{
	"url": "/url/or/uri/you/requested",
	"headers": ["content-type: text/html", "Access-Control-Allow-Origin: *"],
	"code": 200,
	"response": "{\"response\":\"body\"}"
    }]

## Methods and properties:

    ajaxer.request(args); #  args can be an array or an object
    
    ajaxer.results # array or request results
    
    ajaxer.findResult(url); # url is the url or uri you requested, returns response object matching url argument or null if not found.
    
    ajaxer.clearResults(); # resets the results array, should be called for every new call of ajaxer.request

## "Private" methods:

    ajaxer.addData(data); # adds response objects to the ajaxer.results array.

    ajaxer.client # internal client making the AJAX requests.

## Author: https://github.com/sbe1
## License: MIT

    
