/* eslint-disable max-len */
import assert from 'assert';
import greetings from '../registration-services';
import pg from 'pg';
import registrationService from '../registration-services';
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/registration_tests';

const pool = new Pool({
  connectionString,
});

const registration = registrationService(pool);

describe('The Registration Numbers app', () => {
  beforeEach(async function() {
    await pool.query('delete from registration_numbers;');
  });

  it('should add registrations to the database', async function() {
    assert.deepStrictEqual([], await registration.getNumbers());

    await registration.insertNumber('CS523570');
    await registration.insertNumber('CBR867380');
    await registration.insertNumber('CEO131129');
    await registration.insertNumber('CCT021168');
    await registration.insertNumber('CEA456351');
    await registration.insertNumber('CS049554');
    await registration.insertNumber('CCK903892');
    await registration.insertNumber('CCK539740');
    await registration.insertNumber('CFP546680');
    await registration.insertNumber('CT539566');

    assert.deepStrictEqual(['CS523570', 'CBR867380', 'CEO131129', 'CCT021168', 'CEA456351', 'CS049554', 'CCK903892', 'CCK539740', 'CFP546680', 'CT539566'], await registration.getNumbers());
  });
  it('should return a list of all captured registrations', async function() {
    assert.deepStrictEqual();
  });
  it('should return a list of all towns', async function() {
    assert.deepStrictEqual();
  });
  it('should return a list of all town codes', async function() {
    assert.deepStrictEqual();
  });
  it('should return a list of all towns with their codes', async function() {
    assert.deepStrictEqual();
  });
  it('should return a list of towns with registrations', async function() {
    assert.deepStrictEqual();
  });
  it('should delte all registrations', async function() {
    assert.deepStrictEqual();
  });


  after(function() {
    pool.end();
  });
});
