//const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  //eleventyConfig.setDataDeepMerge(true);

  // Syntax Highlighting for Code blocks
  //eleventyConfig.addPlugin(syntaxHighlight);

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

  eleventyConfig.addPairedNunjucksShortcode("comment", function(_) {return ""});

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.png");

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};