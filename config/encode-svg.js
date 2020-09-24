const fs = require('fs'); 
const path = require('path'); 

module.exports = function encodeSVG(file) {
  const relativeFilePath = `./${file}`;
  const basename = path.basename(file).split(".");

  const data = fs.readFileSync(relativeFilePath, function(err, contents) {  
    if (err) return err  
    return contents  
  });

  return data;
}