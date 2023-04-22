const fs = require('fs');
const path = require('path');
const process = require('process');

const PACKAGE_JSON = 'package.json';

function getPackageVersion() {
  for (let i = __dirname; path.basename(i); i = path.dirname(i)) {
    let file = path.join(i, PACKAGE_JSON);
    if (fs.existsSync(file)) {
      return require(file).version;
    }
  }

  return undefined;
}

function main() {
  let version = getPackageVersion();
  if (!version) return 1;

  console.log(version);
  return 0;
}

process.exit(main());
