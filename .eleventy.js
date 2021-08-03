const htmlmin = require('html-minifier');
const CleanCSS = require('clean-css');
const Terser = require('terser');
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, className = "", widths = "300,600", sizes = "100vw") {
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }
  let metadata = await Image(src, {
    widths: widths.split(','),
    formats: ['webp', 'jpeg'],
    outputDir: './dist/images/',
    urlPath: '/images/'
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<picture class="${className}">
    ${Object.values(metadata).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
}


module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('cssmin', (code) => new CleanCSS({}).minify(code).styles);
  eleventyConfig.addFilter('nowhitespace', (code) => code.replace(/\s+/g, ''));
  eleventyConfig.addNunjucksAsyncFilter('jsmin', (code, callback) =>
    Terser.minify(code)
      .then((minified) => minified.code)
      .catch((error) => {
      console.error('Terser error', error);
      return code;
    }).then((resultCode) => callback(null, resultCode)));
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

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addPassthroughCopy({ 'src/_static': '.' });
  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};