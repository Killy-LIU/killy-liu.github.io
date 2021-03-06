let init = function() {
    var that = this;
    $.getJSON("/photo/output.json", function (data) {
        that.render(that.page, data);

        that.scroll(data);
    });
}

function render(page, data) {
    var begin = (page - 1) * this.offset;
    var end = page * this.offset;
    if (begin >= data.length) return;
    var html, li = "";
    for (var i = begin; i < end && i < data.length; i++) {
        li += '<li><div class="img-box">' +
            '<a class="img-bg" rel="example_group" href="https://github.com/Killy-LIU/blog/tree/master/photos/' + data[i] + '?raw=true"></a>' +
            '<img lazy-src="https://github.com/Killy-LIU/blog/tree/master/photos/' + data[i] + '?raw=true" />' +
            '</li>';
    }

    //html = '<section class="archives album">' +
    //    '<ul class="img-box-ul">' + li + '</ul>' +
    //    '</section>';

    $(".img-box-ul").append(li);
    $(".img-box-ul").lazyload();
    $("a[rel=example_group]").fancybox();
}

function scroll(data) {
    var that = this;
    $(window).scroll(function() {
        var windowPageYOffset = window.pageYOffset;
        var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
        var sensitivity = 0;
        var offsetTop = $(".instagram").offset().top + $(".instagram").height();

        if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
            that.render(++that.page, data);
        }
    })
}

init: init

