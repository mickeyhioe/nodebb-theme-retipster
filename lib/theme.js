(function(module) {
    "use strict";
    
    var Posts = require.main.require('./src/posts');
    var Social = require.main.require('./src/social');
	var Theme = {};

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
        return data;
    };

    module.exports = Theme;
    
}(module));