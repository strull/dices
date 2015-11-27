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
$punktePlayer1 = $q -> param('punktePlayer1hidden');
$punktePlayer2 = $q -> param('punktePlayer2hidden');
$paschsPlayer1 = $q -> param('paschsPlayer1hidden');
$paschsPlayer2 = $q -> param('paschsPlayer2hidden');

my $driver   = "SQLite"; 
my $database = "backgammon";
my $dsn = "DBI:$driver:dbname=$database";
my $userid = "";
my $password = "";
my $dbh = DBI->connect($dsn, $userid, $password, { RaiseError => 1 }) or die $DBI::errstr;

my $SQL_Statement = 'INSERT INTO results (id, DATETIME, player1, player2, scorePlayer1, scorePlayer2, augenPlayer1,augenPlayer2,paschsPlayer1,paschsPlayer2) VALUES (?,?,?,?,?,?,?,?,?,?)';
my $Abfrage = $dbh->prepare($SQL_Statement);
$Abfrage->execute($null,$dt_mysql,$player1,$player2,$scorePlayer1,$scorePlayer2,$punktePlayer1,$punktePlayer2,$paschsPlayer1,$paschsPlayer2);
$Abfrage->finish();

print $q->header('text/plain');
print "Update erfolgreich!";
