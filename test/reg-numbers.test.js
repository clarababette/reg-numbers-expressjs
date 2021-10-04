
import assert from 'assert';
import registrationService from '../registration-services.js';
import pg from 'pg';
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

  it('should add valid registrations.',
      async () => {
        registration.insertNumber('CA349535');
        registration.insertNumber('CJ328895');
        registration.insertNumber('gregeg');
        registration.insertNumber('CP902388');
        assert.strictEqual(registration.getNumbersAndTowns().length, 2);
      });
  it('should add valid registrations regardless of formatting.',
      async () => {
        assert.deepStrictEqual();
      });
  it('should not add a valid registration more than once.',
      async () => {
        assert.deepStrictEqual();
      });
  it('should not add registrations with invalid town codes.',
      async () => {
        assert.deepStrictEqual();
      });
  it('should not add inputs that are not registrations.',
      async () => {
        assert.deepStrictEqual();
      });
  it('should not add blank registration inputs.',
      async () => {
        assert.deepStrictEqual();
      });
  it('should generate the town code based on the registration.',
      async () => {
        assert.deepStrictEqual();
      });
  it('should return a list of all registration numbers with their towns.',
      async () => {
        assert.deepStrictEqual();
      });
  it('should return a list registration numbers for selected towns.',
      async () => {
        assert.deepStrictEqual();
      });
  it('should check whether or not a registration number has been captured.',
      async () => {
        assert.deepStrictEqual();
      });
  it('should return the matching town for a reg number without capturing it.',
      async () => {
        assert.deepStrictEqual();
      });
  it('should delete all registration numbers.',
      async () => {
        assert.deepStrictEqual();
      });

  after(function() {
    pool.end();
  });
});
