toy-server
==========

Basic server to play around with .html and css/scss (sass) files. All files under /public directory will be served with no need of extra configuration. All scripts under /scripts will be compiled into one single minified file under /scripts/min/all.min.js   So there is **no** need to add your scripts to index.html

When a html / js / scss file is changed the server will restart and will trigger a live reload. This means that if you have software or this awesome [chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) your chrome will refresh automatically. If you are using this extension make sure you activate it in your [http://localhost:3000](http://localhost:3000) the circle in the middle of the extension logo should have a black fill.

###Installing
`npm install`

`npm install -g gulp`

`gem install sass`

`gulp`
