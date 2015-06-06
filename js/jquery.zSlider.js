;
(function($, window, document, undefined) {
    //构造函数定义对象属性
    var zSlider = function(element, options) {
        //Z.$element是传人的jq对象 $('selector')
        this.$element = element;
        this.options = $.extend(true, {
            animate: 'roll',
            direction: 'horizontal', //滚动方向,vertical重直滚动,horizontal水平滚动
            event: "mouseover",
            duration: 3000, //播放频率
            speed: 500, //滚动速度
            auto: true //是否自动播放
        }, options);
    };
    //原型定义对象方法bind
    zSlider.prototype = {
        //初始化数据
        init: function() {
            //这里的this指zSlider这个对象或者说是zSlider实例
            this.index = 0; //开始的索引
            //图片宽度
            this.width = this.$element.find('img:first').width();
            //图片高度
            this.height = this.$element.find('img:first').height();
            //图片大包装盒 ul
            this.img_wrap = this.$element.children();
            //所有小包装盒 li
            this.img_box = this.img_wrap.children();
            //所有图片 img
            this.imgs = this.$element.find('img');
            //所有<a>
            this.a = this.$element.find('a');
            //图片数量
            this.number = this.imgs.length;
            //设置slider为相对定位
            this.$element.css({
                'position': 'relative',
                'margin': '0 auto',
                'width': this.width,
                'height': this.height,
                'overflow': 'hidden'
            });
            //设置图片大包装盒
            this.img_wrap.css({
                'display': '-webkit-box'
            });
            //设置所有a标签为block
            this.a.css({
                'display': 'block'
            });
            //设置所有img为block，为了消除包裹img的块级元素缝隙（超过img高度）
            this.imgs.css({
                'display': 'block'
            });
            //如果为水平滚动，设置图片大包装盒
            if (this.options.direction === 'horizontal' && this.options.animate === 'roll') {
                this.img_wrap.css({
                    'box-orient': 'horizontal'
                });
            } else if (this.options.direction === 'vertical') {
                //为垂直滚动
                this.img_wrap.css({
                    'box-orient': 'vertical'
                });
            }
            //生成导航
            this.createNav();
            //是否自动播放
            if (this.options.auto === true){
                this.play();
            }
            //绑定事件，切换图片
            this.on(this.options.event);
        },
        //向zSlider的原型中添加生成导航的createNav方法
        createNav: function() {
            this.$element.append('<div class="nav"></div>');
            this.$nav = $('.nav');
            //按图片数量设定导航点的数量
            for (var i = 1; i <= this.number; i++) {
                this.$nav.append('<span></span>');
            }
            this.$nav.css({
                'position': 'absolute',
                'z-index': 3,
                'left': '50%',
                'bottom': '20px',
                'padding': '5px',
                'border-radius': '10px',
                'background-color': ' rgba(255,255,255,0.3)',
                'display': '-webkit-box',
                'transform': 'translate(-50%,0)'
            });
            this.$nav.find('span').css({
                'display': 'block',
                'background-color': '#fff',
                'cursor': 'pointer',
                'margin': '2px',
                'width': '14px',
                'height': '14px',
                'border-radius': '50%'
            });
            this.$nav.find('span:first').addClass('on').css({
                'background-color': 'orange'
            });
        },
        //自动播放方法
        play: function() {
            //此时的this指的zSlider实例对象
            var Z = this;
            if (this.$element.timer) {
                clearInterval(this.$element.timer);
            }
            //setInterval中function里的this是指向window对象，要使用外层的this则要用外层变量存储的this
            this.$element.timer = setInterval(function() {
                //Z.index指图片的索引序号
                Z.index++;
                //如果索引大于或者等于图片总数
                if (Z.index >= Z.number) {
                    Z.index = 0;
                }
                //移除原先的导航点
                Z.$nav.find('span').removeClass('on').css({
                    'background-color': '#fff'
                });
                //更改当前导航点的背景色
                Z.$nav.find('span').eq(Z.index).addClass('on').css({
                    'background-color': 'orange'
                });
                //图片动画 Z[roll]() ==  Z.roll()
                Z[Z.options.animate]();
            }, this.options.duration);
        },
        //图片滚动动画
        roll: function() {
            //这里的this指zSlider实例对象
            var Z = this;
            //如果是垂直滚动
            if (this.options.direction == 'vertical') {
                $(this.img_wrap).animate({
                    marginTop: -(this.height * this.index) + 'px'
                }, this.options.speed);
            } else {
                //水平滚动
                $(this.img_wrap).animate({
                    marginLeft: -(this.width * this.index) + 'px'
                }, this.options.speed);
            }
        },
        //绑定图片切换事件
        on: function(type) {
                var Z = this,
                    span = Z.$nav.find('span');
                //给每个导航点绑定事件
                span.on(type, function() {
                    //这里的this指的是选中的span这个DOM元素，获取当前导航点索引序号传给Z.index
                    Z.index = $(this).index();
                    span.removeClass('on').css({
                        'background-color': '#fff'
                    });
                    $(this).addClass('on').css({
                        'background-color': 'orange'
                    });
                    //停止当前所有动面，如果没有这一句，在快速切换导航时，图片将一直切换,直到所有动画执行完并，造成效果不佳。
                    $(Z.img_wrap).stop();
                    //图片动画 Z[roll]()  Z.roll()
                    Z[Z.options.animate]();
                    //清除定时器
                    clearInterval(Z.$element.timer);
                });
                //给导航条绑定mouseout事件
                this.$nav.on('mouseout', function() {
                    if (Z.options.auto === true) {
                        Z.play();
                    }
                });
            }
    };
    $.fn.zSlider = function(options) {
        //此时的this为jq对象  $('selector')
        var obj = new zSlider(this, options);
        //对象初始化 obj为zSlider对象
        obj.init();
        //返回jQuery选择器的集合，以便链式调用
        return this;
    };
})(jQuery, window, document);
