# dices
for backgammon

Most of this work is done by pemo

Install SQLite to make full use of backgammon machine and issue the following commands:
sqlite3
sqlite> CREATE DATABASE backgammon;
sqlite> CREATE TABLE results(id INTEGER PRIMARY KEY AUTOINCREMENT, DATETIME TEXT, player1 TEXT, player2 TEXT, scorePlayer1 INT, scorePlayer2 INT, augenPlayer1 INT, augenPlayer2 INT, paschsPlayer1 INT, paschsPlayer2 INT);
