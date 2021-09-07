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

  async function landing(req, res) {
    const codes = await registrationService.getCodes();
    console.log(codes.length);
    res.render('index', {
      regNum: formatNumbers(await registrationService.getNumbers()),
      town: await theseTowns(),
    });
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

  async function newRegistration(req, res) {
    let input = req.body.regInput;
    input = input.toUpperCase().replace(' ', '').replace('-', '');
    const validation = await validateInput(input);
    if (validation == true) {
      await registrationService.addNumber(input);
      res.redirect('/');
    } else {
      req.flash('error', validation);
      res.redirect('/');
    }
  }

  async function filter(req, res) {
    const selected = Object.keys(req.body);
    const registrations = await registrationService.getTownsForNumbers();
    const matches = [];
    registrations.forEach((reg) => {
      if (selected.includes(reg.town)) {
        matches.push(reg.reg_number);
      }
    });
    res.render('index', {
      regNum: formatNumbers(matches),
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
    // eslint-disable-next-line max-len
    if (validation == true || validation == 'Registration number already captured.') {
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
    } else {
      res.render('invalid_reg_num', {
        input: input,
      });
    }
  }

  async function addThis(req, res) {
    let input = req.params.add_num;
    input = input.toUpperCase().replace(' ', '').replace('-', '');

    await registrationService.addNumber(input);
    res.redirect('/');
  }

  return {
    landing,
    newRegistration,
    filter,
    clearData,
    thisRegNum,
    addThis,
  };
}
