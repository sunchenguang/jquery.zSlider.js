# jquery.zSlider.js

## Getting Started
This plugin requires jQuery.This is from home SSH;
```js
<script src="jquery.min.js"></script>
```

import the plugin

```js

<script src="jquery.zSlider.js"></script>
```



### Overview

```js
$('#zSlider').zSlider(options);
```

### Options

### Usage Examples
```js
$('#zSlider').zSlider({
	direction:'vertical',
    event:'click',
    auto:false,
    duration: 2000,
    speed: 200
})
```
#### Default Options

```js
{
	//滚动方向,vertical重直滚动,horizontal水平滚动
	direction: 'horizontal',
	//触发滚动事件 mouseover/click
	event: "mouseover",
	//播放频率 单位毫秒(默认每隔3秒滚动一次)
	duration: 3000,
	//滚动速度 单位毫秒(默认图片滚动一次时间为500ms)
	speed: 500,
	//是否自动播放 true/false,为false时只有在导航条上触发事件才会滚动一次，其他情况不滚动
	auto: true
}
```
### 添加requirejs，模块化写法
```js
在主模块中写如下代码
require.config({
    paths: {
        'jquery': 'jquery.min'
    }
});
require(['jquery', 'zSlider'], function($, z) {
    //$('#zSlider').zSlider({
    //     direction: 'vertical', //滚动方向,vertical重直滚动,horizontal水平滚动
    //     event: "click",
    //     duration: 3000, //播放频率
    //     speed: 500, //滚动速度
    //     auto: true //是否自动播放
    // });
    var slider = new z.zSlider($('#zSlider'), {
        direction: 'vertical', //滚动方向,vertical重直滚动,horizontal水平滚动
        event: "click",
        duration: 3000, //播放频率
        speed: 500, //滚动速度
        auto: true //是否自动播放
    });

});
```


## Release History
2015-7-23&nbsp;&nbsp;&nbsp;v0.0.4&nbsp;&nbsp;&nbsp; 模块化
```html
增加了zSlider模块，require.js，main.js和zSlider_v2.html
```
2015-7-17&nbsp;&nbsp;&nbsp;v0.0.3&nbsp;&nbsp;&nbsp; Optimization
```html
<br>
```
2015-6-6&nbsp;&nbsp;&nbsp;v0.0.2&nbsp;&nbsp;&nbsp; Optimization
```html
<br>
```
2015-5-29&nbsp;&nbsp;&nbsp;v0.0.1&nbsp;&nbsp;&nbsp; init

## License
Copyright (c) 2015 suncg. Licensed under the MIT license.

