#!/usr/bin/perl
use CGI qw(:all);
use DBI;
use DateTime;
use DateTime::Format::MySQL;

$q = CGI->new();

my $driver   = "SQLite"; 
my $database = "backgammon";
my $dsn = "DBI:$driver:dbname=$database";
my $userid = "";
my $password = "";
my $dbh = DBI->connect($dsn, $userid, $password, { RaiseError => 1 }) or die $DBI::errstr;

print $q->header('text/plain');
print "DB version: ", `sqlite3 backgammon ".version"`;
print "\n";
print "DB name:";
print "\n";
print "", `sqlite3 backgammon ".database"`;
print "\n";
print "Schema:";
print "\n";
print "", `sqlite3 backgammon ".schema"`;
print "\n";
print "Number of games played: ", `sqlite3 backgammon "select count(*) from results"`;
print "\n";
print "Last game played: ", `sqlite3 backgammon "select max(DATETIME) from results"`;
print "\n";
print "Results so far:\n", `sqlite3 backgammon "select * from results"`;
