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

    ajaxer.request(args); #  handles AJAX requests, args can be an array or an object
    
    ajaxer.results; # array of request results
    
    ajaxer.findResult(url); # url is the url or uri you requested, returns
                            # response object of first matching url argument
                            # or null if not found.
    
    ajaxer.clearResults(); # resets the results array, should be called before
                           # every new call of ajaxer.request
    
    ajaxer.failCallback # optional user defined callback for failed requests
                        # ajaxer.failCallback = yourCallbackfunction;
    
    ajaxer.successCallback # optional user defined callback for successful requests
                           # ajaxer.failCallback = yourCallbackfunction;
    
## "Private" methods:

    ajaxer.addData(data); # adds response objects to the ajaxer.results array.
                          # the data argument represents a single response object.

    ajaxer.client # internal client making the AJAX requests.

## Author: https://github.com/sbe1
## License: MIT

    
