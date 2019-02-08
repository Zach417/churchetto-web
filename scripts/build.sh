browserify -t reactify client/js/app.jsx -t envify --NODE_ENV development | uglifyjs --compress --mangle > client/build/bundle.js
