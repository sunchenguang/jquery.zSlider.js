/*
 * @Author: suncg
 * @Date:   2015-07-23 17:15:17
 * @Email: 809200299@qq.com
 * @Last Modified by:   Administrator
 * @Last Modified time: 2015-07-23 17:43:42
 */
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
