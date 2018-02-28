# PHP-SQlite3-Structure-Sync

PHP-SQlite3-Structure-Sync is a tool allowing to manage the structure of an SQlite database with definition files.

## Usage

	$tableDefs = array(
		array(
			'name' =>'table_one',
			'fields' => array(
				array( 
					'name' => 'id', 
					'type' => 'integer', 
					'primary' => true, 
				),
				array( 
					'name' => 'name', 
					'type' => 'varchar',
					'length' => 40, 
				),
			),
		),
	);

	$dbHandler = new SQLite3('database.sqlite');

	$sqliteSync = new Sqlite3StructureSync(array(
		'tableDefs' => $tableDefs,
		'dbHandler' => $dbHandler,
	));
	$sqliteSync->updateStructure();


## Methods

### setParams

Set parameters (see parameters section).

	$sqliteSync->setParams(array(
		'tableDefs' => $tableDefs,
		'dbHandler' => $dbHandler,
	));

Or :

	$sqliteSync->setParams(array(
		'tableDefs' => $tableDefs,
		'filename' => $filename,
	));

### setDbHandler

Set the Database handler.

	$sqliteSync->setDbHandler(new SQLite3('database.sqlite'));

### setFilename

Set the name of the database file to use. The database handler is then created internally. If the file does not exist, it is created by the function `updateStructure`. Other functions do not create the file.

	$sqliteSync->setFilename('database.sqlite');

### compare

Compares the structure of the database with table definitions.

### generateSqlStatements

Returns the list of SQL queries to send to update the structure.

### updateStructure

Updates the structure of the database.

Automatically compares the definition and the database then generates the SQL statements.

## Parameters

Parameters can be set in an array by the constructor or the funtion `setParams`. They can also be set individually.

### tableDefs : Table Definitions

Array of table definitions. Structure :

	array 
		array 
			'name' => String Table Name
			'fields' => array
				array =>
					'name' => (required) String : field name
					'type' => (required) String : type (integer, varchar, tinyint)
					'primary' => (optional) Boolean : true if primary key, default false
					'null' => Boolean : default true
					'length' => Integer

### dbHandler

Object of type SQLite3.

Resource that handles the SQLite3 calls to the database, such as queries.

### filename

String.

It is possible to specify the database file name instead of the database handler. In this case, a private database handler is set up internally.

### deleteTables : Delete tables

Boolean, if true tables in database but not in table definitions will be dropped.

False by default.

## Requirements

### Dependencies

* PHP module SQLite3 must be enabled

### PHP versions

Only PHP 5 is supported for now (>= 5.3).