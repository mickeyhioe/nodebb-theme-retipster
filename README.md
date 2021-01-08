# REtipster Theme for NodeBB

This repository contains all of the preparatory work for a theme based off of the [Persona theme](https://github.com/NodeBB/nodebb-theme-persona). If you'd like to base your theme off another supported theme instead, switch to the appropriate branch

# Important
To display full name on a chat box, edit the following: /src/messaging/data.js
Go to line 75
```
user.getUsersFields(uids, ['uid', 'fullname', 'username', 'userslug', 'picture', 'status', 'banned'], next);
```

## Edited files
See: https://github.com/NodeBB/nodebb-theme-persona/commit/12c2d19780ce7200d1187b10097af58b97164b1c

CSS:
/less/additonal.less

JS:
/lib/client.js
/lib/theme.js

JSON:
/plugin.json

Template:
/templates/account/profile.tpl
/templates/partials/chats/message.tpl
/templates/partials/topic/post.tpl
/templates/partials/topic/post-menu-list.tpl

## Plugins

[Cards Fullname]
[Fullname Registration]
[Mentions]
[Postlint]