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

my $driver   = "SQLite"; 
my $database = "backgammon.db";
my $dsn = "DBI:$driver:dbname=$database";
my $userid = "";
my $password = "";
my $dbh = DBI->connect($dsn, $userid, $password, { RaiseError => 1 }) or die $DBI::errstr;

my $SQL_Statement = 'INSERT INTO results (DATETIME, player1, player2, scorePlayer1, scorePlayer2, augenPlayer1,augenPlayer2) VALUES (?,?,?,?,?,?,?)';
my $Abfrage = $dbh->prepare($SQL_Statement);
$Abfrage->execute($dt_mysql,$player1,$player2,$scorePlayer1,$scorePlayer2,$punktePlayer1,$punktePlayer2);
$Abfrage->finish();

print $q->header('text/plain');
print "Results so far:\n", `sqlite3 backgammon.db "select * from results"`;
