const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
	// Копируем нужные папки и файлы в итоговую сборку
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("js");
	eleventyConfig.addPassthroughCopy("favicon.ico");
	eleventyConfig.addPassthroughCopy("favicon.svg");

	// --- Стандартные настройки из eleventy-base-blog (оставьте их) ---
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	eleventyConfig.addFilter("getWebmentionsForUrl", (webmentions, url) => {
		return []; 
	});

	return {
		templateFormats: [ "md", "njk", "html", "liquid" ],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: ".", // <--- ГЛАВНОЕ ИСПРАВЛЕНИЕ
			includes: "_includes",
			data: "_data",
			output: "_site"
		}
	};
};
