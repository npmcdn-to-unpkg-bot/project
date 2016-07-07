var game = (function(jQuery){
    var json='[{"name":"王志平","tel":"13966793174"},{"name":"张浩霖","tel":"18225798562"},{"name":"邢亚洋","tel":"18105692059"},{"name":"王君  ","tel":"15209877263"},{"name":"吴翔  ","tel":"17756983947"},{"name":"李楠楠","tel":"17755109831"},{"name":"吕自立","tel":"15156157021"},{"name":"范朝阳","tel":"15855510448"},{"name":"李岚  ","tel":"15755108932"},{"name":"胡鹏飞","tel":"15375380291"},{"name":"汪菲  ","tel":"13645603161"},{"name":"方保同","tel":"18656077515"},{"name":"储成英","tel":"18856024668"},{"name":"李婷婷","tel":"18801957165"},{"name":"吴义敏","tel":"18856064986"}]',
    obj,game={},userlist=[],timer,status=false;

    game.init=function(){
        obj = jQuery.parseJSON(json);
    }
    game.animate=function(){
        clearTimeout(timer);
        var obj = jQuery.parseJSON(json);
        timer=setInterval(function(){
            $('.username').val(obj[Math.floor(Math.random()*obj.length)].name);
            $('.usertel').val(obj[Math.floor(Math.random()*obj.length)].tel);
        },100)
        status=true;
    }
    game.play=function(){
        game.animate();
    }
    game.stop=function(){
        if(!status) return;
        clearTimeout(timer);
        if(obj.length<=0){
            alert('都有奖啦！赶紧回家吧！');
            return undefined ;
        }
        var i = Math.floor(Math.random()*obj.length);
        userlist=obj[i];
        obj.splice(i,1);
        $('.username').val(userlist.name);
        $('.usertel').val(userlist.tel);
        status=false;
        return userlist;
    }

return {
    init:function(){
        game.init();
        // console.log(obj)
    },
    play:function(){
        game.play();
    },
    stop:function(){
        return game.stop();
    }
}
})(jQuery)


