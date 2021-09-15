/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
export default function registrationService(pool) {
  async function getNumbersAndTowns() {
    const results = await pool.query('SELECT reg_number,town FROM registration_numbers INNER JOIN towns ON registration_numbers.code = towns.code');
    return results.rows;
  }

  async function insertNumber(number) {
    console.log(number);
    try {
      const result = await pool.query(
          'INSERT INTO registration_numbers (reg_number) VALUES ($1)',
          [number]);
      console.log(result);
    } catch (err) {
      return err.code;
    }
  }

  async function filterByTowns(towns) {
    const query = `SELECT reg_number FROM registration_numbers INNER JOIN towns ON registration_numbers.code = towns.code WHERE towns.town IN (${towns})`;
    const results = await pool.query(query);
    return results.rows;
  }

  async function getThisTown(code, number) {
    const results = await pool.query(`SELECT town FROM towns where code = $1 AND $2 ~ '^C[A-Z]{1,2}[0-9]{6}'`, [code, number]);
    return results.rows[0];
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
