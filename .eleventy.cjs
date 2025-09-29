const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");

module.exports = function(eleventy) {
  // --- ПЛАГИНЫ (Обязательно для работы блога) ---
  eleventy.addPlugin(pluginRss);
  eleventy.addPlugin(pluginSyntaxHighlight);
  eleventy.addPlugin(pluginNavigation);

  // --- КОПИРОВАНИЕ СТАТИЧНЫХ ФАЙЛОВ (Ключевое исправление) ---
  // Эта команда говорит: "Возьми папку 'public' из корня и скопируй
  // ее содержимое в корень готового сайта (_site)".
  eleventy.addPassthroughCopy({ "public/": "/" });

  // Эта команда говорит: "Возьми папку 'css' из корня и скопируй
  // ее целиком в готовый сайт (_site/css)".
  eleventy.addPassthroughCopy("css");
  
  // Эта команда говорит: "Возьми папку 'js' из корня и скопируй
  // ее целиком в готовый сайт (_site/js)".
  eleventy.addPassthroughCopy("js");

  // Фильтры для дат (стандартные)
  eleventy.addFilter("readableDate", (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
  });
  eleventy.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    
    // СТАНДАРТНАЯ И ПРАВИЛЬНАЯ СТРУКТУРА ДЛЯ ЭТОГО ШАБЛОНА
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site"
    }
  };
};
