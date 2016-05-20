/**
 * Created by Administrator on 2016/1/5 0005.
 * author MGY   QQ:190884513
 */
window.common_fn = {};
var toString = Object.prototype.toString;
//判断是否是字符串，数组，对象，返回boolean值
common_fn.isString = function (str) {
    return toString.call(str) === '[object String]';
};

common_fn.isArray = function (arr) {
    return toString.call(arr) === '[object Array]';
};

common_fn.isObject = function (obj) {
    return toString.call(obj) === '[object Object]';
};
//数组扩展indexOf方法，返回某个指定的值在数组中首次出现的位置索引值
Array.prototype.indexOf = Array.prototype.indexOf || function (searchElement, fromIndex) {
        if (this === undefined || this === null) {
            throw new TypeError('"this" is null or not defined');
        }

        var length = this.length >>> 0; // Hack to convert object.length to a UInt32

        fromIndex = +fromIndex || 0;

        if (Math.abs(fromIndex) === Infinity) {
            fromIndex = 0;
        }

        if (fromIndex < 0) {
            fromIndex += length;

            if (fromIndex < 0) {
                fromIndex = 0;
            }
        }

        for (; fromIndex < length; fromIndex++) {
            if (this[fromIndex] === searchElement) {
                return fromIndex;
            }
        }

        return -1;
    };
//获取时间戳，一般用在ajax请求后面
common_fn.getrandomnum = function () {
    return (new Date()).valueOf();
};

//获取地址栏指定参数
common_fn.getQueryString = function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
//判断访问终端  if(common_fn.browser.versions.mobile||common_fn.browser.versions.android||common_fn.browser.versions.ios){ alert("移动端"); }
common_fn.browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
common_fn.curMonthDays = function () {
    var d = new Date();
    //d.getMonth()+1代表下个月，月份索引从0开始，即当前月为6月时，getMonth()返回值为5，创建日期时同理
    //此处构造的日期为下个月的第0天，天数索引从1开始，第0天即代表上个月的最后一天
    var curMonthDays = new Date(d.getFullYear(), (d.getMonth() + 1), 0).getDate();
    return curMonthDays;
};
common_fn.getMonthDays = function (num) {
    var d = new Date();
    var MonthDays = 0;
    for (var i = 0; i < num; i++) {
        MonthDays += new Date(d.getFullYear(), (d.getMonth() + (i + 1)), 0).getDate();
    }
    return MonthDays;
};
common_fn.outputFloatmoney = function (number, float) {
    //不保留小数，每三位一个逗号
    number = String(number);
    number = number.replace(/\,/g, "");
    if (isNaN(number) || number == "")return "";
    number = Math.round(number * 100) / 100;
    if (number < 0) {
        return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
    } else {
        if (float == "float") {
            return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
        } else {
            return outputdollars(Math.floor(number - 0) + '');
        }

    }

}

//毫秒时间转换   common_fn.timecycle(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss')
common_fn.timecycle = function (time,format) {
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })

}
//格式化金额
function outputdollars(number) {
    if (number.length <= 3)
        return (number == '' ? '0' : number);
    else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (var i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0))
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    }
}
function outputcents(amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
}


//添加ajax(支持IE8，9跨域)
/*!
 * jQuery-ajaxTransport-XDomainRequest - v1.0.3 - 2014-06-06
 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
 * Copyright (c) 2014 Jason Moon (@JSONMOON)
 * Licensed MIT (/blob/master/LICENSE.txt)
 */
;(function (a) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], a)
    } else if (typeof exports === 'object') {
        module.exports = a(require('jquery'))
    } else {
        a(jQuery)
    }
}(function ($) {
    if ($.support.cors || !$.ajaxTransport || !window.XDomainRequest) {
        return
    }
    var n = /^https?:\/\//i;
    var o = /^get|post$/i;
    var p = new RegExp('^' + location.protocol, 'i');
    $.ajaxTransport('* text html xml json', function (j, k, l) {
        if (!j.crossDomain || !j.async || !o.test(j.type) || !n.test(j.url) || !p.test(j.url)) {
            return
        }
        var m = null;
        return {
            send: function (f, g) {
                var h = '';
                var i = (k.dataType || '').toLowerCase();
                m = new XDomainRequest();
                if (/^\d+$/.test(k.timeout)) {
                    m.timeout = k.timeout
                }
                m.ontimeout = function () {
                    g(500, 'timeout')
                };
                m.onload = function () {
                    var a = 'Content-Length: ' + m.responseText.length + '\r\nContent-Type: ' + m.contentType;
                    var b = {code: 200, message: 'success'};
                    var c = {text: m.responseText};
                    try {
                        if (i === 'html' || /text\/html/i.test(m.contentType)) {
                            c.html = m.responseText
                        } else if (i === 'json' || (i !== 'text' && /\/json/i.test(m.contentType))) {
                            try {
                                c.json = $.parseJSON(m.responseText)
                            } catch (e) {
                                b.code = 500;
                                b.message = 'parseerror'
                            }
                        } else if (i === 'xml' || (i !== 'text' && /\/xml/i.test(m.contentType))) {
                            var d = new ActiveXObject('Microsoft.XMLDOM');
                            d.async = false;
                            try {
                                d.loadXML(m.responseText)
                            } catch (e) {
                                d = undefined
                            }
                            if (!d || !d.documentElement || d.getElementsByTagName('parsererror').length) {
                                b.code = 500;
                                b.message = 'parseerror';
                                throw'Invalid XML: ' + m.responseText;
                            }
                            c.xml = d
                        }
                    } catch (parseMessage) {
                        throw parseMessage;
                    } finally {
                        g(b.code, b.message, c, a)
                    }
                };
                m.onprogress = function () {
                };
                m.onerror = function () {
                    g(500, 'error', {text: m.responseText})
                };
                if (k.data) {
                    h = ($.type(k.data) === 'string') ? k.data : $.param(k.data)
                }
                m.open(j.type, j.url);
                m.send(h)
            }, abort: function () {
                if (m) {
                    m.abort()
                }
            }
        }
    })
}));

