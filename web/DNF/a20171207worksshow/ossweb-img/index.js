
// loading
function loading(){
    var _loadText = 0,
        _speed    = 100;
    var timer = setInterval(function () {
        _loadText++;
        if(_loadText >= 100) {
            _loadText = 100;
            clearInterval(timer);
        }
        $('.load-text .nums').text(_loadText + '%');
        $('.load-line').css('width',_loadText + '%');
    },_speed)
};
loading();

//×ó²àµ¼º½
$('.nav-left-links .nav-left-item').click(function () {
    $(this).addClass('on').siblings().removeClass('on');
});



