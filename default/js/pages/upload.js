$.extend($.fn, {
    uploadPreview: function (opts) {
        var _self = this,
            _this = $(this);
        opts = $.extend({
            scrollX: "",
            position: ".addpic",
            picBox : ".picBox",
            Width: 100,
            Height: 100,
            ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
            callback: function () {}
        }, opts || {});
        _self.getObjectURL = function (file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file)
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file)
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file)
            }
            return url
        };
        _this.live("change", function () {
            if(this.value) {
                if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
                    this.value = "";
                    return false
                }
                if (/msie/.test(navigator.userAgent.toLowerCase())) {
                    try {
                        //$('<span class="up-item"><img src="'+_self.getObjectURL(this.files[0])+'" width="'+opts.Width+'" height="'+opts.Height+'"><i class="delImg">X</i></span>').insertBefore(_this.parent(opts.position+":first"));
                        //$(opts.picBox).prepend($('<li><img src="'+_self.getObjectURL(this.files[0])+'" width="'+opts.Width+'" height="'+opts.Height+'"><i class="delImg"></i></li>'));
                    } catch (e) {
                        var src = "";
                        var obj = $("<img width='"+opts.Width+"' height='"+opts.Height+"'>");
                        var div = obj.wrap("<li></li>");
                        div.insertBefore(_this.parent(opts.position));
                        _self.select();
                        if (top != self) {
                            window.parent.document.body.focus()
                        } else {
                            _self.blur()
                        }
                        src = document.selection.createRange().text;
                        document.selection.empty();
                        div.css({
                            'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
                            'width': opts.Width + 'px',
                            'height': opts.Height + 'px'
                        });
                        div[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                    }
                } else {
                    //$(opts.picBox).prepend($('<li><img src="'+_self.getObjectURL(this.files[0])+'" width="'+opts.Width+'" height="'+opts.Height+'"><i class="delImg"></i></li>'));
                }

                // //多个图片上传
                // var cloneElem = $(opts.position).first().clone();
                // cloneElem.insertBefore($(opts.position).first());
                // $(opts.position).hide();
                // cloneElem.show();


                //
                opts.callback();

                //删除图片
                $(".delImg").off("click").on("click", function(){
                     if(confirm("确定要删除此图片吗？")){
                        var _parent = $(this).parent("li"),
                            index = _parent.index();

                        $(this).parent("li").remove();
                        $(opts.position).eq(index).remove();
                        if(index == 0){
                            $(opts.position).eq(0).show().find("input").val("");
                        }
                     }
                });
            }
        })
    }
});