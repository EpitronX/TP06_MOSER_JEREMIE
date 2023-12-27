<?php
	use Doctrine\ORM\Tools\Setup;
	use Doctrine\ORM\EntityManager;
	date_default_timezone_set('America/Lima');
	require_once "vendor/autoload.php";
	$isDevMode = true;
	$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
	$conn = array(
	'host' => 'dpg-clvf4ida73kc73bp3kfg-a.oregon-postgres.render.com',

	'driver' => 'pdo_pgsql',
	'user' => 'web_wfd1_user',
	'password' => '0P75WwWmTDUaWyAb1KCfxrP8HfZODKKP',
	'dbname' => 'web_wfd1',	
	'port' => '5432'
	);


	$entityManager = EntityManager::create($conn, $config);



