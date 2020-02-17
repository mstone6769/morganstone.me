module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('js');
  return {
    passthroughFileCopy: true,
    templateFormats: [
      'html',
      'txt',
      'png',
      'ico',
      'xml',
      'webmanifest',
      '_redirects'
    ],
    dir: {
      input: '.',
      output: '_site'
    }
  };
};