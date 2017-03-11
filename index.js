const easyimage = require('easyimage');
const fs = require('fs');
const Promise = require('bluebird');
const rx = require('rxjs');

const readDir = Promise.promisify(fs.readdir);
readDir('src')
  .then(files => {
    const promises = [];
    files.forEach(i => promises.push(easyimage.info(`src/${i}`)));
    rx
      .Observable
      .forkJoin(promises)
      .subscribe(i => console.log(i));
  })
  .catch(err => console.log(err));
