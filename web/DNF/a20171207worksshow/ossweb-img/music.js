
//音乐播放器

var $music = document.getElementById('music');

var musicList = [
    {
        title: '我是第一首歌',
        musicUrl: 'ossweb-img/music-test-1.mp3'
    },
    {
        title: '我是第二首歌',
        musicUrl: 'ossweb-img/music-test-2.ogg'
    },
    {
        title: '我是第三首歌',
        musicUrl: 'ossweb-img/bgm.mp3'
    }
];


var $btnSuspend = $('.btn-suspend');
$btnSuspend.click(function () {
    $music.currentTime = 30;
    if($(this).hasClass('play')){
        musicPause();
    }else{
        musicPlay();
    }

});

var $musicTitle  = $('.music-title'),
    $musicBar    = $('.music-bar-in'),
    $musicVolume = $('.music-volume-in'),
    $musicDisk   = $('.ico-disk'),
    $musicPointer= $('.ico-pointer'),
    $musicTimeNow= $('.music-time-now'),
    $musicTime   = $('.music-time-count');

// 默认歌曲信息展示
var _nowPlay = 2;
function autoPlayMusic(){
    $music.src = musicList[_nowPlay].musicUrl;
    $musicTitle.text(musicList[_nowPlay].title);
    $musicVolume.css('width',$music.volume * 100 + '%');
}
autoPlayMusic();

// 时间 进度条
var _musicTimer,
    _currentTime,
    _duration;
function musicCurrentTime(){
    _musicTimer = setInterval(function () {
        _currentTime = $music.currentTime;
        _duration = $music.duration;
        $musicBar.css('width',_currentTime/_duration * 100 + '%');
        $musicTimeNow.text(timeMin($music.currentTime));
        if($music.ended){
            clearInterval(diskTimer);
        }
    },1000);
}

// 歌曲时间格式转换
function timeMin(seconds){
    function timeStyle(time){
        if(time < 10) {
            time = '0' + time;
        }
        return time;
    }
    var min = Math.floor(seconds);
    var newTime = timeStyle(Math.floor(min/60)) + ":" + timeStyle(parseInt(seconds%60));
    return newTime;
}

// 播放
function musicPlay(){
    $music.play();
    $btnSuspend.addClass('play');
    diskAni();
    musicCurrentTime();
    $musicTime.text(timeMin($music.duration));
}

// 暂停
function musicPause(){
    $music.pause();
    $btnSuspend.removeClass('play');
    clearInterval(diskTimer);
}

//转盘
var diskTimer,
    diskRotate = 0;
function diskAni(state){
    diskTimer = setInterval(function(){
        diskRotate += 1.8;
        if(diskRotate >= 360){
            diskRotate = 0;
        }
        $musicDisk.css('transform','rotate(' + diskRotate + 'deg)');
    },50);
}


// 音量控制
var $volumeIco = $('.music-volume-ico'),
    $volumeOut = $('.music-volume-out'),
    $volumeIn  = $('.music-volume-in'),
    $volumeInIco = $('.music-volume-in-ico');
// 音量图标
$volumeIco.click(function () {
    var lastVolume = $music.volume;
    if(lastVolume > 0){
        $music.volume = 0;
        $volumeIn.css('width','0%');
        $volumeIco.addClass('no');
    }
    else{
        $volumeIco.removeClass('no');
        $music.volume = .5;
        $musicVolume.css('width',$music.volume * 100 + '%');
    }
});
// 音量拖拽
// var volumeInIcoDownPosX,
//     volumeMove,
//     volumeOutPosX = $volumeOut.offset().left,
//     volumeIsDown = false;
// $volumeInIco.mousedown(function(e){
//     volumeIsDown = true;
// });
// $('.panel-4').mousemove(function(e){
//     if(volumeIsDown){
//         volumeInIcoDownPosX = e.clientX;
//         volumeMove = volumeInIcoDownPosX - volumeOutPosX;
//         $musicVolume.css('width',volumeMove / 130 * 100 + '%');
//         $music.volume = parseInt($musicVolume.css('width')) / 130;
//         if(volumeMove <= 8){
//             $volumeIco.addClass('no');
//             $music.volume = 0;
//         }else{
//             $volumeIco.removeClass('no');
//         }
//     }
// }).mouseup(function(e){
//     volumeIsDown = false;
// });

function barDrag(box,obj,attr,count){
    var box         = $(box),
        obj         = $(obj),
        $objMoveIco = obj.find('.bar-ico'),
        $objOut     = obj.find('.bar-box'),
        $objOutWidth= parseInt($objOut.css('width')),
        $objIn      = obj.find('.bar');
    var isDown      = false,
        objPosX     = $objOut.offset().left,
        objMoveIcoPosX,
        movePosX;
    $objMoveIco.mousedown(function(e){
        isDown = true;
    });
    box.mousemove(function(e){
        if(isDown){
            objMoveIcoPosX = e.clientX;
            movePosX = objMoveIcoPosX - objPosX;
            $objIn.css('width',movePosX / $objOutWidth * 100 + '%');
        }
    }).mouseup(function(e){
        isDown = false;
        var attrValue = parseInt($objIn.css('width')) / $objOutWidth * count;
        if(attr == 'volume'){
            $music.volume = attrValue;
        }
        else if(attr == 'currentTime'){
            //console.log($music.fastSeek);
            /*$music.currentTime = 122;
            console.log(attrValue);
            $music.pause();*/
            $music.addEventListener("progress",function () {

            });
            $music.currentTime = attrValue;
        }
        else{
            return false;
        }
    });
}

barDrag('.panel-4','.music-volume','volume','1');

barDrag('.panel-4','.music-bar','currentTime','255');
