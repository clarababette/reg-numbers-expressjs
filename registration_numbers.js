/* eslint-disable require-jsdoc */

export default function registrationRoutes(registrationService) {
  function formatNumbers(nums) {
    return nums.map((num) => {
      return `${getPrefix(num)} ${getDigits(num)}`;
    });
  }

  function getPrefix(regNum) {
    return regNum.slice(0, regNum.length - 6);
  }

  function getDigits(regNum) {
    return `${regNum.slice(-6, -3)}-${regNum.slice(-3)}`;
  }

  async function theseTowns() {
    const numsWithTowns = await registrationService.getTownsForNumbers();
    const towns = numsWithTowns.map((row) => {
      return row.town;
    });
    return new Set(towns);
  }
  async function validateInput(input) {
    const codes = await registrationService.getCodes();
    const nums = await registrationService.getNumbers();
    const pattern = /^[A-Z]{2,3}\d{6}$/;
    const code = getPrefix(input);
    try {
      if (!pattern.test(input) || !codes.includes(code)) {
        throw new Error('Invalid registration number.');
      }
      if (nums.includes(input)) {
        throw new Error('Registration number already captured.');
      }
      return true;
    } catch (err) {
      return err.message;
    }
  }

  async function addNumber(input) {
    input = input.toUpperCase().replace(' ', '').replace('-', '');
    const validation = await validateInput(input);
    if (validation == true) {
      await registrationService.insertNumber(input);
    } else {
      return validation;
    }
  }

  async function filter(towns) {
    const registrations = await registrationService.getTownsForNumbers();
    const matches = [];
    registrations.forEach((reg) => {
      if (towns.includes(reg.town)) {
        matches.push(reg.reg_number);
      }
    });
    return formatNumbers(matches);
  }

  // ROUTES
  async function landing(req, res) {
    res.render('index', {
      regNum: formatNumbers(await registrationService.getNumbers()),
      town: await theseTowns(),
    });
  }


  async function addRoute(req, res) {
    console.log(req.body.regInput);
    console.log(req.params.add_num);
    const input = req.body.regInput || req.params.add_num;
    const result = await addNumber(input);
    console.log(result);
    req.flash('error', result );
    res.redirect('/');
  }

  async function filterRoute(req, res) {
    const selected = Object.keys(req.body);
    res.render('index', {
      regNum: await filter(selected),
      filterTowns: `Vehicles registered in ${selected.join(', ')}`,
      town: await theseTowns(),
    });
  }

  async function clearData(req, res) {
    await registrationService.deleteAll();
    res.redirect('/');
  }

  async function thisRegNum(req, res) {
    let input = req.params.reg_num;
    input = input.toUpperCase().replace(' ', '').replace('-', '');
    const validation = await validateInput(input);
    if (validation == 'Invalid registration number.') {
      res.render('invalid_reg_num', {
        input: input,
      });
    } else {
      const codes = await registrationService.getCodesWithTowns();
      const thisCode = getPrefix(input);
      let thisTown = '';
      let isNew = undefined;
      codes.forEach((row) => {
        if (row.code == thisCode) {
          thisTown = row.town;
        }
      });
      if (validation == true) {
        isNew = true;
      }
      res.render('valid_reg_num', {
        regNum: formatNumbers([input]),
        town: thisTown,
        new: isNew,
      });
    }
  }
  return {
    addNumber,
    filter,
    landing,
    addRoute,
    filterRoute,
    clearData,
    thisRegNum,
  };
}
