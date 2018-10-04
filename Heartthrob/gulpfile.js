var gulp = require('gulp');
var merge = require('merge-stream');

var deps = {
    "jquery": {
        "dist/*": ""
    },
    "smooth-scroll": {
        "dist/*": ""
    },
    "nprogress": {
        "*": ""
    },
    "nicescroll": {
        "dist/*": ""
    },
    "jquery-validation-unobtrusive": {
        "*": ""
    },
    "jquery-validation": {
        "dist/*": ""
    },
    "jquery-ui-dist": {
        "*": ""
    },
    "font-awesome": {
        "**/*": ""
    },
    "heartthrob": {
        "build/**": ""
    }
};

gulp.task('restore', function () {
    var streams = [];

    for (var prop in deps) {
        console.log("Restaurando scripts para: " + prop);
        for (var itemProp in deps[prop]) {
            streams.push(gulp.src("node_modules/" + prop + "/" + itemProp)
                .pipe(gulp.dest("wwwroot/lib/" + prop + "/" + deps[prop][itemProp])));
        }
    }

    return merge(streams);
});