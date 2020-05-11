const Pool = require('pg').Pool;
const conn = require('./db_conn');

const getLastUpdated = (req, res, next) => {
  conn.query(`select * from lastupdated WHERE id = 1`)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
}

const storeLastUpdated = (req, res, next) => {
  const { unixTimestamp, infections, recovered, deaths, increased } = req.body;
  conn.query(`UPDATE lastupdated SET datetime = ($1), infections = ($2), recovered = ($3), deaths = ($4), increased = ($5) WHERE id = 1 returning *`, [unixTimestamp, infections, recovered, deaths, increased], (err, results) => {
    if (err) throw err;
    res.status(201).json({
      insertID: results.insertId
    });
  })
  // .then(result => res.json(result.rows[0]))
  // .catch(err => next(err));
}

module.exports = {
  getLastUpdated,
  storeLastUpdated,
}
