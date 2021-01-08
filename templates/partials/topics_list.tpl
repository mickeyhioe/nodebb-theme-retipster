<ul component="category" class="topic-list" itemscope itemtype="http://www.schema.org/ItemList" data-nextstart="{nextStart}" data-set="{set}">
	<meta itemprop="itemListOrder" content="descending">
	{{{each topics}}}
	<li component="category/topic" class="row clearfix category-item {function.generateTopicClass}" <!-- IMPORT partials/data/category.tpl -->>
		<a id="{../index}" data-index="{../index}" component="topic/anchor"></a>
        <meta itemprop="name" content="{function.stripTags, title}">
            
        <div class="col-md-9 col-sm-9 col-xs-10 content">
			<div class="avatar pull-left">
				<!-- IF showSelect -->
				<div class="select" component="topic/select">
					<!-- IF topics.thumb -->
					<img src="{config.relative_path}{topics.thumb}" class="user-img not-responsive" />
					<!-- ELSE -->
					{buildAvatar(topics.user, "46", true, "not-responsive")}
					<!-- ENDIF topics.thumb -->
					<i class="fa fa-check"></i>
				</div>
				<!-- ENDIF showSelect -->

				<!-- IF !showSelect -->
				<a href="<!-- IF topics.user.userslug -->{config.relative_path}/user/{topics.user.userslug}<!-- ELSE -->#<!-- ENDIF topics.user.userslug -->" class="pull-left">
					<!-- IF topics.thumb -->
					<img src="{config.relative_path}{topics.thumb}" class="user-img not-responsive" />
					<!-- ELSE -->
					{buildAvatar(topics.user, "46", true, "not-responsive")}
					<!-- ENDIF topics.thumb -->
				</a>
				<!-- ENDIF !showSelect -->
			</div>

			<h2 component="topic/header" class="title">
				<i component="topic/pinned" class="fa fa-thumb-tack <!-- IF !topics.pinned -->hide<!-- ENDIF !topics.pinned -->" title="{{{ if !../pinExpiry }}}[[topic:pinned]]{{{ else }}}[[topic:pinned-with-expiry, {../pinExpiryISO}]]{{{ end }}}"></i>
				<i component="topic/locked" class="fa fa-lock <!-- IF !topics.locked -->hide<!-- ENDIF !topics.locked -->" title="[[topic:locked]]"></i>
				<i component="topic/moved" class="fa fa-arrow-circle-right <!-- IF !topics.oldCid -->hide<!-- ENDIF !topics.oldCid -->" title="[[topic:moved]]"></i>
				{{{each topics.icons}}}{@value}{{{end}}}


				<!-- IF !topics.noAnchor -->
				<a href="{config.relative_path}/topic/{topics.slug}<!-- IF topics.bookmark -->/{topics.bookmark}<!-- ENDIF topics.bookmark -->" itemprop="url">{topics.title}</a><br />
				<!-- ELSE -->
				<span>{topics.title}</span><br />
				<!-- ENDIF !topics.noAnchor -->

				<!-- IF !template.category -->
				<small>
					<a href="{config.relative_path}/category/{topics.category.slug}">{topics.category.name}</a> &bull;
				</small>
				<!-- ENDIF !template.category -->

				<!-- IF topics.tags.length -->
				<span class="tag-list hidden-xs">
					{{{each topics.tags}}}
					<a href="{config.relative_path}/tags/{topics.tags.valueEscaped}"><span class="tag" style="<!-- IF topics.tags.color -->color: {topics.tags.color};<!-- ENDIF topics.tags.color --><!-- IF topics.tags.bgColor -->background-color: {topics.tags.bgColor};<!-- ENDIF topics.tags.bgColor -->">{topics.tags.valueEscaped}</span></a>
					{{{end}}}
					<small>&bull;</small>
				</span>
				<!-- ENDIF topics.tags.length -->

				<small class="hidden-xs"><span class="timeago" title="{topics.timestampISO}"></span> &bull; <a href="<!-- IF topics.user.userslug -->{config.relative_path}/user/{topics.user.userslug}<!-- ELSE -->#<!-- ENDIF topics.user.userslug -->">{topics.user.displayname}</a></small>
				<small class="visible-xs-inline">
					<!-- IF topics.teaser.timestamp -->
					<span class="timeago" title="{topics.teaser.timestampISO}"></span>
					<!-- ELSE -->
					<span class="timeago" title="{topics.timestampISO}"></span>
					<!-- ENDIF topics.teaser.timestamp -->
				</small>
            </h2>
            
            <div class="stat-tools hidden-sm hidden-xs" data-pid="{./mainPid}">

                <span class="stats stats-votes votes">
                    {{{ if !reputation:disabled }}}
                        <a component="post/upvote" href="#" class="{{{ if ./upvoted }}}upvoted{{{ end }}}">
                            <i class="fa fa-16px fa-arrow-circle-up"></i>
                        </a>
                        <span class="human-readable-number" component="post/vote-count" data-votes="1" title="{./votes}">{./votes}</span>
                    {{{ end }}}
                </span>

                {{{ if config.loggedIn }}}
                <!-- Bookmark -->
                <span class="stats stats-bookmark">
                    <a component="post/bookmark" data-bookmarked="{{{ if ./bookmarked }}}true{{{ else }}}false{{{ end }}}" href="#">
                        <i component="post/bookmark/on" class="fa fa-16px fa-fw fa-bookmark {{{ if !./bookmarked }}}hidden{{{ end }}}"></i>
                        <i component="post/bookmark/off" class="fa fa-16px fa-fw fa-bookmark-o {{{ if ./bookmarked }}}hidden{{{ end }}}"></i>
                        <span class="human-readable-number" component="post/bookmark-count" data-bookmarks="{./bookmarks}">{./bookmarks}</span>
                    </a>                    
                </span>
			    
                <!-- /Bookmark -->
                {{{ end }}} 

                <!-- Post -->
                <span class="stats stats-postcount">
                    <a href="{config.relative_path}/topic/{topics.slug}<!-- IF topics.bookmark -->/{topics.bookmark}<!-- ENDIF topics.bookmark -->" itemprop="url">
                        <i class="fa fa-16px fa-comment"></i>
                    </a>
                    <span class="human-readable-number" title="{topics.postcount}">{topics.postcount}</span>
                </span>
                <!-- /Post -->

                <!-- View -->
                <span class="stats stats-viewcount">
                    <i class="fa fa-16px fa-eye"></i>
                    <span class="human-readable-number" title="{topics.viewcount}">{topics.viewcount}</span>
                </span>
                <!-- /View -->

                <!-- Share -->
                <span class="share-tools">
                    <a href="#" data-toggle="dropdown" title="[[topic:share_this_post]]"><i class="fa fa-16px fa-fw fa-share"></i></a>
                    <ul class="dropdown-menu" role="menu">
                    
                        <!-- IF postSharing.length -->
                        <li class="dropdown-header">[[topic:share_this_post]]</li>
                        <!-- ENDIF postSharing.length -->
                        {{{each post.index.postSharing}}}
                            <li>
                                <a role="menuitem" component="share/{postSharing.id}" tabindex="-1" href="#"><span class="menu-icon"><i class="fa fa-fw {postSharing.class}"></i></span> {postSharing.name}</a>
                            </li>
                        {{{end}}}        
                    </ul>
                </span>
                <!-- /Share -->

                <!-- Flag -->
                <span class="flag-tools dropdown bottom-sheet">
                    <a href="#" title="Flag" data-toggle="dropdown"><i class="fa fa-fw fa-16px fa-flag"></i></a>
                    <ul class="dropdown-menu dropdown-menu-right" role="menu">           
                        <li>
                            <a component="post/flag" role="menuitem" tabindex="-1" href="#"><i class="fa fa-fw fa-flag"></i> Flag this post</a>
                        </li>
                        <li>
                        <a component="post/flagUser" role="menuitem" tabindex="-1" href="#"><i class="fa fa-fw fa-flag"></i> Flag this user</a>
                        </li>
                    </ul>
                </span>
                <!-- /Flag -->


            </div>
		</div>

		<div class="mobile-stat col-xs-2 visible-xs text-right">
			<span class="human-readable-number">{topics.postcount}</span> <a href="{config.relative_path}/topic/{topics.slug}/{topics.teaser.index}"><i class="fa fa-arrow-circle-right"></i></a>
		</div>



		<div class="col-md-3 col-sm-3 teaser hidden-xs" component="topic/teaser">
			<div class="card" style="border-color: {topics.category.bgColor}">
				<!-- IF topics.unreplied -->
				<p>
					[[category:no_replies]]
				</p>
				<!-- ELSE -->
				<!-- IF topics.teaser.pid -->
				<p>
					<a href="{config.relative_path}/user/{topics.teaser.user.userslug}">{buildAvatar(topics.teaser.user, "24", true, "not-responsive")}</a>
					<a class="permalink" href="{config.relative_path}/topic/{topics.slug}/{topics.teaser.index}">
						<span class="timeago" title="{topics.teaser.timestampISO}"></span>
					</a>
				</p>
				<div class="post-content">
					{topics.teaser.content}
				</div>
				<!-- ENDIF topics.teaser.pid -->
				<!-- ENDIF topics.unreplied -->
			</div>
		</div>
	</li>
	{{{end}}}
</ul>