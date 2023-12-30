<?php

	$app->get('/api/hello/{name}', 'hello');

	$app->get('/api/emailtest/{email}', 'EmailValide');

	$app->get('/api/logintest/{login}', 'LoginValide');

	$app->options('/api/catalogue', 'optionsCatalogue' );

	// API Nécessitant un Jwt valide
	$app->get('/api/catalogue/{productfilter}/{pricefilter}', 'getSearchCatalogue' );

	// API Nécessitant un Jwt valide
	$app->get('/api/catalogue', 'getCatalogue');

	$app->options('/api/utilisateur', 'optionsUtilisateur');

	// API Nécessitant un Jwt valide
	$app->get('/api/utilisateur', 'getUtilisateur');

	// APi d'authentification générant un JWT
	$app->post('/api/utilisateur/login', 'postLogin');

	// APi d'authentification générant un JWT
	$app->post('/api/utilisateur/create', 'AddUser');
	
	

