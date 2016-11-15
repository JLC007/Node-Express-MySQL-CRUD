var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root'
})

// add query functions
function getAllPlayers(req, res, next) {
  connection.connect()
  connection.query('select * from player', function (err, rows, fields) {
  if (err) throw err
    console.log('The solution is: ', rows[0].solution)
  })
  connection.end()
}

function getSinglePlayer(req, res, next) {
    var playerID = parseInt(req.params.id);
    connection.connect()
    connection.query('select * from player where id = $1', playerID, function (err, rows, fields) {
    if (err) throw err
      console.log('The solution is: ', rows[0].solution)
    })
    connection.end()
}

function createPlayer(req, res, next) {
  connection.connect()
  connection.query('insert into player(name, surname, dob) values (${name}, ${surname}, ${dob})', req.query, function (err, rows, fields) {
  if (err) throw err
    console.log('The solution is: ', rows[0].solution)
  })
  connection.end()
}

function updatePlayer(req, res, next) {
  connection.connect()
  connection.query('update player set name=$1, surname=$2, dob=$3 where id=$4',
    [req.query.name, req.query.surname, req.query.dob, parseInt(req.params.id)], function (err, rows, fields) {
  if (err) throw err
    console.log('The solution is: ', rows[0].solution)
  })
  connection.end()
}

function deletePlayer(req, res, next) {
  var playerId = parseInt(req.params.id);
  connection.connect()
  connection.query('delete from player where id = $1', playerId, function (err, rows, fields) {
  if (err) throw err
    console.log('The solution is: ', rows[0].solution)
  })
  connection.end()
}

module.exports = {
  getAllPlayers: getAllPlayers,
  getSinglePlayer: getSinglePlayer,
  createPlayer: createPlayer,
  updatePlayer: updatePlayer,
  deletePlayer: deletePlayer
};