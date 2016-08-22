var APF = {
	log : function(A) {
	}
};
var KEY_COUNT=0;
APF.Namespace = {
	register : function(D) {
		var C = D.split(".");
		var A = window;
		for (var B = 0; B < C.length; B++) {
			if (typeof A[C[B]] == "undefined") {
				A[C[B]] = new Object()
			}
			A = A[C[B]]
		}
	}
};
APF.Utils = {
	getWindowSize : function() {
		var B = 0, A = 0;
		if (typeof(window.innerWidth) == "number") {
			B = window.innerWidth;
			A = window.innerHeight
		} else {
			if (document.documentElement
					&& (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
				B = document.documentElement.clientWidth;
				A = document.documentElement.clientHeight
			} else {
				if (document.body
						&& (document.body.clientWidth || document.body.clientHeight)) {
					B = document.body.clientWidth;
					A = 464;
				}
			}
		}
		return {
			width : B,
			height : A
		}
	},
	getScroll : function() {
		var B = 0, A = 0;
		if (typeof(window.pageYOffset) == "number") {
			A = window.pageYOffset;
			B = window.pageXOffset
		} else {
			if (document.body
					&& (document.body.scrollLeft || document.body.scrollTop)) {
				A = document.body.scrollTop;
				B = document.body.scrollLeft
			} else {
				if (document.documentElement
						&& (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
					A = document.documentElement.scrollTop;
					B = document.documentElement.scrollLeft
				}
			}
		}
		return {
			left : B,
			top : A
		}
	},
	setCookie : function(C, E, A, H, D, G) {
		var B = new Date();
		B.setTime(B.getTime());
		if (A) {
			A = A * 1000 * 60 * 60 * 24
		}
		var F = new Date(B.getTime() + (A));
		document.cookie = C + "=" + escape(E)
				+ ((A) ? ";expires=" + F.toGMTString() : "")
				+ ((H) ? ";path=" + H : "") + ((D) ? ";domain=" + D : "")
				+ ((G) ? ";secure" : "")
	},
	getCookie : function(A) {
		var F = document.cookie.split(";");
		var B = "";
		var D = "";
		var E = "";
		var C = false;
		for (i = 0; i < F.length; i++) {
			B = F[i].split("=");
			D = B[0].replace(/^\s+|\s+$/g, "");
			if (D == A) {
				C = true;
				if (B.length > 1) {
					E = decodeURIComponent(B[1].replace(/^\s+|\s+$/g, ""))
				}
				return E;
				break
			}
			B = null;
			D = ""
		}
		if (!C) {
			return null
		}
	},
	deleteCookie : function(A, C, B) {
		if (this.getCookie(A)) {
			document.cookie = A + "=" + ((C) ? ";path=" + C : "")
					+ ((B) ? ";domain=" + B : "")
					+ ";expires=Thu, 01-Jan-1970 00:00:01 GMT"
		}
	},
	setScrollTop : function(A) {
		if (document.body) {
			document.body.scrollTop = A;
			if (document.body.scrollTop == 0) {
				if (document.documentElement) {
					document.documentElement.scrollTop = A
				}
			}
		} else {
			if (document.documentElement) {
				document.documentElement.scrollTop = A
			}
		}
	},
	getScrollTop : function() {
		return document.body
				? document.body.scrollTop || document.documentElement.scrollTop
				: document.documentElement.scrollTop
	},
	gotoScrollTop : function(D, C) {
		var B = APF.Utils.getScrollTop(), F = 0, E = 0;
		var C = C || 1;
		var D = D || 0;
		var A = B > D ? 1 : 0;
		(function() {
			B = APF.Utils.getScrollTop();
			F = A ? B - D : D - B;
			E = A ? B - F / 15 * C : B + 1 + F / 15 * C;
			APF.Utils.setScrollTop(E);
			if (F <= 0 || B == APF.Utils.getScrollTop()) {
				return
			}
			setTimeout(arguments.callee, 10)
		})()
	}
};
APF.Namespace.register("bmap.base");
(function(_base, $) {
	_base.inherit = function(my, classChild, classParent, args) {
		classParent.apply(my, args || []);
		$.extend(classChild.prototype, classParent.prototype)
	};
	_base.Observer = function() {
		this.ob = {}
	};
	_base.Observer.prototype.on = function(eventNames, callback) {
		var _events = eventNames.split(" ");
		for (var i = 0; i < _events.length; i++) {
			if (!this.ob[_events[i]]) {
				this.ob[_events[i]] = []
			}
			this.ob[_events[i]].push(callback)
		}
	};
	_base.Observer.prototype.off = function(eventNames) {
		var _events = eventNames.split(" ");
		for (var i = 0; i < _events.length; i++) {
			self.ob[_events[i]] = []
		}
	};
	_base.Observer.prototype.trigger = function(eventName, args) {
		var r;
		if (!this.ob[eventName]) {
			return r
		}
		var _arg = args || [];
		for (var i = 0; this.ob[eventName] && i < this.ob[eventName].length; i++) {
			r = this.ob[eventName][i].apply(this, _arg);
			if (r === false) {
				break
			}
		}
		return r
	};
	_base.rander = function(tpl, data) {
		var daName = [], daVal = [], efn = [];
		for (var i in data) {
			daName.push(i);
			daVal.push("data." + i)
		}
		var _tpl = "'" + tpl + "'";
		_tpl = _tpl.replace(/\{\%/g, "'+");
		_tpl = _tpl.replace(/\%\}/g, "+'");
		efn.push("(function(");
		efn.push(daName.join(","));
		efn.push("){");
		efn.push("return " + _tpl);
		efn.push("})(");
		efn.push(daVal.join(","));
		efn.push(")");
		return eval(efn.join(""))
	};
	_base.Delay = function(timer, callback) {
		this.callback = callback;
		this.timer = timer;
		this.outMark
	};
	_base.Delay.prototype.go = function() {
		var self = this, args = arguments;
		clearTimeout(self.outMark);
		self.outMark = setTimeout(function() {
					self.callback.apply(self, args)
				}, self.timer)
	};
	_base.Delay.prototype.clear = function() {
		var self = this;
		clearTimeout(self.outMark)
	}
})(bmap.base, jQuery);
APF.Namespace.register("bmap.module");
(function(module, $) {
	var _base = bmap.base;
	module.Search = function(op) {
		_base.inherit(this, module.Search, _base.Observer);
		var self = this;
		self.op = $.extend({}, {
					url : "",
					keyDely : 300,
					autoEvent : "keyup",
					selectInput : "#search>input",
					selectClose : "#search>.searchclear",
					selectSubmit : "#search>button",
					selectList : "#search>div",
					tpl : '<a href="javascript:;">{% name %}</a>'
				}, op || {});
		self.hasPlaceholder = (function() {
			var test = document.createElement("input");
			return test.placeholder === undefined
		})();
		self.dom = $(self.op.selectInput);
		self.btn = $(self.op.selectClose);
		self.sub = $(self.op.selectSubmit);
		self.list = $(self.op.selectList);
		self.val = "";
		self.blurClear;
		self.bindEvent()
	};
	module.Search.prototype.bindEvent = function() {
		var self = this;
		var _search = new _base.Delay(self.op.keyDely, function(_val) {
					var _url = self.op.url + encodeURIComponent(_val);

					debugger

					$.ajax({
								url : _url,
								dataType : "jsonp",
								success : function(da) {
									eval("var _da=" + da);
									self.draw(_da);
									if (_da.length != 0) {
										self.list.show()
									} else {
										self.list.hide()
									}
								},
								error : function() {
									self.draw([]);
									self.list.hide()
								}
							})
				});
		self.dom.on(self.op.autoEvent, function(e) {
					var _val = $(this).val();
					var listOn = self.list.find("a.on");
					var listAll = self.list.children("a");
					if (listOn.length > 0) {
						var onIndex = listOn.prevAll().length
					}
					if ($.trim(_val).length == 0) {
						_search.clear();
						self.list.html("").hide();
						self.btn.hide()
					} else {
						if (e.keyCode != 13 && e.keyCode != 38
								&& e.keyCode != 40) {
							self.btn.show();
							_search.go(_val)
						}
					}
					self.val = _val;
					if (e.keyCode == 13) {
						if (listOn.length > 0) {
							self.setVal(listOn.html())
						}
						self.list.html("").hide();
						self.search()
					}
					if (e.keyCode == 38) {
						if (listAll.length > 0) {
							listAll.removeClass("on");
							if (listOn.length > 0) {
								var next = onIndex - 1
							} else {
								var next = listAll.length - 1
							}
							listAll.eq(next).addClass("on")
						}
					}
					if (e.keyCode == 40) {
						if (listAll.length > 0) {
							listAll.removeClass("on");
							if (listOn.length > 0) {
								var prev = onIndex + 1
							} else {
								var prev = 0
							}
							listAll.eq(prev).addClass("on")
						}
					}
				});
		self.btn.click(function() {
					self.clear()
				});
		self.dom.focus(function() {
					if (self.hasPlaceholder
							&& $.trim(self.dom.val()) == self.dom
									.attr("placeholder")) {
						self.dom.val("")
					}
				});
		self.dom.blur(function() {
					if ($.trim(self.dom.val()).length == 0) {
						if (self.hasPlaceholder) {
							self.dom.val(self.dom.attr("placeholder"))
						}
						self.btn.hide()
					} else {
						self.blurClear = setTimeout(function() {
									self.list.hide()
								}, 500)
					}
				});
		self.list.on("click", "a", function() {
					clearTimeout(self.blurClear);
					var _val = $(this).html();
					self.setVal(_val);
					self.list.hide();
					self.search();
					return false
				});
		self.list.on("mouseover", "a", function() {
					self.list.children("a").removeClass("on");
					$(this).addClass("on")
				});
		self.sub.click(function() {
					self.search()
				});
		self.dom.blur()
	};
	module.Search.prototype.draw = function(da) {
		var self = this;
		var _list = [];
		for (var i = 0; da.length && i < da.length; i++) {
			_list.push(_base.rander(self.op.tpl, {
						name : da[i]
					}))
		}
		self.list.html(_list.join(""))
	};
	module.Search.prototype.clear = function() {
		var self = this;
		self.setVal("");
		if (self.hasPlaceholder) {
			self.dom.val(self.dom.attr("placeholder"));
			self.dom.blur()
		}
		self.btn.hide();
		self.list.html("").hide();
		self.trigger("clear")
	};
	module.Search.prototype.setVal = function(_val) {
		var self = this;
		var pureVal = _val.replace(/<[^>|<]+>/g, "");
		self.val = pureVal;
		self.dom.val(pureVal)
	};
	module.Search.prototype.search = function() {
		var self = this;
		if (self.val.length <= 0) {
			return
		}
		if (self.val.length > 20) {
			self.val = self.val.slice(0, 20)
		}
		self.trigger("search")
	}
})(bmap.module, jQuery);
jQuery(function() {
			jQuery(".nav>li").hover(function() {
						jQuery(this).addClass("hover")
					}, function() {
						jQuery(this).removeClass("hover")
					})
		});
APF.Namespace.register("bmap.ui");
(function(A, C) {
	var B = bmap.base;
	A.CheckBox = function(E) {
		B.inherit(this, A.CheckBox, B.Observer);
		var D = this;
		D.dom = C(E).eq(0);
		D.val;
		D.bindEvent()
	};
	A.CheckBox.prototype.bindEvent = function() {
		var D = this;
		D.dom.click(function() {
					D.checkVal()
				});
		D.checkVal()
	};
	A.CheckBox.prototype.checkVal = function() {
		var D = this;
		var E = D.dom.prop("checked");
		D.val = E;
		D.trigger("change")
	};
	A.Sort = function(D, F) {
		B.inherit(this, A.Sort, B.Observer);
		var E = this;
		E.op = C.extend({}, {
					defortStatus : 0,
					firstStatus : 2,
					secondStatus : 3,
					onClass : "hover",
					icon : ".micon",
					arr : ["micon-arrgray-down", "micon-arrgray-up",
							"micon-arrgreen-down", "micon-arrgreen-up"]
				}, F || {});
		E.dom = C(D).eq(0);
		E.st = E.op.defortStatus;
		E.bindEvent()
	};
	A.Sort.prototype.bindEvent = function() {
		var D = this;
		D.reset();
		D.dom.click(function() {
					D.toggleStatus()
				})
	};
	A.Sort.prototype.reset = function() {
		var D = this;
		D.setStatus(D.op.defortStatus);
		D.trigger("reset")
	};
	A.Sort.prototype.toggleStatus = function() {
		var D = this;
		var E = (D.st == D.op.firstStatus)
				? D.op.secondStatus
				: D.op.firstStatus;
		D.setStatus(E);
		D.trigger("change")
	};
	A.Sort.prototype.setStatus = function(G) {
		var D = [], E = this, F = E.dom.find(E.op.icon);
		D[0] = function() {
			E.dom.removeClass(E.op.onClass);
			F.removeClass(E.op.arr.join(" "));
			F.addClass(E.op.arr[0])
		};
		D[1] = function() {
			E.dom.removeClass(E.op.onClass);
			F.removeClass(E.op.arr.join(" "));
			F.addClass(E.op.arr[1])
		};
		D[2] = function() {
			E.dom.addClass(E.op.onClass);
			F.removeClass(E.op.arr.join(" "));
			F.addClass(E.op.arr[2])
		};
		D[3] = function() {
			E.dom.addClass(E.op.onClass);
			F.removeClass(E.op.arr.join(" "));
			F.addClass(E.op.arr[3])
		};
		E.st = G || 0;
		D[E.st]()
	};
	A.Select = function(D, G, F) {
		B.inherit(this, A.Select, B.Observer);
		var E = this;
		E.op = C.extend({}, {
					place : "全部",
					placeOp : "全部",
					sView : "span",
					sIcon : ".micon",
					sViewStr : "em",
					sList : "div",
					disableClass : "select-dis",
					onClass : "select-cur",
					openClass : "select-open",
					defortStatus : true,
					zIndexUp : 10,
					valKey : "TypeName",
					listTpl : '<a href="javascript:;">{% name %}</a>'
				}, F || {});
		E.st = true;
		E.isOpen = false;
		E.da = G || [];
		E.dom = C(D);
		E.view = E.dom.find(E.op.sView);
		E.list = E.dom.find(E.op.sList);
		E.val = 0;
		E.z_index = [E.dom.css("z-index"), E.view.css("z-index"),
				E.list.css("z-index")];
		E.bindEvent()
	};
	A.Select.prototype.bindEvent = function() {
		var D = this;
		D.update(D.da);
		D.dom.hover(function() {
					D.open()
				}, function() {
					D.close()
				});
		D.list.on("click", "a", function() {
					var E = C(this).prevAll().length;
					D.setVal(E);
					D.close()
				})
	};
	A.Select.prototype.reset = function() {
		this.setVal(0)
	};
	A.Select.prototype.setVal = function(E, F) {
		var D = this;
		D.val = E;
		if (D.val == 0) {
			D.dom.removeClass(D.op.onClass);
			D.view.find(D.op.sViewStr).html(D.op.placeOp)
		} else {
			D.dom.addClass(D.op.onClass);
			D.view.find(D.op.sViewStr).html(D.da[E - 1][D.op.valKey])
		}
		if (!F) {
			D.trigger("change")
		}
	};
	A.Select.prototype.update = function(G, E) {
		if (!G) {
			return
		}
		var F = this, J = [], H = F.op.listTpl;
		F.da = G;
		J.push(B.rander(H, {
					name : F.op.place
				}));
		for (var I = 0; I < F.da.length; I++) {
			var D = {
				name : F.da[I][F.op.valKey]
			};
			J.push(B.rander(H, D))
		}
		F.list.html(J.join(" "));
		F.trigger("update");
		if (E) {
			F.setVal(E)
		} else {
			F.reset()
		}
	};
	A.Select.prototype.changeStatus = function(E) {
		var D = this, F = (!!E) ? "removeClass" : "addClass";
		D.st = !!E;
		if (!D.st) {
			D.dom.removeClass(D.op.onClass);
			D.view.find(D.op.sViewStr).html(D.op.placeOp)
		}
		D.dom.removeClass(D.op.onClass + " " + D.op.openClass);
		D.dom[F](D.op.disableClass);
		D.trigger("changeStatus")
	};
	A.Select.prototype.open = function() {
		var D = this;
		if (!D.st) {
			return
		}
		D.dom.addClass(D.op.openClass);
		D.dom.css({
					"z-index" : D.z_index[0] - 0 + D.op.zIndexUp
				});
		D.view.css({
					"z-index" : D.z_index[1] - 0 + D.op.zIndexUp
				});
		D.list.css({
					"z-index" : D.z_index[2] - 0 + D.op.zIndexUp
				});
		D.trigger("open")
	};
	A.Select.prototype.close = function() {
		var D = this;
		D.dom.removeClass(D.op.openClass);
		D.dom.css({
					"z-index" : D.z_index[0]
				});
		D.view.css({
					"z-index" : D.z_index[1]
				});
		D.list.css({
					"z-index" : D.z_index[2]
				});
		D.trigger("close")
	}
})(bmap.ui, jQuery);
APF.Namespace.register("bmap.module");
(function(E, G) {
	var F = bmap.base, A = bmap.ui;
	E.Position = function(J, K) {
		F.inherit(this, E.Position, F.Observer);
		var I = this;
		I.op = G.extend({}, {
					selectArea : "#loc_town",
					selectZoon : "#loc_zoon"
				}, K || {});
		I.da = J;
		I.val = {
			region : 0,
			sub_region : 0
		};
		I.area = new A.Select(I.op.selectArea, J.region, {
					placeOp : "区域",
					place : "不限"
				});
		I.plate = new A.Select(I.op.selectZoon, {}, {
					placeOp : "板块",
					place : "全部"
				});
		I.bindEvent()
	};
	E.Position.prototype.bindEvent = function() {
		var I = this;
		I.reset();
		I.area.on("change", function() {
					var K = I.area.val, J;
					if (K == 0) {
						I.plate.changeStatus(false)
					} else {
						J = I.da.region[K - 1].TypeId;
						I.plate.update(I.da.sub_region[J]);
						I.plate.changeStatus(true)
					}
					I.valChange()
				});
		I.plate.on("change", function() {
					I.valChange()
				})
	};
	E.Position.prototype.reset = function() {
		var I = this;
		I.area.setVal(0, true);
		I.plate.setVal(0, true);
		I.plate.changeStatus(false);
		I.trigger("reset")
	};
	E.Position.prototype.changeArea = function(L, I) {
		var J = this;
		var K = J.da.region[L - 1].TypeId;
		J.area.setVal(L, true);
		J.plate.update(J.da.sub_region[K], I)
	};
	E.Position.prototype.valChange = function(K) {
		var I = this, J, L;
		if (I.area.val >= 1) {
			J = I.da.region[I.area.val - 1].TypeId
		} else {
			J = 0
		}
		if (I.plate.val >= 1 && I.area.val != 0) {
			L = I.plate.da[I.plate.val - 1].TypeId
		} else {
			L = 0
		}
		if (I.val.region == J && I.val.sub_region == L) {
			return
		} else {
			I.val.region = J;
			I.val.sub_region = L;
			if (!K) {
				I.trigger("change")
			}
		}
	};
	E.Filter = function(J) {
		F.inherit(this, E.Filter, F.Observer);
		var I = this;
		I.op = G.extend({}, {
					selectPrice : "#fil_price",
					selectType : "#fil_type",
					selectSale : "#st_sale",
					selectSell : "#st_sell",
					selectSold : "#st_sold",
					dataSale : [],
					dataPrice : [],
					dataType : []
				}, J || {});
		I.val = {
			status_sale : "",
			price : 0,
			property_type : 0
		};
		I.stsale = new A.CheckBox(I.op.selectSale);
		I.stsell = new A.CheckBox(I.op.selectSell);
		I.stsold = new A.CheckBox(I.op.selectSold);
		I.price = new A.Select(I.op.selectPrice, I.op.dataPrice, {
					placeOp : "均价",
					valKey : "title",
					place : "全部"
				});
		I.pType = new A.Select(I.op.selectType, I.op.dataType, {
					placeOp : "物业类型",
					valKey : "title",
					place : "全部"
				});
		I.bindEvent()
	};
	E.Filter.prototype.bindEvent = function() {
		var I = this;
		I.valChange(true);
		I.stsale.on("change", function() {
					I.valChange()
				});
		I.stsell.on("change", function() {
					I.valChange()
				});
		I.stsold.on("change", function() {
					I.valChange()
				});
		I.price.on("change", function() {
					I.valChange()
				});
		I.pType.on("change", function() {
					I.valChange()
				})
	};
	E.Filter.prototype.valChange = function(K) {
		var J = this;
		var M = [], L = (J.price.val == 0) ? 0 : J.price.da[J.price.val - 1].id, I = (J.pType.val == 0)
				? 0
				: J.pType.da[J.pType.val - 1].id;
		if (J.stsell.val) {
			M = M.concat(J.op.dataSale.forsale.split(","))
		}
		if (J.stsale.val) {
			M = M.concat(J.op.dataSale.onsale.split(","))
		}
		if (J.stsold.val) {
			M = M.concat(J.op.dataSale.saleout.split(","))
		}
		M = M.join(",");
		J.val = {
			status_sale : M,
			price : L,
			property_type : I
		};
		if (!K) {
			J.trigger("change")
		}
	};
	E.Sort = function(K, L, J) {
		F.inherit(this, E.Sort, F.Observer);
		var I = this;
		I.btnReset = G(K);
		I.newSort = new A.Sort(L);
		I.priceSort = new A.Sort(J, {
					firstStatus : 3,
					secondStatus : 2
				});
		I.val = {
			order : "rank",
			order_type : "asc"
		};
		I.bindEvent()
	};
	E.Sort.prototype.bindEvent = function() {
		var I = this;
		I.newSort.on("change", function() {
					I.priceSort.reset();
					I.setVal()
				});
		I.priceSort.on("change", function() {
					I.newSort.reset();
					I.setVal()
				});
		I.btnReset.click(function() {
					var K = I.priceSort.st, J = I.newSort.st;
					I.priceSort.reset();
					I.newSort.reset();
					if (J != I.newSort.st || K != I.priceSort.st) {
						I.setVal()
					}
				})
	};
	E.Sort.prototype.setVal = function() {
		var I = this;
		if (I.newSort.st <= 0 && I.priceSort.st <= 0) {
			I.val = {
				order : "rank",
				order_type : "asc"
			}
		} else {
			if (I.newSort.st > 0) {
				I.val.order = "kaipan_date";
				if (I.newSort.st <= 2) {
					I.val.order_type = "desc"
				} else {
					I.val.order_type = "asc"
				}
			} else {
				I.val.order = "price";
				if (I.priceSort.st <= 2) {
					I.val.order_type = "desc"
				} else {
					I.val.order_type = "asc"
				}
			}
		}
		I.trigger("change")
	};
	var B = '<li id="list_{% loupan_id %}"><a>';
	B += '<span id="spanlat_{% loupan_id %}" style="display:none;">{% lat %}</span>';
	B += '<span id="spanlng_{% loupan_id %}" style="display:none;">{% lng %}</span>';
	B += "<dl><dt><b>{% cutedTitle %}</b>{% vicon %}{% tplTuan %}";
	B += "</dt><dd> {% cutedAddress %}</dd>";
	B += "<dd>{% telsale %}</dd>";
	B += "<dd><p>{% build_type_0 %} {% fitment_type_0 %} </p></dd></dl>";
	if (""==gfzn) {
		B += "<strong>{% _price %}</strong></a></li>";
	} else {
		B += "</a></li>";
	}
	E.List = function(J) {
		F.inherit(this, E.List, F.Observer);
		var I = this;
		I.op = G.extend({}, {
					selectList : "#list",
					selectInAll : "#list_inall",
					tpl : B
				}, J || {});
		I.dom = G(I.op.selectList);
		I.inAll = G(I.op.selectInAll);
		I.da = [];
		I.bindEvent()
	}; 
	E.List.prototype.bindEvent = function() {
		var I = this;
		I.dom.on("mouseover", "li", function() {
					var J = G(this).prevAll().length;
					I.trigger("mouseover", I.da[J])
				});
		I.dom.on("mouseleave", "li", function() {
					var J = G(this).prevAll().length;
					I.trigger("mouseleave", I.da[J])
				})
	};
	E.List.prototype.update = function(K, J) {
		var I = this;
		I.da = I.da.concat(K);
		I.dom.append(I.draw(K));
		I.dom.show();
		I.inAll.html(J);
		I.trigger("update")
	};
	E.List.prototype.randerDa = function(K) {
		var N = {
			tplTuan : "",
			vicon : "",
			houseTypeInAll : "",
			telsale : "",
			lat:"",
			lng:"",
			build_type_0 : "",
			fitment_type_0 : "",
			metro_info_0 : "",
			_price : ""
		};
		var J = [];
		for (var L in K.tuangou) {
			if (K.tuangou.hasOwnProperty(L)) {
				N.tplTuan = '<i class="micon micon-t"></i>';
				break
			}
		}
		N.lat = K.baidu_lat;
		N.lng = K.baidu_lng;
		if (K.is_sales_market > 0) {
			N.vicon = '<i class="micon micon-v"></i>'
		}
		if (K.is_sales_promotion > 0) {
			N.vicon = '<i class="micon micon-vd"></i>'
		}
		var I = K.build_type.split(",");
		if (I[0]) {
			N.build_type_0 = I[0]
		}
		var O = K.fitment_type.split(",");
		if (O[0]) {
			N.fitment_type_0 = O[0]
		}
		var M = K.metro_info.split(",");
		if (M[0]) {
			N.metro_info_0 = M[0]
		}
		for (var L = 0; L < K.house_types.length && L < 2; L++) {
			J.push(K.house_types[L].room_alias
					+ parseInt(K.house_types[L].area) + "平米")
		}
		N.houseTypeInAll = J.join("，");
		N.telsale = K.phone_400_main;
		//N.lat = K.baidu_lat;
		//N.lng = K.baidu_lng;
		if (K.price == 0) {
			N._price = "售价待定";
		} else if(K.price.length>10){
			N._price = "<em>" + K.price.substring(0,10) + "...</em>";
		}else {
			N._price = "<em>" + K.price + "</em>";
		}
		N.cutedTitle = K.loupan_name.replace(/^(.{12}).+$/, "$1...");
		N.cutedAddress = K.address
				.replace(
						new RegExp("^(.{"
								+ (21 - K.region_title.length - K.sub_region_title.length)
								+ "}).+$"), "$1...");
		return G.extend({}, K, N)
	};
	E.List.prototype.draw = function(L) {
		var J = this;
		var M = [];
		for (var K = 0; K < L.length; K++) {
			var I = J.randerDa(L[K]);
			M.push(F.rander(J.op.tpl, I))
		}
		return M.join("")
	};
	E.List.prototype.clear = function() {
		var I = this;
		I.da = [];
		I.dom.html("");
		I.dom.hide();
		I.inAll.html("0");
		I.trigger("clear")
	};
	E.Loading = function(I) {
		F.inherit(this, E.Loading, F.Observer);
		var J = this;
		J.box = G(I);
		J.isloading = false;
		J.close(false)
	};
	E.Loading.prototype.open = function(J) {
		var I = this;
		if (J) {
			I.box.addClass("loading-mini")
		} else {
			I.box.removeClass("loading-mini")
		}
		I.isloading = true;
		I.box.show();
		I.trigger("open")
	};
	E.Loading.prototype.close = function(J) {
		var I = this;
		I.box.hide();
		I.isloading = false;
		if (!J) {
			I.trigger("close")
		}
	};
	var D = "<h3>没找到“<strong>{% keywords %}</strong>”这个地方</h3><dl><dt>建议您：</dt><dd>输入正确的楼盘名或者路名;</dd><dd>先选择区域，再缩放/拖动地图到目标位置;</dd>";
	var H = "<h3>地图范围内没有符合您要求的楼盘</h3><dl><dt>建议您：</dt><dd>调整筛选条件;</dd><dd>拖动地图更改位置;</dd></dl>";
	var C = '<h3>地图范围内没有符合您要求的楼盘</h3><p>可能是因为您的地图比例尺过大</p><dl><dt>建议您：<a href="javascript:;">缩放地图</a></dt></dl>';
	E.Error = function(I, K) {
		F.inherit(this, E.Error, F.Observer);
		var J = this;
		J.dom = G(I);
		J.op = G.extend({}, {
					tpl : [D, H, C]
				}, K || {});
		J.bindEvent()
	};
	E.Error.prototype.bindEvent = function() {
		var I = this;
		I.dom.hide();
		I.dom.on("click", "a", function() {
					I.trigger("zoom");
					return false
				})
	};
	E.Error.prototype.open = function(L, I) {
		var J = this;
		var K = F.rander(J.op.tpl[L], {
					keywords : I || ""
				});
		J.dom.html(K);
		J.dom.show();
		J.trigger("open")
	};
	E.Error.prototype.close = function() {
		var I = this;
		I.dom.hide();
		I.trigger("close")
	}
})(bmap.module, jQuery);
APF.Namespace.register("bmap.module");
APF.Namespace.register("bmap.ui");
(function(C, E) {
	var D = bmap.base, A = {};
	A.mark = '<div class="bmap-mark"><p>{% title %}</p><i></i></div>';
	A.area = '<div id="area_{% TypeId %}" class="bmap-area {% isnone %}"><p>{% name %}</p><p>{% totle %}个</p></div>';
	A.block = '<div id="block_{% TypeId %}" class="bmap-block {% isnone %}"><p>{% name %}</p><p>{% totle %}个</p></div>';
	A.point = '<div id="point_{% loupan_id %}" class="bmap-point {% classType %}"><span><strong><em>{% loupan_name %}</em></strong></span><i></i></div>';
	A.detail = '<div id="info_{% loupan_id %}" class="bmap-info"><a href="{% loupan_link %}" target="_blank"><h3>';
	A.detail += "<strong>{% cutedName %}</strong>";
	A.detail += "{% vicon %}";
	A.detail += "{% tuanIcon %}";
	A.detail += "{% statusIcon %}";
	A.detail += '</h3><div class="bmap-info-img">';
	A.detail += '<img alt="{% loupan_name %}" src="{% default_image %}" />';
	A.detail += "</div><dl>";
	A.detail += "<dd>{% _infoprice %}</dd>";
	A.detail += "<dd>地址： {% cutedAddress %}</dd>";
	A.detail += "<dd>电话： {% telsale %}</dd>";
	A.detail += "<dd><span>{% build_type_all %} {% fitment_type_all %}</span></dd>";
	A.detail += '</dl></a><b class="bmap-info-close"></b></div>';
	var B = function(G, H, I) {
		var F = this;
		F.op = E.extend({}, {
					tpl : "",
					offsetX : 0,
					offsetY : 0,
					dataInit : function(J) {
						return J
					},
					bindEvent : function() {
					}
				}, I || {});
		F.da = F.op.dataInit(G);
		F.type = H
	};
	B.prototype = new BMap.Overlay();
	B.prototype.initialize = function(G) {
		var F = this;
		F.center = F.da.point;
		var H = D.rander(F.op.tpl, F.da);
		F.map = G;
		F.mark = E(H);
		G.getPanes().markerPane.appendChild(F.mark[0]);
		F.op.bindEvent.apply(F);
		return F.mark[0]
	};
	B.prototype.draw = function() {
		var G = this;
		var F = G.map.pointToOverlayPixel(G.center);
		G.mark.css({
					left : F.x + G.op.offsetX + "px",
					top : F.y + G.op.offsetY + "px"
				})
	};
	C.Map = function(G) {
		D.inherit(this, C.Map, D.Observer);
		var F = this;
		F.op = E.extend({}, {
					city : "杭州",
					mapIdSelect : "bmap",
					delay : 200,
					defortZoom : 13,
					zoomPoint : 15,
					zoomArea : 11,
					zoomBlock : 14,
					maxZoom : 18,
					minZoom : 11
				}, G || {});
		F.val = {};
		F.searchLoupan;
		F.dom = E("#" + F.op.mapIdSelect);
		F.bmap = new BMap.Map(F.op.mapIdSelect, {
					enableMapClick : false
				});
		if (gfzn!="") {
			F.op.defortZoom = 12;
		}
		F.bmap.centerAndZoom(F.op.city, F.op.defortZoom);
		F.bmap.addControl(new BMap.NavigationControl());
		F.bmap.setMinZoom(F.op.minZoom);
		F.bmap.setMaxZoom(F.op.maxZoom);
		F.bmap.enableScrollWheelZoom();
		F.bmap.enableInertialDragging();
		F.delayGetData = new D.Delay(F.op.delay, function(H) {
					var l = F.bmap.getBounds();  
					var j = l.getNorthEast();
					var k = l.getSouthWest();
					if (j == null || k == null) {
						return
					}
					F.val.zoom = F.bmap.getZoom();
					F.val.swlat = k.lat;
					F.val.nelat = j.lat;
					F.val.swlng = k.lng;
					F.val.nelng = j.lng;
					F.trigger("change", [H])
				});
		F.bindEvent()
	};
	C.Map.prototype.bindEvent = function() {
		var F = this;
		F.bmap.addEventListener("zoomend", function() {
					F.clearByType("area");
					F.clearByType("block");
					F.clearByType("point");
					F.clearByType("detail");
					F.delayGetData.go("zoom")
				});
		F.bmap.addEventListener("moveend", function() {
					F.clearByType("area");
					F.clearByType("block");
					if (""==gfzn) {
						if(COMM_TIP == document.getElementById('keyword_apf_id_6').value ||
						document.getElementById('keyword_apf_id_6').value =="") {
							F.delayGetData.go("drag") 
						}
					}
				});
		F.bmap.addEventListener("dragstart", function() {
					F.clearByType("detail")
				});
		E("#map").on("click", ".BMap_stdMpPan", function() {
					F.clearByType("detail")
				});
		F.bmap.addEventListener("resize", function() {
					F.clearByType("area");
					F.clearByType("block");
					F.delayGetData.go("resize")
				})
	};
	C.Map.prototype.drawMap = function(G) {
		var F = this, I = [];
		if (gfzn=="") {
			if (F.val.zoom >= F.op.zoomPoint) {
				F.drawPoint(G.rows);
				return
			}
			for (var H in G.gather) {
				if (!G.gather.hasOwnProperty(H)) {
					continue
				}
				I.push(G.gather[H])
			}
			/*if (F.val.zoom == F.op.zoomBlock) {
				F.drawBlock(I, "block");
				return
			}*/
			if (F.val.zoom <= F.op.zoomArea) {
				F.drawBlock(I, "area");
				return
			}
		} else {
			F.drawPoint(G.rows);
			return
		}
	};
	C.Map.prototype.drawBlock = function(G, I) {
		var F = this;
		F.clearByType("area");
		F.clearByType("block");
		F.clearByType("point");
		for (var H = 0; H < G.length; H++) {
			G[H].point = new BMap.Point(G[H].baidu_lng, G[H].baidu_lat);
			F.addBlock(G[H], I)
		}
	};
	C.Map.prototype.drawPoint = function(G) {
		var F = this;
		var I = true;
		F.clearByType("point");
		F.clearByType("area");
		F.clearByType("block");
		for (var H = 0; H < G.length; H++) {
			var K = F.addPoint(G[H],H);
			var L = E(".bmap-info");
			var J;
			if (L.length > 0) {
				J = L.attr("id").replace("info_", "")
			}
			if (G[H].loupan_id == J) {
				I = false;
				K.mark.mouseenter().addClass("bmap-point-on")
			}
		}
		if (I) {
			F.clearByType("detail")
		}
	};
	C.Map.prototype.setCenterMark = function(F, I, H) {
		var G = this;
		G.bmap.setZoom(I);
		G.bmap.panTo(F);
		if (H) {
			G.addMark({
						tname : H,
						point : F
					})
		}
	};
	C.Map.prototype.resize = function(G) {
		var F = this;
		if (!G) {
			return
		}
		if (G.w) {
			F.dom.width(G.w)
		}
		if (G.h) {
			F.dom.height(G.h)
		}
	};
	C.Map.prototype.addMark = function(G) {
		var F = this;
		var H = new B(G, "mark", {
					tpl : A.mark,
					offsetX : -16,
					offsetY : -42,
					dataInit : function(I) {
						var J = {
							title : I.tname,
							point : I.point
						};
						return J
					}
				});
		F.bmap.addOverlay(H)
	};
	C.Map.prototype.addBlock = function(G, H) {
		var F = this;
		var I = new B(G, H, {
					tpl : A[H],
					offsetX : -32,
					offsetY : -32,
					dataInit : function(J) {
						var K = {
							isnone : "",
							name : J.TypeName,
							totle : parseInt(J.loupan_count),
							point : J.point
						};
						if (K.totle <= 0) {
							if (H == "area") {
								K.isnone = "bmap-area-none"
							}
							if (H == "block") {
								K.isnone = "bmap-block-none"
							}
						}
						return E.extend({}, J, K)
					},
					bindEvent : function() {
						var J = this;
						J.mark.hover(function() {
									J.mark
											.addClass("bmap-" + J.type
													+ "-hover")
								}, function() {
									J.mark.removeClass("bmap-" + J.type
											+ "-hover")
								});
						J.mark.click(function() {
									var K = (J.type == "area")
											? "areaClick"
											: "blockClick";
									F.trigger(K, [J.da])
								})
					}
				});
		F.bmap.addOverlay(I)
	};
	C.Map.prototype.addPoint = function(G,T) {
		var F = this;
		var H = new B(G, "point", {
			tpl : A.point,
			offsetX : -8,
			offsetY : -11,
			dataInit : function(I) {
				var J = {
					classType : "",
					point : new BMap.Point(I.baidu_lng, I.baidu_lat)
				};
				if (I.price == 0) {
					J._price = "待定"
				} else {
//					if (I.price > 10000) {
//						J._price = (I.price * 0.0001 + "").replace(
//								/(\.\d\d)(\d*)/, "$1").replace(/(\.[^0])0/,
//								"$1")
//								+ "万"
//					} else {
//						J._price = I.price
//					}
					J._price = I.price;
				}
				var K = {
					"3" : "",
					"4" : "",
					"6" : "",
					"7" : "bmap-point-sell",
					"5" : "bmap-point-sold"
				};
				if(T == 0 ) {
				//alert(I.baidu_lng);
				//C.map.bmap.setCenterMark(J.point, 16);
					//alert(F);
										//G.val.key=document.getElementById('keyword_apf_id_6').value;
					if (""==gfzn) {
					if(COMM_TIP != document.getElementById('keyword_apf_id_6').value && typeof(I.baidu_lng) != "undefined") {
						//F.bmap.centerAndZoom(new BMap.Point(I.baidu_lng, I.baidu_lat),17);;
						//F.bmap.clearByType("area");
						//F.bmap.clearByType("block");
						//F.bmap.clearByType("point");
						//F.bmap.clearByType("detail");
						KEY_COUNT++;
						//F.bmap.setZoom(17);
						F.bmap.panTo(new BMap.Point(I.baidu_lng, I.baidu_lat));
						//F.map.setCenterMark( new BMap.Point(I.baidu_lng, I.baidu_lat), 16);
					}
					} else {
						F.bmap.panTo(new BMap.Point(I.baidu_lng, I.baidu_lat));
					}
					//this.update();
				} 
				J.classType = K[I.status_sale];
				return E.extend({}, I, J)
			},
			bindEvent : function() {
				var I = this;
				I.mark.hover(function() {
					I.mark.addClass("bmap-point-hover");
					I.mark.find("em").html(I.da.loupan_name + "&nbsp;&nbsp;"+I.da._price);
					var K = parseInt(F.dom.width()), M = F.bmap
							.pointToPixel(I.da.point).x, J = parseInt(I.mark
							.children("span").outerWidth()), L = parseInt(I.mark
							.children("span").css("left"));
					if (M + J + L > K) {
						I.mark.children("span").addClass("pointright")
					}
					F.trigger("pointOn", [I.da.loupan_id])
				}, function() {
					if (I.mark.hasClass("bmap-point-on")) {
						return
					}
					I.mark.removeClass("bmap-point-hover").children("span")
							.removeClass("pointright");
					I.mark.find("em").html(I.da.loupan_name);
					F.trigger("pointOff", [I.da.loupan_id])
				});
				I.mark.click(function() {
							var K = E(".bmap-point-on");
							for (var L = 0; L < K.length; L++) {
								var J = K.eq(L).attr("id")
										.replace("point_", "");
								F.clearOnPoint(J)
							}
							I.mark.addClass("bmap-point-on");
							F.addDetail(I.da)
						});
				if (F.searchLoupan && F.searchLoupan == I.da.loupan_id) {
					I.mark.mouseenter();
					I.mark.click();
					F.searchLoupan = undefined
				}
			}
		});
		F.bmap.addOverlay(H);
		return H
	};
	C.Map.prototype.addDetail = function(G) {
		var F = this;
		F.clearByType("detail");
		var H = new B(G, "detail", {
			tpl : A.detail,
			offsetX : 0,
			offsetY : -195,
			topPadding : 30,
			rightPadding : 30,
			buttomPadding : 30,
			dataInit : function(J) {
				var K = {
					totle : parseInt(J.loupan_count),
					build_type_all : J.build_type.split(",").join("/"),
					fitment_type_all : J.fitment_type.split(",").join("/"),
					houseTypesAll : "",
					telsale : "",
					tuanIcon : "",
					vicon : "",
					lat:"",
					lng:"",
					statusIcon : "",
					_infoprice : ""
				};
				var M = [];
				for (var L = 0; L < J.house_types.length && L < 2; L++) {
					M.push(J.house_types[L].room_alias
									+ J.house_types[L].area.replace(/\.\d*$/,
											"") + "㎡")
				}
				K.houseTypesAll = M.join("；");
				K.lat = J.baidu_lat;
				K.lng = J.baidu_lng;
				K.telsale = J.phone_400_main;
				for (var L in J.tuangou) {
					if (J.tuangou.hasOwnProperty(L)) {
						K.tuanIcon = '<i class="micon micon-t"></i>';
						break
					}
				}
				if (J.is_sales_market > 0) {
					K.vicon = '<i class="micon micon-v"></i>'
				}
				if (J.is_sales_promotion > 0) {
					K.vicon = '<i class="micon micon-vd"></i>'
				}
				if (J.price == 0) {
					K._infoprice = "价格：待定"
				} else {
					K._infoprice = "<div style='float:left; width:230px;  display:inline;  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;-o-text-overflow:ellipsis;line-height: 24px;'>价格:<strong title='"+J.price+"'>" + J.price + "</strong></div>"
				}
				var I = {
					"3" : '<i class="micon micon-qifang"></i>',
					"4" : '<i class="micon micon-xianfang"></i>',
					"5" : '<i class="micon micon-shouqin"></i>',
					"6" : '<i class="micon micon-weipan"></i>',
					"7" : '<i class="micon micon-daishou"></i>'
				};
				if (I[J.status_sale]) {
					K.statusIcon = I[J.status_sale]
				}
				K.cutedName = J.loupan_name.replace(/^(.{12}).+$/, "$1...");
				K.cutedAddress = J.address
						.replace(
								new RegExp("^(.{"
										+ (12)
										+ "}).+$"), "$1...");
				return E.extend({}, J, K)
			},
			bindEvent : function() {
				var O = this;
				O.mark.hover(function() {
							O.mark.addClass("bmap-info-hover")
						}, function() {
							O.mark.removeClass("bmap-info-hover")
						});
				O.mark.children("b.bmap-info-close").click(function(R) {
							R.stopPropagation();
							F.bmap.removeOverlay(O);
							F.clearOnPoint(O.da.loupan_id)
						});
				var Q = parseInt(F.dom.width()), L = parseInt(F.dom.height()), M = F.bmap
						.pointToPixel(O.da.point), K = M.x, N = M.y, I = parseInt(O.mark
						.outerWidth()), J = parseInt(O.mark.outerHeight());
				var P = {
					right : 0,
					top : 0,
					bottom : 0
				};
				if (K + I + O.op.rightPadding > Q) {
					P.right = K + I + O.op.rightPadding - Q
				}
				if (N - J < O.op.topPadding) {
					P.top = O.op.topPadding - (N - J)
				}
				if (N + O.op.buttomPadding > L) {
					P.bottom = N + O.op.buttomPadding - L
				}
				if (P.right != 0 || P.top != 0) {
					F.bmap.panBy(0 - P.right, P.top - P.bottom)
				}
			}
		});
		F.bmap.addOverlay(H)
	};
	C.Map.prototype.clearOnPoint = function(I) {
		var F = this;
		var H = F.bmap.getOverlays();
		for (var G = 0; G < H.length; G++) {
			if (H[G].type == "point" && H[G].da.loupan_id == I) {
				H[G].mark.removeClass("bmap-point-on").mouseleave();
				break
			}
		}
	};
	C.Map.prototype.clearByType = function(I) {
		var F = this;
		var H = F.bmap.getOverlays();
		for (var G = 0; G < H.length; G++) {
			if (H[G].type == I) {
				F.bmap.removeOverlay(H[G])
			}
		}
		return
	}
})(bmap.module, jQuery);
APF.Utils.htmlspecialchars_decode = function(A) {
	A = A.replace(/&amp;/g, "&");
	A = A.replace(/&quot;/g, '"');
	A = A.replace(/&#039;/g, "'");
	A = A.replace(/&lt;/g, "<");
	A = A.replace(/&gt;/g, ">");
	return A
};
/*APF.Utils.get_sapan_base_url = function(A) {
	var B = "http://pic{{host_id}}.ajkimg.com/display/aifang";
	B = B.replace(/{{host_id}}/, A);
	return B
};*/
APF.Namespace.register("bmap.Map");
(function(C) {
	var D = bmap.module;
	var B = bmap.base;
	var A = function(I) {
		var J = [];
		var F = {};
		for (var H in I) {
			if (!I.hasOwnProperty(H)) {
				continue
			} else {
				J.push(I[H].region);
				F[H] = [];
				for (var G in I[H].sub_region) {
					if (!I.hasOwnProperty(H)) {
						continue
					} else {
						F[H].push(I[H].sub_region[G])
					}
				}
			}
		}
		return {
			region : J,
			sub_region : F
		}
	};
	var E = function(H) {
		var F = [];
		for (var G in H) {
			if (!H.hasOwnProperty(G)) {
				continue
			} else {
				F.push(H[G])
			}
		}
		return F
	};
	bmap.Map = function(F, J) {
		var G = this;
		G.op = C.extend({}, {
					searchAreaZoom : 14,
					searchBlockZoom : 15,
					navHeight : 40,
					pageSize : 20,
					selectSide : "#sider",
					selectMap : "#map",
					selectMapBox : "#bmap",
					selectDom : "#main",
					selectBtnSide : "#siderbtn",
					errAction : {
						position : 1,
						search : 0,
						sort : 1,
						filter : 1,
						zoom : 2,
						drag : 1,
						resize : 1
					},
					city : "杭州"
				}, J || {});
		var I = C(window).height() - G.op.navHeight;
		C(G.op.selectMapBox).height(I);
		G.soj_data = F.soj_data;
		G.kw_resource_url = F.kw_resource_url;
		G.resourceUrl = F.resource_url;
		G.regionData = F.region_list;
		G.domMain = C(G.op.selectDom);
		G.domMap = C(G.op.selectMap);
		G.domSide = C(G.op.selectSide);
		G.btnSide = C(G.op.selectBtnSide);
		G.search = new D.Search({
					url : F.kw_search_url
				});
		G.position = new D.Position(A(F.region_list));
		G.filter = new D.Filter({
					dataSale : F.sale_status,
					dataPrice : F.unitprice_list,
					dataType : E(F.property_types)
				});
		G.sort = new D.Sort("#sort li:eq(0)", "#sort li:eq(1)",
				"#sort li:eq(2)");
		G.loading = new D.Loading("#loading");
		G.err = new D.Error("#error");
		G.list = new D.List();
		G.map = new D.Map({
					city : G.op.city
				});
		G.val = {
			page : 1,
			page_size : G.op.pageSize,
			timestamp : 0
		};
		G.da = {};
		G.actions = [];
		var H = new B.Delay(300, function(L) {
			var _dd=true;
			//if(KEY_COUNT ==1){return}
					if (L) {
						G.val.page += 1
					} else {
						G.list.clear();
						G.err.close();
						G.val.page = 1
					}
					if (G.loading.isloading) {
						G.loading.close()
					}
					G.loading.open(L);
					var K = G.actions[G.actions.length];
					G.val = C.extend(G.val, G.map.val, G.filter.val, G.sort.val);
					if (G.val.zoom >= 15) {
						G.val.page_size = 500
					} else {
						G.val.page_size = G.op.pageSize
					}
					if (gfzn=="") {
						G.val.key=document.getElementById('keyword_apf_id_6').value;
						if(COMM_TIP == G.val.key) {
						
							G.val.key = "";
						} else {
							//G.onSearch(); 
							//_dd = true;
							if(KEY_COUNT ==0){
							
							G.map.bmap.setZoom(17);
							}
							
						} 
						G.val.key = encodeURIComponent(G.val.key);
					} else {
						//G.map.bmap.setZoom(15);
						G.val.gfzn = gfzn;
						G.val.bkid = bkid;
					}

					//请求数据
					{C.ajax({
								type : "post",
								// dataType : "jsonp",
								dataType : "json",
								url : G.resourceUrl,
								data : G.val,
								success : function(M) {
									G.refresh(M)
								}
							})
					}
				});
		G.update = function(K) {
			G.val.timestamp += 1;
			H.go(K)
		};
		G.bindEvent()
	};
	bmap.Map.prototype.bindEvent = function() {
		var F = this;
		F.position.on("change", function() {
					F.search.clear();
					if (F.position.val.sub_region != 0) {
						F.actions.push("position_sub_region")
					} else {
						if (F.position.val.region != 0) {
							F.actions.push("position_region")
						}
					}
					F.onPosition()
				});
		F.search.on("search", function() {
					F.position.reset();
					F.actions.push("search");
					F.onSearch()
				});
		F.search.on("clear", function() {
					F.map.clearByType("mark")
				});
		F.sort.on("change", function() {
					F.actions.push("sort");
					F.update()
				});
		F.filter.on("change", function() {
					F.actions.push("filter");
					F.update()
				});
		F.map.on("change", function(H) {//alert("ch");
					F.actions.push(H);
					F.update()
				});
		F.map.on("areaClick", function(H) {
					var J = F.position.da.region;
					for (var I = 0; I < J.length; I++) {
						if (H.TypeId == J[I].TypeId) {
							//J.area.setVal(I + 1, true);
							F.position.area.setVal(I + 1);
							//F.position.changeArea(J + 1, H + 1);
							break
						}
					}
				});
		F.map.on("blockClick", function(I) {
					var L = F.position.da.region;
					var K;
					for (var J = 0; J < L.length; J++) {
						if (I.ParentId == L[J].TypeId) {
							K = F.position.da.sub_region[L[J].TypeId];
							for (var H = 0; H < K.length; H++) {
								if (I.TypeId == K[H].TypeId) {
									F.position.changeArea(J + 1, H + 1);
									break
								}
							}
							break
						}
					}
				});
		C(window).resize(function() {
					var H = 490;
					F.domSide.height(H);
					if (gfzn=='') {
						F.domSide.find(".result").height(H - 38 - 84);
					} else {
						F.domSide.find(".result").height(H - 38);
					}
					F.domMain.height(H);
					F.domMap.height(H);
					F.map.resize({
								h : H
							});
					C("#siderbtn").show()
				});
		F.btnSide.hover(function() {
					var H = C(this);
					if (H.hasClass("siderbtn-on")) {
						H.addClass("siderbtn-on-hover")
					} else {
						H.addClass("siderbtn-hover")
					}
				}, function() {
					var H = C(this);
					H.removeClass("siderbtn-hover siderbtn-on-hover")
				});
		F.btnSide.click(function() {
					var H = C(this);
					if (H.hasClass("siderbtn-on")) {
						H.removeClass("siderbtn-on siderbtn-on-hover");
						F.domSide.show();
						if (gfzn=="") {
							F.domMap.css("margin-left", "368px")
						} else {
							F.domMap.css("margin-left", "268px")
						}
					} else {
						H.addClass("siderbtn-on siderbtn-on-hover");
						F.domSide.hide();
						F.domMap.css("margin-left", "0")
					}
				});
		C(window).resize();
		var G;
		F.domSide.find(".result").on("scroll", function() {
			var K = C(this), I = parseInt(K[0].scrollHeight), H = parseInt(K
					.outerHeight()), J = parseInt(K.scrollTop());
			if (I <= J + H && C("#list li").length > 0
					&& F.val.page_size == F.op.pageSize) {
				F.nextPage()
			}
			clearTimeout(G);
			G = setTimeout(function() {
						K.toggleClass("scrollFixie6")
					}, 10)
		});
		F.err.dom.on("click", "a", function() {
					F.map.bmap.setZoom(F.val.zoom - 1);
					
					return false
				});
		F.map.on("pointOn", function(H) {
					C("#list_" + H).addClass("on");
					//F.map.bmap.panTo(new BMap.Point(120.218389,30.214614));
				});
		F.map.on("pointOff", function(H) {
					C("#list_" + H).removeClass("on");
				});
		F.list.dom.on("mouseenter", "li", function() {
					var K = C(this);
					var J = K.attr("id").replace("list_", "");
					var I = K.children("a").data("region");
					var H = K.children("a").data("subregion");
					//var lat = document.getElementById('spanlat_'+J).innerHTML;
					//var lng = document.getElementById('spanlng_'+J).innerHTML;
					C("#point_" + J).mouseenter();
					C("#area_" + I).mouseenter();
					C("#block_" + H).mouseenter();
					//F.map.bmap.setZoom(17);
					//F.map.bmap.panTo(new BMap.Point(lng,lat));
				});
		F.list.dom.on("click", "li", function() {
			var K = C(this);
			var J = K.attr("id").replace("list_", "");
			var I = K.children("a").data("region");
			var H = K.children("a").data("subregion");
			var lat = document.getElementById('spanlat_'+J).innerHTML;
			var lng = document.getElementById('spanlng_'+J).innerHTML;
			C("#point_" + J).click();
			if (gfzn=='') {
				C("#area_" + I).mouseenter();
				C("#block_" + H).mouseenter();
			}
			F.map.bmap.setZoom(15);
			F.map.bmap.panTo(new BMap.Point(lng,lat));
		});
		F.list.dom.on("mouseleave", "li", function() {
					var K = C(this);
					var J = K.attr("id").replace("list_", "");
					var I = K.children("a").data("region");
					var H = K.children("a").data("subregion");
					C("#point_" + J).mouseleave();
					C("#area_" + I).mouseleave();
					C("#block_" + H).mouseleave()
				});
		F.list.dom.on("click", "li>a", function() {
					F.doSojCp("list")
				});
		F.map.dom.on("click", ".bmap-info a", function() {
					F.doSojCp("map")
				});
		F.map.dom.on("click", ".bmap-point", function() {
					F.doSojCp("marker")
				})
	};
	bmap.Map.prototype.doSojCp = function(J) {
		var F = this;
		var K;
		if (J) {
			var G = false;
			var I = false;
			for (var H = F.actions.length - 1; H >= 0; H--) {
				if (F.actions[H] == "search") {
					G = true;
					break
				} else {
					if (F.actions[H] == "position_sub_region"
							|| F.actions[H] == "position_region"
							|| F.actions[H] == "filter"
							|| F.actions[H] == "sort") {
						I = true;
						break
					}
				}
			}
			switch (J) {
				case "list" :
					if (G == true) {
						K = "{'from': 'zzhz_map_loupanlist_search'}"
					} else {
						if (I == true) {
							K = "{'from': 'zzhz_map_loupanlist_filtersearch'}"
						} else {
							K = "{'from': 'zzhz_map_loupanlist'}"
						}
					}
					break;
				case "map" :
					if (G == true) {
						K = "{'from': 'zzhz_map_loupanmarker_search'}"
					} else {
						if (I == true) {
							K = "{'from': 'zzhz_map_loupanmarker_filtersearch'}"
						} else {
							K = "{'from': 'zzhz_map_loupanmarker'}"
						}
					}
					break;
				case "marker" :
					K = "{'from': 'zzhz_marker'}";
					break
			}
			F.sendSoj(K)
		}
	};
	bmap.Map.prototype.nextPage = function() {
		var F = this;
		F.update(true);
		F.domSide.find(".result").scrollTop(99999)
	};
	bmap.Map.prototype.onSearch = function(mKeyword) {
		var H = this, M = mKeyword, F = 0, J;
		//H.map.clearByType("mark");
		//H.err.close();
		if (J) {
			var K = new BMap.Point(J.baidu_lng, J.baidu_lat);
			H.map.setCenterMark(K, H.op.searchAreaZoom, M);
			return
		}
		if (J) {
			var K = new BMap.Point(J.baidu_lng, J.baidu_lat);
			H.map.setCenterMark(K, H.op.searchBlockZoom, M);
			return
		}

		debugger

		C.ajax({
					url : H.kw_resource_url + M,
					dataType : "json",
					success : function(O) {
						if (O.t == 1) {
							var P = new BMap.Point(O.v.lng, O.v.lat);
							H.map.setCenterMark(P, 16);
							H.map.searchLoupan = O.v.lpID;
							return
						}
						if (O.t == 2) {
							var P = new BMap.Point(O.v.lng, O.v.lat);
							H.map.setCenterMark(P, H.op.searchBlockZoom, M);
							return
						}
						var N = H.bSearch = new BMap.LocalSearch(H.map.bmap, {
									onSearchComplete : function(Q) {
										if (Q.ri && Q.ri[0]) {
											H.map.setCenterMark(Q.ri[0].point,
													H.op.searchBlockZoom,
													Q.ri[0].title)
										} else {
											H.list.clear();
											H.err.open(0, M)
										}
									}
								});
						N.search(M)
					},
					error : function() {
						bmap.map.setZoom(17);
						//H.list.clear();
						//H.err.open(0, M)
					}
				})
	};
	bmap.Map.prototype.onPosition = function() {
		var F = this, I = F.position.val, G;
		F.map.clearByType("mark");
		if (I.sub_region != 0) {
			G = F.regionData[I.region].sub_region[I.sub_region];
			var H = new BMap.Point(G.baidu_lng, G.baidu_lat);
			//F.map.setCenterMark(H, F.op.searchBlockZoom, G.TypeName);
			//F.update();
			return
		}
		if (I.region != 0) {
			G = F.regionData[I.region].region;
			var H = new BMap.Point(G.baidu_lng, G.baidu_lat);
			// 地图区域移动，直接到达楼盘
			F.map.setCenterMark(H, F.op.searchBlockZoom, G.TypeName);
			F.update();
			return
		}
	};
	bmap.Map.prototype.refresh = function(H) {
		var F = this;
		//if (H.result.timestamp < F.val.timestamp) {
		//	return
		//}
		F.map.clearByType("point");
		F.loading.close();
		if (H.result.total && H.result.total > 0) {
			if (F.val.page <= 1) {
				F.list.clear();
				F.map.drawMap(H.result)
			}
			F.list.update(H.result.rows, H.result.total)
		} else {
			var G = F.actions[F.actions.length - 1];
			var I = F.op.errAction[G];
			if (F.val.page <= 1) {
				F.err.open(I);
				F.map.drawMap(H.result)
			}
		}
	};
	bmap.Map.prototype.sendSoj = function(I) {
		
		var F = this;
		try {
			var G = new SiteTracker("zzhz");
			G.setPage(F.soj_data.p);
			G.setPageName(F.soj_data.pn);
			G.setReferer(document.referrer);
			G.setNGuid("aQQ_zzhzguid");
			G.setCustomParam(I);
			G.track()
		} catch (H) {
		}
	}
})(jQuery);
