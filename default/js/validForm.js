var validate = {
        require: function(elem, errmsg){
            elem = $(elem);
            elem.on("blur", function(){
                var value = this.value;
                var tipCon = $("#errorTips");
                if(value == ""){
                    $("#tipContent").html(errmsg);
                    tipCon.show();
                }else{
                    tipCon.hide();
                }
            });
        },
        phone: function(elem, errmsg){
            elem = $(elem);
            var tipCon = $("#errorTips");
            elem.on("blur", function(){
                var value = $.trim(this.value);

                if(value == ""){
                    $("#tipContent").html("手机号不能为空");
                    tipCon.show();
                    return;
                }

                if(!/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/.test(value)){
                    $("#tipContent").html("手机号码格式不正确！");
                    tipCon.show();
                }else{
                    tipCon.hide();
                }
            });
        },
        email: function(elem, errmsg){
            elem = $(elem);
            var tipCon = $("#errorTips");
            elem.on("blur", function(){
                var value = $.trim(this.value);
                if(!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)){
                    $("#tipContent").html(errmsg);
                    tipCon.show();
                }else{
                    tipCon.hide();
                }
            });
        },
        compare: function(elem1, elem2, errmsg){
            elem1 = $(elem1);
            elem2 = $(elem2);
            var tipCon = $("#errorTips");
            elem2.on("blur", function(){
                var value1 = $.trim(elem1[0].value);
                var value2 = $.trim(this.value);

                if(value2 == ""){
                    $("#tipContent").html("确认密码不能为空");
                    tipCon.show();
                    return;
                }

                if(value1 !== value2){
                    $("#tipContent").html("两次密码不一致！");
                    tipCon.show();
                }else{
                    tipCon.hide();
                }
            });
        },
        password : function(elem, errmsg){
            elem = $(elem);
            var tipCon = $("#errorTips");
            elem.on("blur", function(){
                var value = $.trim(this.value);

                if(value == ""){
                    $("#tipContent").html("密码不能为空");
                    tipCon.show();
                    return;
                }

                if(!/(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,50}/.test(value)){
                    $("#tipContent").html("密码应为6位以上字母和数字的组合！");
                    tipCon.show();
                }else{
                    tipCon.hide();
                }
            });
        }

    };
