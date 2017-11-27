function Cat(name,color){
    this.name=name;
    this.color=color;
}
var cat1 = new Cat("大毛","黄色");
var cat2 = new Cat("二毛","黑色");
console.log(cat1.name); // 大毛
console.log(cat1.color); // 黄色
console.log(cat1.constructor == Cat);
console.log(cat2.constructor == Cat);






/*
var	_itemWidth = $('.banner-item').width(),
    _itemLenght = $('.banner-item').length;
var _nowIndex = 2;

var _pos,
    _posLeft  = -2,
    _posRight = 0;

var $btnPrev = $('.btn-prev'),
    $btnNext = $('.btn-next');

slideAni();

function slideAni(){
    $('.banner-items').finish().animate({
        'marginLeft': _pos *  _itemWidth
    },500,function(){
        if(_pos == _posLeft){
            $('.banner-item:first').appendTo('.banner-items');
        }
        else if( _pos == _posRight){
            $('.banner-items').prepend($('.banner-item:last'));
        }
        $('.banner-items').css({
            'marginLeft':'-200px'
        });
    });
//            $('.banner-item').eq(_nowIndex).css({'z-index':5});
    $('.banner-item').eq(_nowIndex).addClass('on').find('img').finish().animate({
        'margin-top':'0px',
        'height':'200px'
//				'width':'200px'

    },500).parent().siblings().removeClass('on').find('img').finish().animate({
        'margin-top':'50px',
        'height':'100px'
    });

}

$btnNext.click(function(){
    _pos = _posLeft;
    _nowIndex = 3;
    slideAni();
});
$btnPrev.click(function(){
    _pos = _posRight;
    _nowIndex = 1;
    slideAni();
});*/
