;
(function($, window, document, undefined) {
    //构造函数定义对象属性
    var zSlider = function(element, options) {
        //_this.$element是传人的jq对象 $('selector')
        this.$element = element;
        this.index = 0; //开始的索引
        //最外层容器宽度
        this.width = this.$element.width();
        //最外层容器高度
        this.height = this.$element.height();
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
        //options
        this.options = $.extend(true, {
            animate: 'roll',
            direction: 'hori_thisontal', //滚动方向,vertical重直滚动,hori_thisontal水平滚动
            event: "mouseover",
            duration: 3000, //播放频率
            speed: 500, //滚动速度
            auto: true //是否自动播放
        }, options);
    };
    //原型定义对象方法bind
    zSlider.prototype = {
        //初始化 zSlider对象属性 生成导航并绑定事件
        init: function() {
            //这里的this指zSlider对象
            //设置图片大包装盒
            this.img_wrap.css({
                'display': '-webkit-box',
                'transition': 'transform ' + this.options.speed + 'ms'
            });
            //设置所有a标签为block，高度，使图片宽高100%时等于最外层容器宽高
            this.a.css({
                'display': 'block',
                height: this.height
            });
            //设置所有img为block，为了消除包裹img的块级元素缝隙（超过img高度）
            this.imgs.css({
                'display': 'block'
            });
            //如果为水平滚动，设置图片大包装盒
            if (this.options.direction === 'hori_thisontal' && this.options.animate === 'roll') {
                this.img_wrap.css({
                    'box-orient': 'hori_thisontal'
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
            if (this.options.auto === true) {
                this.autoPlay();
            }
            //导航绑定事件，切换图片
            this.on(this.options.event);
        },
        //向原型添加生成导航的createNav方法
        createNav: function() {
            var html = '';
            this.$element.append('<div class="nav"></div>');
            this.nav = $('.nav');
            //按图片数量设定导航点的数量
            for (var i = 1; i <= this.number; i++) {
                html += '<span></span>';
            }
            this.nav.append(html);
            this.nav.find('span:first').addClass('on');
            this.nav_span = this.nav.find('span');
        },
        //自动播放方法，(导航点颜色更改，执行_this.roll()滚动方法)
        autoPlay: function() {
            //此时的this指的zSlider对象
            var _this = this;
            if (this.$element.timer) {
                clearInterval(this.$element.timer);
            }
            //setInterval中function里的this是指向window对象，要使用外层的this则要用_this
            this.$element.timer = setInterval(function() {
                //_this.index指图片的索引序号
                _this.index++;
                //如果索引大于或者等于图片总数
                if (_this.index >= _this.number) {
                    _this.index = 0;
                }
                //移除原先的导航点颜色
                _this.nav_span.removeClass('on');
                //更改当前导航点的背景色
                _this.nav_span.eq(_this.index).addClass('on');
                //图片动画 _this[roll]() ==  _this.roll()
                _this[_this.options.animate]();
            }, this.options.duration);
        },
        //图片滚动动画(滚动图片)
        roll: function() {
            //this指zSlider对象
            var transY = -(this.height * this.index),
                transX = -(this.width * this.index);
            //如果是垂直滚动
            if (this.options.direction == 'vertical') {
                //传统的改变margin或top的方法
                // $(this.img_wrap).animate({
                //     marginTop: -(this.height * this.index) + 'px'
                // }, this.options.speed);
                //使用css3动画的方式，性能更优
                this.img_wrap.css({
                    'transform': 'translateY(' + transY + 'px)'
                });
            } else {
                //水平滚动
                this.img_wrap.css({
                    'transform': 'translateX(' + transX + 'px)'
                });
            }
        },
        //绑定图片切换事件
        on: function(type) {
            var _this = this,
                span = this.nav_span;
            //给每个导航点绑定事件
            span.on(type, function(e) {
                //这里的this指的是选中的span这个DOM元素，获取当前导航点索引序号传给_this.index
                _this.index = $(this).index();
                span.removeClass('on');
                $(this).addClass('on');
                //停止当前所有动面，如果没有这一句，在快速切换导航时，图片将一直切换,直到所有动画执行完并，造成效果不佳。
                $(_this.img_wrap).stop();
                //图片动画 _this[roll]()  _this.roll()
                _this[_this.options.animate]();
                //清除定时器
                // clearInterval(_this.$element.timer);
            });
            //给导航条绑定mouseout事件
            this.nav.on('mouseout', function() {
                if (_this.options.auto === true) {
                    _this.autoPlay();
                }
            });
        }
    };
    $.fn.zSlider = function(options) {
        //此时的this为jq对象  $('selector')
        var obj = new zSlider(this, options);
        //对象初始化 obj为_thisSlider对象
        obj.init();
        //返回jQuery选择器的集合，以便链式调用
        return this;
    };
})(jQuery, window, document);
