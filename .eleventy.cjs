module.exports = function(eleventyConfig) {
  
  // Копирует CSS и изображения в итоговую папку `_site`
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");

  // === ДОБАВЬТЕ ЭТУ СТРОКУ ===
  eleventyConfig.addPassthroughCopy("js");
  // ============================

  // ... (здесь могут быть другие ваши настройки из eleventy-base-blog, оставьте их)

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
