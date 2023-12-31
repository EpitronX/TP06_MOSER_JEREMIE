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

		$utilisateur = $utilisateurRepository->findOneBy(array('login' => $login));
		if ($utilisateur && password_verify($pass, $utilisateur->getPassword())) {
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
function EmailValide(Request $request, Response $response, $args)
{
	global $entityManager;
	$err = false;
	$body = $request->getParsedBody();
	$email = $args['email'] ?? "";
	$array = [];

	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$err = true;
	}
	if (!$err) {
		$utilisateurRepository = $entityManager->getRepository('Utilisateurs');
		$emailAllowed = true;
		$utilisateur = $utilisateurRepository->findOneBy(['email' => $email]);

		if ($utilisateur !== null) {
			$emailAllowed = false;
		}
	} else {
		$status = 'Adresse e-mail invalide !';
		//$array["status"] = $status;
		$response = $response->withStatus(400);
		$emailAllowed = false;
	}
	$array["emailAllowed"] = $emailAllowed;
	$response->getBody()->write(json_encode($array));
	return addHeaders($response);
}
function LoginValide(Request $request, Response $response, $args)
{
	global $entityManager;
	$err = false;
	$body = $request->getParsedBody();
	$login = $args['login'] ?? "";
	$array = [];
	$loginAllowed = true;

	if (!filter_var($login, FILTER_SANITIZE_FULL_SPECIAL_CHARS)) {
		$err = true;
	}
	if (!$err) {
		$utilisateurRepository = $entityManager->getRepository('Utilisateurs');
		$utilisateur = $utilisateurRepository->findOneBy(['login' => $login]);
		$status = 'Le pseudo de login est autorisé !';

		if ($utilisateur !== null) {
			$loginAllowed = false;
			$status = 'Le pseudo de login est déjà utilisé !';
		}
	} else {
		$loginAllowed = false;
		$status = 'Le pseudo de login est invalide !';
		$response = $response->withStatus(400);
	}
	$array["loginAllowed"] = $loginAllowed;
	$array["status"] = $status;
	$array["login"] = $login;
	$response->getBody()->write(json_encode($array));
	return addHeaders($response);
}

function AddUser(Request $request, Response $response, $args)
{
	global $entityManager;
	$err = false;
	$body = $request->getParsedBody();
	$array = [];
	$error = null;
	$status = '';

	$nom = filter_var($body['nom'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
	$prenom = filter_var($body['prenom'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
	$adresse = filter_var($body['adresse'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
	$codepostal = filter_var($body['codepostal'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
	$ville = filter_var($body['ville'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
	$email = filter_var($body['email'], FILTER_SANITIZE_EMAIL);
	$sexe = filter_var($body['sexe'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
	$login = filter_var($body['login'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
	$password = filter_var($body['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
	$telephone = filter_var($body['telephone'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);

	if (empty($nom) || empty($prenom) || empty($adresse) || empty($codepostal) || empty($ville) || empty($email) || empty($sexe) || empty($login) || empty($password) || empty($telephone)) {
		$err = true;
	}

	if ($err) {
		$status = 'La création de l\'utilisateur a échoué !';
		$error = '1 ou plusieurs paramètres sont vides !';
		$response = $response->withStatus(400);
	} else {

		$emailValidationResponse = EmailValide($request, $response, ['email' => $email]);
		$emailAllowed = json_decode($emailValidationResponse->getBody(), true)['emailAllowed'];
		$response->getBody()->rewind();

		if (!$emailAllowed) {
			$status = 'Email not allowed. User registration rejected.';
			$error = json_decode($emailValidationResponse->getBody(), true);
			$response = $response->withStatus(400);
		} else {
			
			
			$loginValidationResponse = LoginValide($request, $response, ['login' => $login]);
			$loginAllowed = json_decode($loginValidationResponse->getBody(), true)['loginAllowed'];
			if (!$loginAllowed) {
				$status = 'Login\'s already taken ! User registration rejected.';
				$error = json_decode($loginValidationResponse->getBody(), true);
				$response = $response->withStatus(400);
			} else {
				try {
					//code...
					$user = new Utilisateurs();
					$user->setNom($nom);
					$user->setPrenom($prenom);
					$user->setAdresse($adresse);
					$user->setCodePostal($codepostal);
					$user->setVille($ville);
					$user->setEmail($email);
					$user->setSexe($sexe);
					$user->setLogin($login);
					$user->setPassword(password_hash($password, PASSWORD_DEFAULT));
					$user->setTelephone($telephone);
					$entityManager->persist($user);
					$entityManager->flush();
					$status = 'L\'utilisateur <' . $nom . '> a bien été créé !';
					$response = $response->withStatus(200);
				} catch (\Throwable $th) {
					$status = 'La création de l\'utilisateur <' . $nom . '> a échoué ! Vérifiez l\'état des paramètres entrés.';
					$array["error"] = $th;
					$response = $response->withStatus(500);
				}
			}
		}
	}

	//$response->getBody()->rewind();
	$array["status"] = $status;
	$array["error"] = $error;
	$array["nom"] = $nom;
	$array["prenom"] = $prenom;
	$array["adresse"] = $adresse;
	$array["codepostal"] = $codepostal;
	$array["ville"] = $ville;
	$array["email"] = $email;
	$array["sexe"] = $sexe;
	$array["login"] = $login;
	$array["password"] = '######## THAT\'S A SECRET ! ########';
	$array["telephone"] = $telephone;
	$response->getBody()->write(json_encode($array));
	return addHeaders($response);
}
