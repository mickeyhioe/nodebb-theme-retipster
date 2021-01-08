$(document).ready(function() {
	require(['forum/topic/votes', 'api'], function (votes, api) {

		function bookmarkPost(button) {
			var method = button.attr('data-bookmarked') === 'false' ? 'put' : 'del';
			var pid = button.closest('[data-pid]').attr('data-pid');
	
			api[method](`/posts/${pid}/bookmark`, undefined, function (err) {
				if (err) {
					return app.alertError(err);
				}
				var type = method === 'put' ? 'bookmark' : 'unbookmark';
				$(window).trigger('action:post.' + type, { pid: pid });
			});
			return false;
        }
        
		$(document).on('click', '[component="category/topic"] [component="post/upvote"]', function () {
			return votes.toggleVote($(this), '.upvoted', 1);
		});
		$(document).on('click', '[component="category/topic"] [component="post/downvote"]', function () {
			return votes.toggleVote($(this), '.downvoted', -1);
		});
		$(document).on('click', '[component="category/topic"] [component="post/bookmark"]', function () {
            return bookmarkPost($(this));
		});
    });
    
    $(document).on('click', '[component="category/topic"] [component="post/flag"]', function () {
        var pid = getData($(this), 'data-pid');
        require(['flags'], function (flags) {
            flags.showFlagModal({
                type: 'post',
                id: pid,
            });
        });
    });

    $(document).on('click', '[component="category/topic"] [component="post/flagUser"]', function () {
        var uid = getData($(this), 'data-uid');
        require(['flags'], function (flags) {
            flags.showFlagModal({
                type: 'user',
                id: uid,
            });
        });
    });

    function getData(button, data) {
		return button.parents('[data-pid]').attr(data);
	}

	function togglePostVote(data) {
		var post = $('[component="category/topic"] [data-pid="' + data.post.pid + '"]');
		post.find('[component="post/upvote"]').toggleClass('upvoted', data.upvote);
		post.find('[component="post/downvote"]').toggleClass('downvoted', data.downvote);
		post.find('[component="post/vote-count"]').html(data.post.votes).attr('data-votes', data.post.votes);
	}

	socket.on('posts.upvote', togglePostVote);
	socket.on('posts.downvote', togglePostVote);
	socket.on('posts.unvote', togglePostVote);

	function togglePostBookmark(data) {
		var el = $('[data-pid="' + data.post.pid + '"] [component="post/bookmark"]');
		if (!el.length) {
			return;
		}

		el.attr('data-bookmarked', data.isBookmarked);

		el.find('[component="post/bookmark/on"]').toggleClass('hidden', !data.isBookmarked);
		el.find('[component="post/bookmark/off"]').toggleClass('hidden', data.isBookmarked);
	}

	socket.on('posts.bookmark', togglePostBookmark);
	socket.on('posts.unbookmark', togglePostBookmark);
});