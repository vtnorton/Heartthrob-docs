var gulp = require('gulp');
var merge = require('merge-stream');
 
var deps = {
    "jquery": {
        "dist/*": ""
    },
    "prismjs": {
        "**": ""
    },
    "jquery-ui-dist": {
        "*": ""
    },
    "heartthrob": {
        "build/**": ""
    },
    "@fortawesome": {
        "fontawesome-free/**": ""
    },
    "@progress": {
        "kendo-ui/**": ""
    }
};

gulp.task('restore', function () {
    var streams = [];

    for (var prop in deps) {
        console.log("Restoring scripts for: " + prop);
        for (var itemProp in deps[prop]) {
            streams.push(gulp.src("node_modules/" + prop + "/" + itemProp)
                .pipe(gulp.dest("wwwroot/lib/" + prop + "/" + deps[prop][itemProp])));
        }
    }

    return merge(streams);
});