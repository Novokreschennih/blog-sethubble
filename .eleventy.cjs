const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
	// =================================================================
	// === ГЛАВНОЕ ИСПРАВЛЕНИЕ ===
	// Мы явно говорим Eleventy скопировать эти папки из корня проекта 
	// в итоговую папку _site. Пути здесь указываются относительно 
	// корня проекта, поэтому эта конфигурация будет работать.
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("js");
	eleventyConfig.addPassthroughCopy("favicon.ico");
	eleventyConfig.addPassthroughCopy("favicon.svg");
	// =================================================================

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

		// === ВОЗВРАЩАЕМ ИЗНАЧАЛЬНУЮ СТРУКТУРУ ===
		// Эта конфигурация является стандартной для eleventy-base-blog
		// и гарантирует, что все внутренние пути и коллекции будут работать правильно.
		dir: {
			input: "content",
			includes: "../_includes",
			data: "../_data",
			output: "_site"
		}
	};
};
