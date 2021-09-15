/* eslint-disable require-jsdoc */

export default function registrationRoutes(registrationService) {
  const errorMessages = {
    '23505': 'Registration number already captured',
    '23514': 'Invalid registration number',
    '23503': 'Invalid area code',
    '23502': 'Please enter a registration number',
  };

  function formatNumbers(rows) {
    return rows.map((row) => {
      return `${getPrefix(row.reg_number)} ${getDigits(row.reg_number)}`;
    });
  }

  function getPrefix(regNum) {
    return regNum.slice(0, regNum.length - 6);
  }

  function getDigits(regNum) {
    return `${regNum.slice(-6, -3)}-${regNum.slice(-3)}`;
  }

  function theseTowns(rows) {
    const towns = rows.map((row) => {
      return row.town;
    });
    return new Set(towns);
  }

  // ROUTES
  async function landing(req, res) {
    const data = await registrationService.getNumbersAndTowns();
    res.render('index', {regNum: formatNumbers(data), town: theseTowns(data)});
  }

  async function addRoute(req, res) {
    let input = req.body.regInput || req.params.add_num;
    if (input) {
      input = input.toUpperCase().replace(' ', '').replace('-', '');
    }
    const result = await registrationService.insertNumber(input);
    req.flash('error', errorMessages[result] );
    res.redirect('/');
  }

  async function filterRoute(req, res) {
    const selected = Object.keys(req.body);
    selected.forEach((town, index, selected) => {
      selected[index] = town.replace(`'`, `''`);
    });
    console.log(`'${selected.join(`','`)}'`);
    let result = `'${selected.join(`','`)}'`;
    result = await registrationService.filterByTowns(result);
    result = formatNumbers(result);
    res.render('index', {
      regNum: result,
      filterTowns: `Vehicles registered in ${Object.keys(req.body).join(', ')}`,
      town: theseTowns(await registrationService.getNumbersAndTowns()),
    });
  }

  async function clearData(req, res) {
    await registrationService.deleteAll();
    res.redirect('/');
  }

  async function thisRegNum(req, res) {
    let input = req.params.reg_num;
    input = input.toUpperCase().replace(' ', '').replace('-', '');
    const town = await registrationService.getThisTown(getPrefix(input), input);
    if (town === undefined) {
      res.render('invalid_reg_num', {
        input: input,
      });
    } else {
      res.render('valid_reg_num', {
        regNum: `${getPrefix(input)} ${getDigits(input)}`,
        town: town.town,
        new: await registrationService.hasNotBeenCaptured(input),
      });
    }
  }
  return {
    landing,
    addRoute,
    filterRoute,
    clearData,
    thisRegNum,
  };
}
