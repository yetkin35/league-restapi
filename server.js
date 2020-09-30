////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const queryString = require('query-string');
const cors = require('cors')
const app = express();

let multer = require('multer');
let upload = multer();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sportoto"
});

con.connect(function(err){
  if(err) 
  	console.log("Connection error!");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// TEAM FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET A TEAM
app.get('/teams/:id',upload.fields([]), function (req, res) {
	con.query("SELECT * FROM teams WHERE id = "+mysql.escape(req.params.id)+"",function(err, records){
		if(err) res.status(404).sendStatus(res.statusCode);
		// There is no such a team.
		if(JSON.stringify(records) == '[]'){
			console.log(req.body.id);
			res.status(404).sendStatus(res.statusCode);
		}else{
			res.status(200).send(records);
		}
	});
})

// GET TEAMS LIST
app.get('/teams',upload.fields([]), function (req, res) {
	con.query("SELECT * FROM teams",function(err, records){
		if(err) res.status(404).sendStatus(res.statusCode);
		res.status(200).send(records);
	});
})

// DELETE TEAM
app.delete('/teams/:id',upload.fields([]),function(req, res){
	con.query("SELECT * FROM teams WHERE id = "+mysql.escape(req.params.id)+"",function(err, records){
    	if(err) res.status(404).sendStatus(res.statusCode);
		if(JSON.stringify(records) == '[]'){
			res.status(404).sendStatus(res.statusCode);
		}else{
			con.query("DELETE FROM teams WHERE id = "+mysql.escape(req.params.id)+"",function(err, records){
				if(err) res.status(404).sendStatus(res.statusCode);
				res.status(200).send();
			});
	    }
    });
})

// ADD TEAM
app.post('/teams/insert',upload.fields([]),function(req, res){
	con.query("INSERT INTO teams (team_name, founded) VALUES ("+mysql.escape(req.body.team_name)+","+mysql.escape(req.body.founded)+")",function(err, records){
	    if(err) res.status(404).sendStatus(res.statusCode);
	    res.status(200).send(records);
    });
});

// UPDATE TEAM
app.put('/teams/update',upload.fields([]),function(req, res){
	con.query("SELECT * FROM teams WHERE id = "+mysql.escape(req.body.id)+"",function(err, records){
    	if(err) res.status(404).sendStatus(res.statusCode);
		// There is no such a team.
		if(JSON.stringify(records) == '[]'){
			res.status(404).sendStatus(res.statusCode);
		}else{
			var query = 'UPDATE teams SET';
			var qEnd = 'WHERE id = ?'

			var a = [req.body.team_name,req.body.win,req.body.draw,req.body.lose,req.body.points,req.body.founded,req.body.id];
			var c = [' team_name = ?',' win = ?',' draw = ?',' lose = ?',' points = ?',' founded = ?',' id = ? '];
			var b = [];
			for(x in a){
				if(a[x] != undefined){
					query += c[x];
					if(c[x] == ' id = ? '){
						query += qEnd;
					}else{
						query += ',';
					}
					b.push(a[x]);
				}
			}
			b.push(req.body.id);

			con.query(query,b,function(err, records){
			    if(err) throw err;
			    res.status(200).send();   
			});
	    }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// PLAYER FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET A PLAYER
app.get('/players/:id',upload.fields([]), function (req, res) {
	con.query("SELECT * FROM players WHERE player_id = ?",[req.params.id],function(err, records){
		if(err) res.status(404).sendStatus(res.statusCode);
		// There is no such a user.
		if(JSON.stringify(records) == '[]'){
			res.status(404).sendStatus(res.statusCode);
		}else{
			res.status(200).send(records);
		}
	});
})

// [GET] PLAYERS LIST
app.get('/players',upload.fields([]), function (req, res) {
	con.query("SELECT * FROM players",function(err, records){
		if(err) res.status(404).sendStatus(res.statusCode);
		
		res.status(200).send(records);
	});
})

// DELETE PLAYER
app.delete('/players/:id',upload.fields([]),function(req, res){
	con.query("SELECT * FROM players WHERE player_id = ?",[req.params.id],function(err, records){
    	if(err) res.status(404).sendStatus(res.statusCode);
		// There is no such a player.
		if(JSON.stringify(records) == '[]'){
			res.status(404).send(res.statusCode);
		}else{
			con.query("DELETE FROM players WHERE player_id = "+mysql.escape(req.params.id)+"",function(err, records){
				if(err) throw err;
				res.status(200).send();
			});
	    }
    });
})

// ADD PLAYER
app.post('/players/insert',upload.fields([]),function(req, res){
	con.query("INSERT INTO players (player_name, player_surname, birthday, position, rating, team) VALUES ("+mysql.escape(req.body.player_name)+","+mysql.escape(req.body.player_surname)+","+mysql.escape(req.body.birthday)+","+mysql.escape(req.body.position)+","+mysql.escape(req.body.rating)+","+mysql.escape(req.body.team)+")",function(err, records){
	    if(err) res.status(404).send(res.statusCode);
	    res.status(200).send();
	});
});

// UPDATE PLAYER
app.put('/players/update',upload.fields([]),function(req, res){
	con.query("SELECT * FROM players WHERE player_id = "+mysql.escape(req.body.player_id)+"",function(err, records){
    	if(err) res.status(404).send(res.statusCode);
		// There is no such a player.
		if(JSON.stringify(records) == '[]'){
			res.status(404).send(res.statusCode);
		}else{
			var query = 'UPDATE players SET';
			var qEnd = 'WHERE player_id = ?'

			var a = [req.body.player_name,req.body.player_surname,req.body.birthday,req.body.position,req.body.rating,req.body.team,req.body.player_id];
			var c = [' player_name = ?',' player_surname = ?',' birthday = ?',' position = ?',' rating = ?',' team = ?',' player_id = ? '];
			var b = [];
			for(x in a){
				if(a[x] != undefined){
					query += c[x];
					if(c[x] == ' player_id = ? '){
						query += qEnd;
					}else{
						query += ',';
					}
					b.push(a[x]);
				}
			}
			b.push(req.body.player_id);

			con.query(query,b,function(err, records){
			    if(err) throw err;
			    res.status(200).send();   
			});
	    }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(8081, function () {
	console.log("server is working");
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////