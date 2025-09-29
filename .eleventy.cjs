const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
	// Копируем папки `css`, `img`, и `js` в итоговую папку `_site`
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("js");

	// --- Стандартные настройки из eleventy-base-blog (оставьте их) ---
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	eleventyConfig.addFilter("getWebmentionsForUrl", (webmentions, url) => {
		// Это стандартная функция, ее можно оставить как есть
		return []; 
	});

	return {
		templateFormats: [ "md", "njk", "html", "liquid" ],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: "content",
			includes: "../_includes",
			data: "../_data",
			output: "_site"
		}
	};
};
