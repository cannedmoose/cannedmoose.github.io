const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const presetenv = require("postcss-preset-env");


// TODO get sitemap working

module.exports = function (eleventyConfig) {
  // Copy assets
  eleventyConfig.addPassthroughCopy({"assets/static": "assets"});

  // Add B64 font encoder
  eleventyConfig.addFilter("encodeFont", require("./config/encode-font"));

  // Add SVG encoder
  eleventyConfig.addFilter("encodeSVG", require("./config/encode-svg"));

  // PostCSS TRANSFORM
  eleventyConfig.addTransform("postcss", async function(content, outputPath) {
    if( outputPath.endsWith(".css") ) {
      return postcss([presetenv({ stage: 0 }), autoprefixer])
        .process(content)
        .then(result => result.css);
    }
    return content;
  });

  return {
    dir: {
      input: "./templates", // Equivalent to Jekyll's source property
      output: "./docs", // Equivalent to Jekyll's destination property
    },
  };
};
