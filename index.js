const img = require('imagemagick');
const fs = require('fs');

fs.readdir('src', (err, files) => {
  files.forEach(i => console.log(i));
});
