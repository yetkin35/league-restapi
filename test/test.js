////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../server.js');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// team TESTS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET: ALL TEAMS
describe('API endpoint /teams', function() {
  this.timeout(5000);

  it('should return all teams', function() {
    return chai.request(app)
      .get('/teams')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
});

// POST: A TEAM
describe('API endpoint /teams/insert', function() {
  this.timeout(5000);

  it('should add new team', function() {
    return chai.request(app)
      .post('/teams/insert')
      .send({
        team_name: 'Ankaragucu',
        founded: '1932-01-01'
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
});

// PUT: A TEAM
describe('API endpoint /teams/update', function() {
  this.timeout(5000);

  // PUT - Update a team.
  it('should update a team', function() {
    return chai.request(app)
      .put('/teams/update')
      .send({
        id: '20',
        team_name: 'Ankaraspor',
        founded: '1953-01-01'
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
});

// DELETE AND GET: A TEAM
describe('API endpoint /teams/:id', function() {
  this.timeout(5000);
  
  // GET - Get a team.
  it('should return a team', function() {
    var id = 20;
    return chai.request(app)
      .get('/teams/'+id)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
/*
  // DELETE - Delete a team.
  it('should delete a team', function() {
    var id = 10;
    return chai.request(app)
      .delete('/teams/'+id)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });*/
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// player TESTS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET: ALL PLAYERS
describe('API endpoint /players', function() {
  this.timeout(5000);

  it('should return all players', function() {
    return chai.request(app)
      .get('/players')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
});

// POST: A PLAYER
describe('API endpoint /players/insert', function() {
  this.timeout(5000);

  it('should add new player', function() {
    return chai.request(app)
      .post('/players/insert')
      .send({
        player_name: 'Test-Player',
        player_surname: 'Test-Surname',
        birthday: '1992-01-01',
        position: 'TST',
        rating: '25'
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
});

// PUT: A PLAYER
describe('API endpoint /players/update', function() {
  this.timeout(5000);

  // PUT - Update a player.
  it('should update a player', function() {
    return chai.request(app)
      .put('/players/update')
      .send({
        player_id: '12',
        player_name: 'Player',
        player_surname: 'Surname'
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
});

// DELETE AND GET: A PLAYER
describe('API endpoint /players/:id', function() {
  this.timeout(5000);

  // GET - Get a player.
  it('should return a player', function() {
    var id = 9;
    return chai.request(app)
      .get('/players/'+id)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
/*
  // DELETE - Delete a player.
  it('should delete a player', function() {
    var id = 10;
    return chai.request(app)
      .delete('/players/'+id)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });*/
});