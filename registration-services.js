/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
export default function registrationService(pool) {
  function formatNumber(number) {
    if (number) {
      return number.toUpperCase().replace(/\s/g, '').replace(/-/g, '');
    }
  }

  function getPrefix(regNum) {
    return regNum.slice(0, regNum.length - 6);
  }

  async function getNumbersAndTowns() {
    const results = await pool.query('SELECT reg_number,town FROM registration_numbers INNER JOIN towns ON registration_numbers.code = towns.code');
    return results.rows;
  }

  async function insertNumber(number) {
    number = formatNumber(number);
    try {
      await pool.query(
          'INSERT INTO registration_numbers (reg_number) VALUES ($1)',
          [number]);
    } catch (err) {
      return err.code;
    }
  }

  async function filterByTowns(towns) {
    const query = `SELECT reg_number FROM registration_numbers INNER JOIN towns ON registration_numbers.code = towns.code WHERE towns.town IN (${towns})`;
    const results = await pool.query(query);
    return results.rows;
  }

  async function getThisTown(number) {
    number = formatNumber(number);
    const code = getPrefix(number);
    const results = await pool.query(`SELECT town FROM towns where code = $1 AND $2 ~ '^C[A-Z]{1,2}[0-9]{6}'`, [code, number]);
    return results.rows[0].town;
  }

  async function hasNotBeenCaptured(number) {
    const results = await pool.query('SELECT reg_number FROM registration_numbers WHERE reg_number = $1', [number]);
    if (results.rows[0] === undefined) {
      return true;
    }
  }

  async function deleteAll() {
    await pool.query('DELETE FROM registration_numbers');
  }

  return {
    getNumbersAndTowns,
    insertNumber,
    filterByTowns,
    deleteAll,
    getThisTown,
    hasNotBeenCaptured,
  };
}
