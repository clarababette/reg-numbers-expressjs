/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
export default function registrationService(pool) {
  async function getNumbers() {
    const results = await pool.query('SELECT * FROM registration_numbers');
    return results.rows.map((row) => {
      return row.reg_number;
    });
  }
  async function everyTown() {
    const results = await pool.query('SELECT * FROM towns');
    return results.rows.map((row) => {
      return row.town;
    });
  }
  async function getCodes() {
    const results = await pool.query('SELECT * FROM towns');
    return results.rows.map((row) => {
      return row.code;
    });
  }

  async function addNumber(number) {
    await pool.query(
        'INSERT INTO registration_numbers (reg_number,code) VALUES($1, $2) ON CONFLICT(reg_number) DO NOTHING',
        [number, number.slice(0, number.length - 6)]);
  }

  async function getTownsForNumbers() {
    const results = await pool.query('SELECT reg_number,town FROM registration_numbers,towns WHERE registration_numbers.code = towns.code');
    return results.rows;
  }

  return {
    getNumbers,
    everyTown,
    addNumber,
    getCodes,
    getTownsForNumbers,
  };
}
