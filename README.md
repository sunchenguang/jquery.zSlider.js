# jquery.zSlider.js
jquery插件 图片轮播

#简单的jquery图片轮播插件
$('#zSlider').Zslider(options);即可调用
#基本结构
<div id="zSlider">
	<ul>
	    <li>
	        <a href="#"><img src="" /></a>
	    </li>
	    <li>
	        <a href="#"><img src="" /></a>
	    </li>
	    <li>
	        <a href="#"><img src="" /></a>
	    </li>
	    <li>
	        <a href="#"><img src="" /></a>
	    </li>
	</ul>
</div>


#options 可选参数

//滚动方向,vertical重直滚动,horizontal水平滚动
direction: 'horizontal',
//触发滚动事件 mouseover
event: "mouseover",
//播放频率 单位毫秒
duration: 3000,
//滚动速度 单位毫秒
speed: 500,
//是否自动播放 true/false
auto: true


