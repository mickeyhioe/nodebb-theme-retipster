var Posts = require.main.require('./src/posts');
var library = module.exports;

library.getTopics = async (data) => {
	const pids = data.topics.map(x => x.mainPid);
	const [{ upvotes, downvotes }, bookmarked] = await Promise.all([
		Posts.getVoteStatusByPostIDs(pids, data.uid),
		Posts.hasBookmarked(pids, data.uid),
	]);
	data.topics.forEach((topic, i) => {
		topic.upvoted = upvotes[i];
		topic.downvoted = downvotes[i];
		topic.bookmarked = bookmarked[i];
	});
	return data;
};

(function(module) {
	"use strict";

	var Theme = {};

	Theme.defineWidgetAreas = function(areas, callback) {
		areas = areas.concat([
			{
				'name': 'MOTD',
				'template': 'home.tpl',
				'location': 'motd'
			},
			{
				'name': 'Homepage Footer',
				'template': 'home.tpl',
				'location': 'footer'
			},
			{
				'name': 'Category Sidebar',
				'template': 'category.tpl',
				'location': 'sidebar'
			},
			{
				'name': 'Topic Footer',
				'template': 'topic.tpl',
				'location': 'footer'
			}
		]);

		callback(null, areas);
	};

	module.exports = Theme;

}(module));