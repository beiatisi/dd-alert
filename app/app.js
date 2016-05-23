//hello world
var d = {
  alert : function (argument) {

    //调用方法 需引入dd模块 require(['init','./dd'], function(i,d) {
      //确认取消；
      // new d.alert({
      //   "title":"标题党",
      //   "content":"提示消息",
      //   "ok":{
      //     "name":"好",
      //     "action":function(){
      //       console.log("ok");
      //     }
      //   },
      //   "cancel":{
      //     "name":"否",
      //     "action":function(){
      //       console.log("cancel");
      //     }
      //   }
      // });

      // // 纯提示；
      // new d.alert({
      //   "content":"提示消息",
      //   "ok":{
      //     "name":"好",
      //     "action":function(){
      //       console.log("ok");
      //     }
      //   }
      // });

      // 纯提示，X秒后消失；
      // new d.alert({
      //   "content":"Hello World",
      //   "time":3000,
      //   "ok":{
      //     "name":"好",
      //     "action":function(){
      //       console.log("ok");
      //     }
      //   }
      // });
    //})

    var css = '.ddalert{background-color:rgba(0,0,0,.5);position:fixed;top:0;bottom:0;left:0;right:0;z-index:9999}.ddalert>div{background-color:#fff;border-radius:10px;width:273px;position:absolute;left:50%;top:30%;margin-left:-136px;text-align:center}.ddalert>div dl{margin:0}.ddalert>div dl dt{line-height:30px;font-size:16px;font-weight:400;padding:10px;border-bottom:1px solid #ccc}.ddalert>div dl dt h4{color:#333;line-height:inherit}.ddalert>div dl dt p{color:#666;margin:0;line-height:24px}.ddalert>div dl dd{line-height:35px;height:auto;overflow:hidden}.ddalert>div dl dd a{display:block;width:50%;float:left;font-size:16px;color:#4285f4}.ddalert>div dl dd a:last-child{border-left:1px solid #ccc}';
    this.options = argument;
    var _id  = Math.random().toString(36).substr(2, 15);

    var ce  = function(tag){
      return document.createElement(tag);
    };

    this.dom = function(){
      var o = this.options;
      var div1 = ce("div");
          div1.className = "ddalert";
      var div2 = ce("div");
      var dl   = ce("dl");
      var dt   = ce("dt");
      var h4   = ce("h4");
          h4.innerText = o.title;
      var p    = ce("p");
          p.innerText  = o.content;
      var dd   = ce("dd");

      var a1   = ce("a");
          a1.id = "dd_no_"+_id;

      var a2   = ce("a");
          a2.id = "dd_ok_"+_id;

      if(o.cancel) a1.innerText = o.cancel.name;
      if(o.ok) a2.innerText = o.ok.name;

      //当有时间并且没有标题的时候 把确认按钮的内容换成倒计时html
      if(o.time && !o.title) a2.innerHTML = "<span><time>" +parseInt(this.options.time) / 1000+ "</time>秒后消失</span>";
      
      //如果有标题的时候 则插入标题 和取消按钮
      //否则让确认按钮宽度100%
      if(this.options.title) {
        dt.appendChild(h4);
        dd.appendChild(a1);
      }else{
        a2.style.width = "100%";
      }

      dt.appendChild(p);
      dd.appendChild(a2);
      dl.appendChild(dt);
      dl.appendChild(dd);
      div2.appendChild(dl);
      div1.appendChild(div2);

      return div1;
    };

    this.unAlert = function(callback){
      document.getElementsByClassName("ddalert")[0].remove();
      callback();
    };

    this.fn = function (argument) {
      var style   = ce("style");
          style.innerText = css;
      document.body.appendChild(style);
      document.body.appendChild(this.dom());
      var a   = null,
          b   = null,
          s   = null,
          cur = this.options.time / 1000,
          _t  = this;

      if(this.options.time && !this.options.title){
        s = setInterval(function(){
          cur -= 1;
          if(cur < 1){
            clearInterval(s);
            _t.unAlert(_t.options.ok.action);
          }else{
            document.querySelector("time").innerText = cur;
          }
        },1000);
        return;
      }

      //cancel点击事件
      var fn1 = function(){
        a.removeEventListener('click',fn1);
        _t.unAlert(_t.options.cancel.action);
      };
      
      //ok点击事件
      var fn2 = function(){
        b.removeEventListener('click',fn2);
        _t.unAlert(_t.options.ok.action);
      };

      if(this.options.cancel){
        a = document.getElementById("dd_no_"+_id);
        a.addEventListener('click',fn1,false);
      }

      if(this.options.ok){
        b = document.getElementById("dd_ok_"+_id);
        b.addEventListener('click',fn2,false);
      }
    };
    this.fn(argument);
  }
};