#!/usr/bin/perl
use CGI qw(:all);
use DBI;
use DateTime;
use DateTime::Format::MySQL;

my $dt = DateTime->now;
my $dt_mysql = DateTime::Format::MySQL->parse_datetime($dt);
my($q,$player1,$player2);
$q = CGI->new();
$player1 = $q -> param('player1');
$player2 = $q -> param('player2');
$scorePlayer1 = $q -> param('scorePlayer1hidden');
$scorePlayer2 = $q -> param('scorePlayer2hidden');
$wurfHistorie = $q -> param('wurfHistoriehidden');

my $driver   = "SQLite"; 
my $database = "backgammon.db";

`sqlite3 $database "CREATE TABLE results(id INTEGER PRIMARY KEY AUTOINCREMENT, DATETIME TEXT, player1 TEXT, player2 TEXT, scorePlayer1 INT, scorePlayer2 INT, wurfHistorie BLOB);"` unless -e $database;
my $dsn = "DBI:$driver:dbname=$database";
my $userid = "";
my $password = "";
my $dbh = DBI->connect($dsn, $userid, $password, { RaiseError => 1 }) or die $DBI::errstr;

my $SQL_Statement = 'INSERT INTO results (id, DATETIME, player1, player2, scorePlayer1, scorePlayer2, wurfHistorie) VALUES (?,?,?,?,?,?,?)';
my $Abfrage = $dbh->prepare($SQL_Statement);
$Abfrage->execute($null,$dt_mysql,$player1,$player2,$scorePlayer1,$scorePlayer2,$wurfHistorie);
$Abfrage->finish();

print $q->header('text/plain');
print "Update erfolgreich!";
