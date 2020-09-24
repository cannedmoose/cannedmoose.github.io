const fs = require('fs'); 
const path = require('path'); 

module.exports = function encodeFont(file) {
  const relativeFilePath = `./${file}`;
  const basename = path.basename(file).split(".");

  const data = fs.readFileSync(relativeFilePath, function(err, contents) {  
    if (err) return err  
    return contents  
  });

  const [family, weight, style] = basename[0].split('-');
  const format = basename[1];

  return `
  @font-face {
    font-family: '${family}';
    src: url(data:application/font-truetype;charset=utf-8;base64,${Buffer.from(data).toString("base64")}) format('truetype');
    font-weight: ${weight};
    font-style: ${style};
  }
  `;
}