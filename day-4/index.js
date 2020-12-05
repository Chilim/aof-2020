const fs = require("fs");

const input = fs.readFileSync("day-4/input.txt", "utf-8");
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const validation = {
  byr: (value) => value.length === 4 && Number(value) >= 1920 && Number(value) <= 2002,
  iyr: (value) => value.length === 4 && Number(value) >= 2010 && Number(value) <= 2020,
  eyr: (value) => value.length === 4 && Number(value) >= 2020 && Number(value) <= 2030,
  hgt: (value) => {
    const measure = value.replace(/[0-9]/g, '');
    const height = value.replace(/[a-zA-Z]/g, '');
    if (!['cm', 'in'].includes(measure)) {
      return false;
    }
    if (measure === 'cm') {
      return Number(height) >= 150 && Number(height) <= 193;
    }
    return Number(height) >= 59 && Number(height) <= 76;
  },
  hcl: (value) => {
    if (value.substring(0, 1) !== '#') {
      return false;
    }
    return value.substring(1).length === 6 && !!/^[0-9a-f]{6}$/.test(value.substring(1))
  },
  ecl: (value) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
  pid: (value) => value.length === 9 && !isNaN(Number(value)),
  cid: (value) => !!value,
}

const firstValidation = (passport) => {
  let valid = true;
  for (const requiredField of requiredFields) {
    if (!passport[requiredField]) {
      valid = false;
      break;
    }
  }
  return valid;
};

const secondValidation = (passport) => {
  let valid = true;
  const keys = Object.keys(passport);
  for (const key of keys) {
    if (!validation[key](passport[key])) {
      valid = false;
      break;
    }
  }
  return valid;
};

const getPassports = (data) => {
  const isNested = (field) => !!/\s/.test(field);
  const renderObj = (passportFields) => {
    return passportFields.reduce((acc, field) => {
      const [key, value] = field.split(':');
      return {...acc, [key]: value };
    }, {});
  };
  const splitByDoubleLinebreak = data.split(/\n\n/).map((passport) => passport.split(/\n/).filter(Boolean));
  return splitByDoubleLinebreak.map(passport => {
    const passportFields = passport.map((field) => isNested(field) ? field.split(' ') : field);
    const flatten = passportFields.flat();
    return renderObj(flatten);
  });
}


const getFirstValidPassports = (data) => {
  const passports = getPassports(data);
  return passports.filter((passport) => firstValidation(passport))
};

const getSecondValidPassports = (passports) => {
  const validPassports = [];
  passports.forEach((passport, idx) => {
    if (secondValidation(passport, idx)) {
      validPassports.push(passport);
    }
  });
  return validPassports;
};

const firstTask = (data) => {
  const validPassports = getFirstValidPassports(data);
  return validPassports.length;
}

const secondTask = (data) => {
  const firstValidPassports = getFirstValidPassports(data);
  const secondValidPassports = getSecondValidPassports((firstValidPassports));
  return secondValidPassports.length;
}

console.log(firstTask(input));
console.log(secondTask(input));





