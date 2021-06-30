(function(module) {
    "use strict";
    
    var Posts = require.main.require('./src/posts');
    var Social = require.main.require('./src/social');
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
				'name': 'Category Header',
				'template': 'category.tpl',
				'location': 'header'
			},
            {
				'name': 'Category Footer',
				'template': 'category.tpl',
				'location': 'footer'
			},
            {
				'name': 'Categories Sidebar',
				'template': 'categories.tpl',
				'location': 'sidebar'
			},
            {
				'name': 'Categories Header',
				'template': 'categories.tpl',
				'location': 'header'
			},
            {
				'name': 'Categories Footer',
				'template': 'categories.tpl',
				'location': 'footer'
			},
			{
				'name': 'Topic Sidebar',
				'template': 'topic.tpl',
				'location': 'sidebar'
			},
            {
				'name': 'Topic Header',
				'template': 'topic.tpl',
				'location': 'header'
			},
            {
				'name': 'Topic Footer',
				'template': 'topic.tpl',
				'location': 'footer'
			}
		]);

		callback(null, areas);
    };

    Theme.getTopics = async (data) => {
        const pids = data.topics.map(x => x.mainPid);
        const [{ upvotes, downvotes }, bookmarked, bookmarks, postSharing] = await Promise.all([
            Posts.getVoteStatusByPostIDs(pids, data.uid),
            Posts.hasBookmarked(pids, data.uid),
            Posts.getPostsFields(pids, ['bookmarks']),
            Social.getActivePostSharing()
        ]);
        data.topics.forEach((topic, i) => {
            topic.upvoted = upvotes[i];
            topic.downvoted = downvotes[i];
            topic.bookmarked = bookmarked[i];
            topic.bookmarks = bookmarks[i];
            topic.postSharing = postSharing;
        });
        console.log(data.topics);
        return data;
    };

    module.exports = Theme;
    
}(module));