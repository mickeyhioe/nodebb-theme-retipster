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
            console.log('upvote');
			return votes.toggleVote($(this), '.upvoted', 1);
		});
		$(document).on('click', '[component="category/topic"] [component="post/downvote"]', function () {
            console.log('downvote');
            return votes.toggleVote($(this), '.downvoted', -1);
		});
		$(document).on('click', '[component="category/topic"] [component="post/bookmark"]', function () {
            console.log('bookmark this post');
            return bookmarkPost($(this));
		});
    });
    
    $(document).on('click', '[component="category/topic"] [component="post/flag"]', function () {
        console.log('Flag Post');
        var pid = getData($(this), 'data-pid');
        require(['flags'], function (flags) {
            flags.showFlagModal({
                type: 'post',
                id: pid,
            });
        });
    });

    $(document).on('click', '[component="category/topic"] [component="post/flagUser"]', function () {
        console.log('Flag User');
        var uid = getData($(this), 'data-uid');
        require(['flags'], function (flags) {
            flags.showFlagModal({
                type: 'user',
                id: uid,
            });
        });
    });

    $(document).on('click', '[component="category/topic"] [component="share/twitter"]', function () {
        return openShare('https://twitter.com/intent/tweet?text=' + encodeURIComponent(name) + '&url=', getPostUrl($(this)), 550, 420);
    });

    $(document).on('click', '[component="category/topic"] [component="share/facebook"]', function () {
        return openShare('https://www.facebook.com/sharer/sharer.php?u=', getPostUrl($(this)), 626, 436);
    });

    $(document).on('click', '[component="category/topic"] [component="share/copy"]', function () {
        var textarea = document.createElement("textarea");
        textarea.textContent = getPostUrl($(this));
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        bootbox.alert('The link has been copied to the clipboard');
    });

    var baseUrl = window.location.protocol + '//' + window.location.host;

    function openShare(url, urlToPost, width, height) {
        window.open(url + encodeURIComponent(baseUrl + config.relative_path + urlToPost), '_blank', 'width=' + width + ',height=' + height + ',scrollbars=no,status=no');
        $(window).trigger('action:share.open', {
            url: url,
            urlToPost: urlToPost,
        });
        return false;
    }

	function getPostUrl(clickedElement) {
		var pid = parseInt(clickedElement.parents('[data-pid]').attr('data-pid'), 10);
		return '/post' + (pid ? '/' + (pid) : '');
    }    

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
    
    function updateBookmarkCount(data) {
        console.log('updateBookmarkCount');
		$('[data-pid="' + data.post.pid + '"] .bookmarkCount').filter(function (index, el) {
			return parseInt($(el).closest('[data-pid]').attr('data-pid'), 10) === parseInt(data.post.pid, 10);
		}).html(data.post.bookmarks).attr('data-bookmarks', data.post.bookmarks);
	}

	socket.on('posts.bookmark', togglePostBookmark);
    socket.on('posts.unbookmark', togglePostBookmark);
    socket.on('event:bookmarked', updateBookmarkCount);
});