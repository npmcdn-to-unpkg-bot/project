/* 内容管理对象 */

var H5 = function(){
  this.id = ('h5_'+Math.random()).replace('.','_');
  this.el = $('<div class="h5" id="'+this.id+'">').hide();
  $('body').append(this.el);
  /**
   * 新增一个页
   * @param {name 组件的名称会加入到classname 中}
   * @param {text 页内的默认文本}
   * @return H5 对象 可以重复使用H5对象支持的方法
   */
  this.addPage = function(name,text){
    var page = $('<div class="h5_page">');
    if(name !=undefined){
      page.addClass('h5_page_'+name);
    }
    if(text!=undefined){
      page.text(text);
    }
    this.el.append(page);
    return this;
  }
  //新增一个组件
  this.addComponent = function(name,cfg){
    return this;
  }
  /*
    H5对象初始化
   */
  this.loader =function(){
    this.el.show();
  }
  return this;
}