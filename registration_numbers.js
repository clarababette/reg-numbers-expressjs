/* eslint-disable require-jsdoc */

export default function registrationRoutes(registrationService) {
  function formatNumbers(nums) {
    return nums.map((num) => {
      // eslint-disable-next-line max-len
      return `${num.slice(0, num.length - 6)} ${num.slice(-6, -3)}-${num.slice(-3)}`;
    });
  }

  async function theseTowns() {
    const numsWithTowns = await registrationService.getTownsForNumbers();
    const towns = numsWithTowns.map((row) => {
      return row.town;
    });
    return new Set(towns);
  }

  async function landing(req, res) {
    res.render('index', {
      regNum: formatNumbers(await registrationService.getNumbers()),
      town: await theseTowns(),
    });
  }

  async function validateInput(input) {
    const codes = await registrationService.getCodes();
    const nums = await registrationService.getNumbers();
    const pattern = /^[A-Z]{2,3}\d{6}$/;
    try {
      if (!pattern.test(input) || !codes.includes(input.slice(0, input.length - 6))) throw 'Invalid registration number.';
      if (nums.includes(input)) throw 'Registration number already captured.';
      return true;
    } catch (err) {
      return err;
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
    });
  }


  return {
    landing,
    newRegistration,
    filter,
  };
}
