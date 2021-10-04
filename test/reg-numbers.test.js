
import assert from 'assert';
import registrationService from '../registration-services.js';
import pg from 'pg';
const Pool = pg.Pool;

const connectionString = 'postgresql://localhost:5433/registration_tests' || 'postgresql://localhost:5432/registration_tests';

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
        await registration.insertNumber('CA349535');
        await registration.insertNumber('CJ328895');
        await registration.insertNumber('gregeg');
        await registration.insertNumber('CP902388');
        const expected = [{reg_number: 'CA349535', town: 'Cape Town'},
          {reg_number: 'CJ328895', town: 'Paarl'}];
        const result = await registration.getNumbersAndTowns();
        assert.deepStrictEqual(result, expected);
      });
  it('should add valid registrations regardless of formatting.',
      async () => {
        await registration.insertNumber('C A34 95 35');
        await registration.insertNumber('cJ328-89-5');
        await registration.insertNumber('gregeg');
        await registration.insertNumber('CP902388');
        const expected = [{reg_number: 'CA349535', town: 'Cape Town'},
          {reg_number: 'CJ328895', town: 'Paarl'}];
        const result = await registration.getNumbersAndTowns();
        assert.deepStrictEqual(result, expected);
      });
  it('should not add a valid registration more than once.',
      async () => {
        await registration.insertNumber('C A34 95 35');
        await registration.insertNumber('cJ328-89-5');
        await registration.insertNumber('CA349535');
        await registration.insertNumber('CJ328895');
        const expected = [{reg_number: 'CA349535', town: 'Cape Town'},
          {reg_number: 'CJ328895', town: 'Paarl'}];
        const result = await registration.getNumbersAndTowns();
        assert.deepStrictEqual(result, expected);
      });
  it('should not add registrations with invalid town codes.',
      async () => {
        const result = await registration.insertNumber('CD234678');
        assert.strictEqual( result, '23503');
      });
  it('should not add inputs that are not registrations.',
      async () => {
        const result = await registration.insertNumber('spider');
        assert.strictEqual( result, '23514');
      });
  it('should not add blank registration inputs.',
      async () => {
        const result = await registration.insertNumber();
        assert.strictEqual( result, '23502');
      });
  it('should return a list of all registration numbers with their towns.',
      async () => {
        await registration.insertNumber('CFP389327');
        await registration.insertNumber('CBS392555');
        await registration.insertNumber('CEY190150');
        await registration.insertNumber('CL303370');
        await registration.insertNumber('CCT265279');
        await registration.insertNumber('CG694285');
        await registration.insertNumber('CER995635');
        await registration.insertNumber('CEO044975');
        await registration.insertNumber('CAG579382');
        await registration.insertNumber('CFP625000');
        const expected = [
          {
            reg_number: 'CFP389327',
            town: 'Velddrif & Laaiplek',
          },
          {
            reg_number: 'CBS392555',
            town: 'Mossel Bay & Hartenbos',
          },
          {
            reg_number: 'CEY190150',
            town: 'Strand & Gordon\'s Bay',
          },
          {
            reg_number: 'CL303370',
            town: 'Stellenbosch & Franschhoek',
          },
          {
            reg_number: 'CCT265279',
            town: 'Cape Town municipal vehicles',
          },
          {
            reg_number: 'CG694285',
            town: 'Oudtshoorn',
          },
          {
            reg_number: 'CER995635',
            town: 'Bonnievale',
          },
          {
            reg_number: 'CEO044975',
            town: 'Grabouw & Elgin',
          },
          {
            reg_number: 'CAG579382',
            town: 'George',
          },
          {
            reg_number: 'CFP625000',
            town: 'Velddrif & Laaiplek',
          },
        ];
        const result = await registration.getNumbersAndTowns();
        assert.deepStrictEqual(result, expected);
      });
  it('should return a list registration numbers for selected towns.',
      async () => {
        await registration.insertNumber('CFP389327');
        await registration.insertNumber('CBS392555');
        await registration.insertNumber('CEY190150');
        await registration.insertNumber('CL303370');
        await registration.insertNumber('CA265279');
        await registration.insertNumber('CG694285');
        await registration.insertNumber('CER995635');
        await registration.insertNumber('CEO044975');
        await registration.insertNumber('CAW579382');
        await registration.insertNumber('CFP625000');
        const expected = [{
          reg_number: 'CA265279',
        },
        {
          reg_number: 'CAW579382',
        },
        ];
        const result = await registration.filterByTowns(`'Cape Town','George'`);
        assert.deepStrictEqual(result, expected);
      });
  it('should check whether or not a registration number has been captured.',
      async () => {
        const result = await registration.hasNotBeenCaptured('CFP349623');
        assert.strictEqual(result, true);
      });
  it('should return the matching town for a reg number without capturing it.',
      async () => {
        const result = await registration.getThisTown('CCC506343');
        assert.strictEqual(result, 'Riversdale & Stilbaai');
      });
  it('should delete all registration numbers.',
      async () => {
        await registration.insertNumber('CEG087867');
        await registration.insertNumber('CEM976829');
        await registration.insertNumber('CBT860473');
        await registration.insertNumber('CW962125');
        await registration.insertNumber('CER227757');
        await registration.insertNumber('CEG831108');
        await registration.insertNumber('CAW942697');
        await registration.insertNumber('CBT834347');
        await registration.insertNumber('CFG750495');
        await registration.insertNumber('CY462015');
        await registration.deleteAll();
        assert.deepStrictEqual(await registration.getNumbersAndTowns(), []);
      });

  after(function() {
    pool.end();
  });
});
