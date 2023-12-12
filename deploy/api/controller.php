<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

	function optionsCatalogue (Request $request, Response $response, $args) {
	    
	    // Evite que le front demande une confirmation à chaque modification
	    $response = $response->withHeader("Access-Control-Max-Age", 600);
	    
	    return addHeaders ($response);
	}

	function hello(Request $request, Response $response, $args) {
	    $array = [];
	    $array ["nom"] = $args ['name'];
	    $response->getBody()->write(json_encode ($array));
	    return $response;
	}
	
	// Define the filterJson function outside of the getSearchCatalogue function
	function filterJson($data, $filters)
	{
		$filteredData = array_filter($data, function ($item) use ($filters) {
			foreach ($filters as $key => $value) {
				if (isset($item[$key]) && $item[$key] != $value) {
					return false;
				}
			}
			return true;
		});
		return array_values($filteredData);
	}
	
	// Now you can use the filterJson function within the getSearchCatalogue function
	function getSearchCatalogue(Request $request, Response $response, $args)
	{
		$flux = '[
			{
				"id": 1,
				"name": "Potato",
				"price": 10.99
			},
			{
				"id": 2,
				"name": "Lettuce",
				"price": 10.99
			},
			{
				"id": 3,
				"name": "Tomato",
				"price": 7.99
			},
			{
				"id": 1,
				"name": "Pumpkin",
				"price": 7.99
			},
			{
				"id": 2,
				"name": "Carot",
				"price": 4.99
			},
			{
				"id": 3,
				"name": "Cole Crops",
				"price": 3.99
			}
			]';
			
			$filters = array(
				'id' => $request->getParam('id'),
				'price' => $request->getParam('price')
			);
			
			// Call the function to filter the JSON data
			$filteredResult = filterJson(json_decode($flux, true), $filters);
			
			// Set the appropriate content type for the response
			$response = $response->withHeader('Content-Type', 'application/json');
			
			// Write the filtered result to the response body
			$response->getBody()->write(json_encode($filteredResult));
			
			return addHeaders($response);
		}
		
		// API Nécessitant un Jwt valide
		function getCatalogue (Request $request, Response $response, $args) {
			$flux = '[
				{
				  "id": 1,
				  "name": "Potato",
				  "price": 10.99
				},
				{
				  "id": 2,
				  "name": "Lettuce",
				  "price": 10.99
				},
				{
				  "id": 3,
				  "name": "Tomato",
				  "price": 7.99
				},
				{
				  "id": 1,
				  "name": "Pumpkin",
				  "price": 7.99
				},
				{
				  "id": 2,
				  "name": "Carot",
				  "price": 4.99
				},
				{
				  "id": 3,
				  "name": "Cole Crops",
				  "price": 3.99
				}
			  ]';
			
			$response->getBody()->write($flux);
			
			return addHeaders ($response);
		}
		function optionsUtilisateur (Request $request, Response $response, $args) {
			
			// Evite que le front demande une confirmation à chaque modification
			$response = $response->withHeader("Access-Control-Max-Age", 600);
			
			return addHeaders ($response);
		}
		
		// API Nécessitant un Jwt valide
		function getUtilisateur (Request $request, Response $response, $args) {
			
			$payload = getJWTToken($request);
	    $login  = $payload->userid;
	    
		$flux = '{"nom":"feur","prenom":"jean"}';
	    
	    $response->getBody()->write($flux);
	    
	    return addHeaders ($response);
	}

	// APi d'authentification générant un JWT
	function postLogin (Request $request, Response $response, $args) {   
	    
		$response = createJwT ($response);
		parse_str($request->getBody()->getContents(), $requestData);
		if	($requestData['login'] == 'emma' && $requestData['password'] == 'toto')
		{
			$flux = '{"nom":"feur","prenom":"jean"}';
			$response->getBody()->write($flux );
		}
		else
		{
			$response->withStatus(401);
		}
		return addHeaders ($response);
	}

