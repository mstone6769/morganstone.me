module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'static': '.' });
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