const htmlmin = require('html-minifier');
const CleanCSS = require('clean-css');

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('cssmin', (code) => {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if( !outputPath.endsWith('.html') ) {
      return content;
    }
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
  });
  eleventyConfig.addPassthroughCopy({ '_static': '.' });
  return {
    passthroughFileCopy: true,
    templateFormats: [
      'html'
    ],
    dir: {
      input: '.',
      output: '_site'
    }
  };
};