function regNumFilter(thisRegList, theseTowns) {
  var regList = thisRegList;
  const towns = theseTowns;

  function getRegList() {
    return regList;
  }

  function addToList(inputReg) {
    regList.unshift(inputReg);
  }

  function carsForTown(town) {
    var townCars = [];
    regList.forEach(function (car) {
      if (car.startsWith(town)) {
        townCars.push(car);
      }
    });
    return townCars;
  }

  function validityTest(reg) {
    var pattern = /^((CJ|CY|CL|CK|CA|CAA|CF)\s\d{3}\s\d{3})$/;
    var patternB = /^((CJ|CY|CL|CK|CA|CAA|CF)\s\d{3}-\d{3})$/;
    var validity = true;

    if (pattern.test(reg) | patternB.test(reg)) {
      regList.forEach(function (x) {
        x = x.replace(/ /g, "");
        x = x.replace(/-/g, "");
        reg = reg.replace(/ /g, "");
        reg = reg.replace(/-/g, "");

        if (x == reg) {
          validity = false;
        }
      });
    } else {
      validity = false;
    }
    return validity;
  }

  function spaceCheck(num) {
    var str = num;
    num = str.replace(/ /g, "");
    var patNoSpaces = /^((CJ|CY|CL|CK|CA|CF)\d{3}\d{3})$/;
    var patDash = /^((CJ|CY|CL|CK|CA|CF)\d{3}-\d{3})$/;

    if (patNoSpaces.test(num)) {
      num = num.substring(0, 2) + " " + num.substring(2, 5) + " " + num.substring(5);
    }
    if (patDash.test(num)) {
      num = num.substring(0, 2) + " " + num.substring(2);
    }

    patNoSpaces = /^(CAA\d{3}\d{3})$/;
    patDash = /^(CAA\d{3}-\d{3})$/;

    if (patNoSpaces.test(num)) {
      num = num.substring(0, 3) + " " + num.substring(3, 6) + " " + num.substring(6);
    }
    if (patDash.test(num)) {
      num = num.substring(0, 3) + " " + num.substring(3);
    }

    return num;
  }

  function inputToList(str) {
    str = str.toUpperCase();
    var list = str.split(",");
    list.forEach(function (value, i, list) {
      value = value.trim();
      list[i] = spaceCheck(value);
    });
    return list;
  }

  return {
    getRegList,
    addToList,
    carsForTown,
    validityTest,
    spaceCheck,
    inputToList,
  };
}
