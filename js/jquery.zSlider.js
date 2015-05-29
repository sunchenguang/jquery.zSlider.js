;
(function($, window, document, undefined) {
    //构造函数定义对象属性
    var zSlider = function(element, options) {
        this.$element = element;
        this.options = $.extend(true, {
            animate: 'roll',
            direction: 'horizontal', //滚动方向,vertical重直滚动,horizontal水平滚动
            event: "mouseover",
            duration: 3000, //播放频率
            speed: 500, //滚动速度
            auto: true//是否自动播放
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
                'overflow': 'hidden'
            });
            //设置图片大包装盒
            this.img_wrap.css({
                'display': '-webkit-box',
                'box-orient': 'horizontal',
            });
            //设置所有a标签为block
            this.a.css({
                'display': 'block'
            });
            //如果为水平滚动，设置大包装盒的宽度，图片小包装盒
            if (this.options.direction === 'horizontal' && this.options.animate === 'roll') {
                this.img_wrap.css({});
                this.img_box.css({});
                this.imgs.css({});
            }
            //生成导航
            this.createNav();
            //是否自动播放
            if (this.options)
                this.play();
            //绑定事件，切换图片
            this.on(this.options.event);
        },
        // 编写方法 生成导航区
        //向zSlider的原型中添加生成导航的createNav方法
        createNav: function() {
            this.$element.append('<div class="nav"></div>');
            this.$nav = $('.nav');
            //按图片数量设定导航点的数量
            for (var i = 1; i <= this.number; i++) {
                this.$nav.append('<span></span>');
            }
            this.$nav.css({
                'position'         : 'absolute',
                'z-index'          : 3,
                'left'             : '50%',
                'bottom'           : '20px',
                'padding'          : '5px',
                'border-radius'    : '10px',
                'background-color' : ' rgba(255,255,255,0.3)',
                'display'          : '-webkit-box',
                'transform'        : 'translate(-50%,0)'
            });
            this.$nav.find('span').css({
                'display'          : 'block',
                'background-color' : '#fff',
                'cursor'           : 'pointer',
                'margin'           : '2px',
                'width'            : '14px',
                'height'           : '14px',
                'border-radius'    : '50%'
            });
            this.$nav.find('span:first').addClass('on').css({
                'background-color': 'orange'
            });
        },
        //自动播放方法
        play: function() {
            //setInterval中的this是指向window对象，所以也要储存起来，以便在setInterval中使用
            var Z = this;
            if (this.$element.timer) {
                clearInterval(this.$element.timer);
            }
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
            var Z = this;
            //如果是垂直滚动
            if (Z.options.direction == 'vertical') {
                $(Z.img_wrap).animate({
                    top: -Z.height * Z.index + 'px'
                }, Z.options.speed);
            } else {
                //水平滚动
                $(Z.img_wrap).animate({
                    marginLeft: -(Z.width * Z.index) + 'px'
                }, Z.options.speed);
            }
        },
        //绑定图片切换事件
        on: function(type) {
                var Z = this,
                    span = Z.$nav.find('span');
                span.on(type, function() {
                    //获取当前导航点索引序号传给Z.index
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
                this.$nav.on('mouseout', function() {
                    if (Z.options) {
                        Z.play();
                    }
                });
            }
            //Z是指实例  Z.$element则是jq对象 $('#zSlider')
    };
    $.fn.zSlider = function(options) {
        //this为jq对象  $('selector')  新建zSlider对象
        var obj = new zSlider(this, options);
        //对象初始化
        obj.init();
        //返回jQuery选择器的集合，以便链式调用
        return this;
    };
})(jQuery, window, document);
