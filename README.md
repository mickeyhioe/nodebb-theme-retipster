# REtipster Theme for NodeBB

This repository contains all of the preparatory work for a theme based off of the [Persona theme](https://github.com/NodeBB/nodebb-theme-persona). If you'd like to base your theme off another supported theme instead, switch to the appropriate branch

# Important
To display full name on a chat box, edit the following: /src/messaging/data.js
Go to line 75
```
user.getUsersFields(uids, ['uid', 'fullname', 'username', 'userslug', 'picture', 'status', 'banned'], next);
```
