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
      .flatMap(i => [].concat.apply([], i))
      .map(i => {
        const opt = {
          src: i.path, 
          dst: `dst/${i.name}`,
          cropwidth: i.width - 2,
          cropheight: i.height,
          x: 0,
        };
        return easyimage.crop(opt).then();
      })
      .flatMap(i => i)
      .subscribe(i => console.log(i));
  })
  .catch(err => console.log(err));
