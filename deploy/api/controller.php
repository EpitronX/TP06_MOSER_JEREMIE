<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

function optionsCatalogue(Request $request, Response $response, $args)
{

	// Evite que le front demande une confirmation à chaque modification
	$response = $response->withHeader("Access-Control-Max-Age", 90);

	return addHeaders($response);
}

function hello(Request $request, Response $response, $args)
{
	$array = [];
	$array["nom"] = $args['name'];
	$response->getBody()->write(json_encode($array));
	return $response;
}


// Now you can use the filterJson function within the getSearchCatalogue function
function getSearchCatalogue(Request $request, Response $response, $args)
{
	$productfilter = $args['productfilter'];
	$pricefilter = $args['pricefilter'];
	global $entityManager;
	$productRepository = $entityManager->getRepository('Products');

	$products = $productRepository->findAll();

	$productsArray = array();
	foreach ($products as $product) {
		$productData = array(
			'id' => $product->getId(),
			'name' => $product->getName(),
			'price' => $product->getPrice()
		);
		$productsArray[] = $productData;
	}
	
	$flux = json_encode($productsArray);
	$data = json_decode($flux, true);

	if ($productfilter || $pricefilter) {

		//$res = array_filter($data, function ($obj) use ($productfilter, $pricefilter) {
		$res = array_filter($data, function ($obj) use ($productfilter, $pricefilter) {
			$nameMatch = true;
			$priceMatch = true;

			if ($productfilter) {
				$nameMatch = strpos($obj["name"], $productfilter) !== false;
			}

			if ($pricefilter) {
				$priceMatch = $pricefilter == 0 || $obj["price"] <= $pricefilter;
			}

			return $nameMatch && $priceMatch;
		});
		$response->getBody()->write(json_encode(array_values($res)));
	} else {
		$response->getBody()->write($flux);
	}

	return addHeaders($response);
}

// API Nécessitant un Jwt valide
function getCatalogue(Request $request, Response $response, $args)
{
	global $entityManager;
	$productRepository = $entityManager->getRepository('Products');

	$products = $productRepository->findAll();

	$productsArray = array();
	foreach ($products as $product) {
		$productData = array(
			'id' => $product->getId(),
			'name' => $product->getName(),
			'price' => $product->getPrice()
		);
		$productsArray[] = $productData;
	}
	
	$flux = json_encode($productsArray);
	$data = json_decode($flux, true);

	$response->getBody()->write(json_encode($data));

	return addHeaders($response);
}
function optionsUtilisateur(Request $request, Response $response, $args)
{

	// Evite que le front demande une confirmation à chaque modification
	$response = $response->withHeader("Access-Control-Max-Age", 600);

	return addHeaders($response);
}

// API Nécessitant un Jwt valide
function getUtilisateur(Request $request, Response $response, $args)
{
	global $entityManager;

	$payload = getJWTToken($request);
	$login  = $payload->userid;

	$utilisateurRepository = $entityManager->getRepository('Utilisateurs');
	$utilisateur = $utilisateurRepository->findOneBy(array('login' => $login));
	if ($utilisateur) {
		$data = array('nom' => $utilisateur->getNom(), 'prenom' => $utilisateur->getPrenom());
		$response = addHeaders($response);
		$response = createJwT($response);
		$response->getBody()->write(json_encode($data));
	} else {
		$response = $response->withStatus(404);
	}

	return addHeaders($response);
}

// APi d'authentification générant un JWT
function postLogin(Request $request, Response $response, $args)
{
	global $entityManager;
	$err = false;
	$body = $request->getParsedBody();
	$login = $body['login'] ?? "";
	$pass = $body['password'] ?? "";
	
	if (!preg_match("/[a-zA-Z0-9]{1,20}/", $login)) {
		$err = true;
	}
	if (!preg_match("/[a-zA-Z0-9]{1,20}/", $pass)) {
		$err = true;
	}
	if (!$err) {
		$utilisateurRepository = $entityManager->getRepository('Utilisateurs');
		
		$utilisateur = $utilisateurRepository->findOneBy(array('login' => $login, 'password' => $pass));
		if ($utilisateur and $login == $utilisateur->getLogin() and $pass == $utilisateur->getPassword()) {
			$response = addHeaders($response);
			$response = createJwT($response);
			$data = array('nom' => $utilisateur->getNom(), 'prenom' => $utilisateur->getPrenom());
			$response->getBody()->write(json_encode($data));
		} else {
			$response = $response->withStatus(403);
		}
	} else {
		$response = $response->withStatus(500);
	}
	return addHeaders($response);
}

// $response = createJwT($response);
	// if ($login == 'emma' && $pass == 'toto') {
	// 	$flux = '{"nom":"feur","prenom":"jean"}';
	// 	$response->getBody()->write($flux);
	// } else {
	// 	$response->withStatus(401);
	// }
