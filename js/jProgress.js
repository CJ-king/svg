/**
 * jProgress.js v1 for SVG
 * Date: 2016-05-18
 * Author: jinchangjiang <1003219989@qq.com>
 */
(function(window, undefined) {
    function jProgress(option){
        this._o=document.getElementById(option.id);
        this._num=document.getElementById(option.numid);
        this.img=option.img;
        this._w=this._o.clientWidth;
        this._h=this._o.clientHeight;
        this.lineWidth=option.lineWidth?option.lineWidth:5;//边框宽度
        this.color=option.color;//进度条颜色
        this._r=this._w/2-10;//半径
        this.loop=null;
        this.imgsize=this._w*0.5;
        this.perimeter=Math.PI*2*this._r;//圆周长
        //动画配置
        this.b = 0; //初始值
        this.c = option.variation; //变化量
        this.d = 100; //持续时间
        this.t = 0;//当前时间
        this.total=option.total;//总数
        this.time=option.time?option.time:500;//动画时间
        this.timer=null;
        this.init();
    }
    jProgress.prototype={
        init:function(){
            this.draw();
            this.animation();
        },
        animation:function(){
            var count=Math.ceil(this.tween.easeInOut(this.t, this.b, this.c, this.d));
            var per=count/this.total;
            this._num.innerHTML=count;
            this.loop.setAttribute('stroke-dasharray',per*this.perimeter+' 1000')
            this.t++;
            var _this=this;
            var st = function()
            {
                _this.animation();
            }
            this.timer = setTimeout(st, this.time/100);
            if(this.t >= this.d) {
                clearTimeout(this.timer);
            }
        },
        draw:function(){
            this._o.appendChild(this.create("circle",{"cx":this._w/2,"cy":this._h/2,r:this._r,"stroke-width":this.lineWidth, "stroke":"#f1f1f1","fill":"none"}));
            this.loop=this.create("circle",{"transform":"rotate(-90 "+this._w/2+" "+this._h/2+")","stroke-dasharray":"0 1000","cx":this._w/2,"cy":this._h/2,r:this._r,"stroke-width":this.lineWidth, "stroke":this.color,"fill":"none"});
            this._o.appendChild(this.loop);
            this._o.appendChild(this.create("rect",{"x":(this._w-this.imgsize+2)/2,"y":(this._h-this.imgsize+2)/2,"width":this.imgsize-2,"height":this.imgsize-2,"style":"fill:"+this.color+";"}));
            this._o.appendChild(this.create("image",{"x":(this._w-this.imgsize)/2,"y":(this._h-this.imgsize)/2,"width":this.imgsize,"height":this.imgsize,"xlink:href":this.img}));
        },
        create:function(tag, attributes){  
            var elem = document.createElementNS("http://www.w3.org/2000/svg", tag);
            for (var attribute in attributes) {  
                var value = attributes[attribute]; 
                if(attribute=="xlink:href"){
                    elem.setAttributeNS('http://www.w3.org/1999/xlink','href', value);
                }else{
                    elem.setAttribute(attribute, value); 
                }
                 
            }  
        return elem;  
        } ,
        tween:{
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
                return c / 2*((t -= 2) * t * t + 2) + b;
            }
        }
    }
    window.jProgress=window.jProgress||jProgress;
 })(window);