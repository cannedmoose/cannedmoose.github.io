//const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const yaml = require("js-yaml");
const fs = require('fs');

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml"
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/");

  // add markdown support
  const MarkdownIt = require("markdown-it");
  const mdRender = new MarkdownIt();
  eleventyConfig.addFilter("markdownit", function(rawString) {
    return mdRender.render(rawString);
  });

  eleventyConfig.addFilter("embed", function(rawString) {
    const data = fs.readFileSync("src" + rawString, 'utf8');
    return data;
  });

  eleventyConfig.addPairedNunjucksShortcode("comment", function(_) {return ""});

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.png");

  eleventyConfig.addPassthroughCopy("./src/CNAME");

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
      output: "docs"
    },
    htmlTemplateEngine: "njk",
  };
};