/* eslint-disable max-len */
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
    assert.deepStrictEqual([], await registration.getNumbers());

    await registration.insertNumber('CS523570');
    await registration.insertNumber('CBR867380');
    await registration.insertNumber('CEO131129');
    assert.deepStrictEqual(['CS523570', 'CBR867380', 'CEO131129'], await registration.getNumbers());
    await registration.insertNumber('CCT021168');
    await registration.insertNumber('CEA456351');
    await registration.insertNumber('CS049554');
    assert.deepStrictEqual(['CS523570', 'CBR867380', 'CEO131129', 'CCT021168', 'CEA456351', 'CS049554'], await registration.getNumbers());
    await registration.insertNumber('CCK903892');
    assert.deepStrictEqual(['CS523570', 'CBR867380', 'CEO131129', 'CCT021168', 'CEA456351', 'CS049554', 'CCK903892'], await registration.getNumbers());
    await registration.insertNumber('CCK539740');
    assert.deepStrictEqual(['CS523570', 'CBR867380', 'CEO131129', 'CCT021168', 'CEA456351', 'CS049554', 'CCK903892', 'CCK539740'], await registration.getNumbers());
    await registration.insertNumber('CFP546680');
    assert.deepStrictEqual(['CS523570', 'CBR867380', 'CEO131129', 'CCT021168', 'CEA456351', 'CS049554', 'CCK903892', 'CCK539740', 'CFP546680'], await registration.getNumbers());
    await registration.insertNumber('CT539566');

    assert.deepStrictEqual(['CS523570', 'CBR867380', 'CEO131129', 'CCT021168', 'CEA456351', 'CS049554', 'CCK903892', 'CCK539740', 'CFP546680', 'CT539566'], await registration.getNumbers());
  });
  it('should return a list of all towns', async function() {
    const towns = ['Cape Town', 'Kuils River, Brackenfell, Kraaifontein', 'Oudtshoorn', 'Paarl', 'Malmesbury & Darling', 'Stellenbosch & Franschhoek', 'Wellington', 'Calitzdorp', 'Hopefield, Langebaan & Langebaan Road', 'Bredasdorp & Napier', 'Ceres', 'Vredendal',
      'Worcester, De Doorns & Touws River', 'Knysna, Sedgefield & Plettenberg Bay', 'Bellville, Durbanville, Parow, Goodwood', 'Beaufort West', 'Cape Town', 'Caledon & Kleinmond',
      'Clanwilliam, Lambert\'s Bay, Citrusdal, Graafwater', 'George', 'George', 'Ladismith', 'Laingsburg', 'Montagu', 'Mossel Bay & Hartenbos', 'Murraysburg', 'Piketberg', 'Prince Albert', 'Riversdale & Stilbaai', 'Robertson & McGregor', 'Swellendam & Barrydale', 'Tulbagh', 'Uniondale', 'Van Rhynsdorp', 'Moorreesburg', 'Heidelberg', 'Hermanus, Gansbaai, Onrus River & Stanford', 'Grabouw & Elgin', 'Bonnievale', 'Albertinia', 'Porterville', 'Strand & Gordon\'s Bay', 'Wolseley', 'Vredenburg, Saldanha & St Helena Bay', 'Somerset West', 'Velddrif & Laaiplek', 'Kuils River & Brackenfell', 'Cape Town municipal vehicles'];
    assert.deepStrictEqual(towns, await registration.everyTown());
  });
  it('should return a list of all town codes', async function() {
    const codes = ['CA', 'CF', 'CG', 'CJ', 'CK', 'CL', 'CN', 'CO', 'CR', 'CS', 'CT', 'CV', 'CW', 'CX', 'CY', 'CZ', 'CAA', 'CAM', 'CAR', 'CAW', 'CAG', 'CBL', 'CBM', 'CBR', 'CBS', 'CBT', 'CBY', 'CCA', 'CCC', 'CCD', 'CCK', 'CCM', 'CCO', 'CCP', 'CEA', 'CEG', 'CEM', 'CEO', 'CER', 'CES', 'CEX', 'CEY', 'CFA', 'CFG', 'CFM', 'CFP', 'CFR', 'CCT'];
    assert.deepStrictEqual(codes, await registration.getCodes());
  });


  after(function() {
    pool.end();
  });
});
