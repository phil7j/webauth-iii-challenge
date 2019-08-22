
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'bobby1', password: 'pass', department: 'IT'},
        {id: 2, username: 'susan2', password: 'pass', department: 'Marketing'},
        {id: 3, username: 'victor3', password: 'pass', department: 'Accounting'}
      ]);
    });
};
