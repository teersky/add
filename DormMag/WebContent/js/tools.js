var tools = {
	"StrToJson": function(str) {
		/*
		 * 瀛楃涓茶浆鎹㈡垚json鐨勫嚱鏁般�
		 * str鎸囪杞崲鐨勫瓧绗︿覆
		 */
		if(typeof(str) == "string") {
			var json = (new Function("return " + str))();
			if(typeof(json) == "string") {
				return JSON.parse(json);

			}
			if(typeof(json) == "object") {
				return json;
			}
		} else if(typeof(str) == "object") {
			return str;
		}
	},
	"random": function(n, m) {
		/*
		 * 闅忔満鍑芥暟锛堟暣鏁板瀷int锛�
		 * n鎸囪捣濮嬫暟瀛�
		 * m鎸囩粨鏉熸暟瀛�
		 */
		return parseInt((m - n) * Math.random() + n);
	},
	'move': function(obj, json, options) {
		/*
		 * 杩愬姩鍑芥暟
		 * obj鎸囪杩愬姩鐨勫璞�
		 * json鍐呴儴鍙傛暟涓鸿杩愬姩鐨勫睘鐩革紙闀裤�瀹姐�浣嶇疆銆侀�鏄庡害绛夌瓑锛�
		 * options鏄痡son锛屾湁涓や釜鍙傛暟锛屼竴涓槸duration锛屽嵆杩愬姩鏃堕棿锛宔asing涓鸿繍鍔ㄦ晥鏋滐紙linear銆乪ase-in銆乪ase-out锛�
		 * */
		options = options || {};
		options.duration = options.duration || 800;
		options.easing = options.easing || 'ease-out';
		var start = {};
		var dis = {};
		for(var name in json) {
			if(name == 'opacity') {
				start[name] = parseFloat(this.getStyle(obj, name));
			} else {
				start[name] = parseInt(this.getStyle(obj, name));
			}

			dis[name] = json[name] - start[name];
		}

		var count = parseInt(options.duration / (1000 / 60));
		var n = 0;

		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			n++;
			for(var name in json) {
				switch(options.easing) {
					case 'linear':
						var cur = start[name] + dis[name] * n / count;
						break;
					case 'ease-in':
						var a = n / count;
						var cur = start[name] + dis[name] * a * a * a;
						break;
					case 'ease-out':
						var a = 1 - n / count;
						var cur = start[name] + dis[name] * (1 - a * a * a);
						break;
					default:
						var a = 1 - n / count;
						var cur = start[name] + dis[name] * (1 - a * a * a);
						break;
				}

				if(name == 'opacity') {
					obj.style[name] = cur;
					obj.style.filter = 'alpha(opacity=' + cur * 100 + ')';
				} else {
					obj.style[name] = cur + 'px';
				}
			}

			if(n == count) {
				clearInterval(obj.timer);
				options.complete && options.complete();
			}
		}, 1000 / 60);
	},
	'getStyle': function(obj, name) {
		/*
		 * 鑾峰彇闈炶闂存牱寮忓嚱鏁�
		 * obj浠ｈ〃瑕佽幏鍙栫殑鍏冪礌
		 * name琛ㄧず瑕佽幏鍙栫殑闈炶闂存牱寮忓悕绉�
		 * */
		return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, false)[name];
	},
	'carouselFigure': function(id, nextButton, prveButton, width) {
		/*
		 * 婊氬姩鍥撅紝鍥剧墖妯悜婊氬姩
		 * id琛ㄧず鐩涜鏀剧疆鍥剧墖li鐨剈l鐨勭洅瀛�
		 * nextButton鍗崇偣鍑讳笅涓�紶锛宲rveButton鐐瑰嚮涓婁竴寮狅紝width鍗虫瘡娆＄偣鍑荤Щ鍔ㄧ殑瀹藉害
		 * */
		var list = document.querySelector(id);
		var tab = document.querySelector(id + " ul");
		var prveButton = document.querySelector(prveButton);
		var nextButton = document.querySelector(nextButton);
		var ali = document.querySelectorAll(id + " ul li");
		var listWid = list.offsetWidth;
		var lenNum = Math.floor(listWid / width);
		var liLen = ali.length;
		var COUNT = 0;
		var that = this;
		prveButton.onclick = function() {

			COUNT--;
			if(COUNT < 0) {
				COUNT = 0;
			}
			figure(COUNT)
		}
		nextButton.onclick = function() {
			COUNT++;
			if(COUNT > liLen - lenNum) {
				COUNT = liLen - lenNum;
			}
			figure(COUNT)
		}

		function figure(count) {
			that.move(tab, {
				left: -count * width
			}, {
				puration: "3000"
			})
		}
	},

	"round": function(v, e) {
		/*
		 * 鍥涜垗浜斿叆鍑芥暟
		 * v琛ㄧず瑕佸鐞嗙殑鏁版嵁锛宔琛ㄧず绮剧‘鐨勪綅鏁�
		 * */
		var t = 1;
		for(; e > 0; t *= 10, e--);
		for(; e < 0; t /= 10, e++);
		return Math.round(v * t) / t;
	},

	"slipStrip": function(bigBox, hkBox, hk, textBox, text) {
		/*
		 * 鑷畾涔夋粴鍔ㄦ潯
		 * bigBox鍗崇洓鏀捐婊氬姩鍐呭鐨勭洅瀛愶紙鏈塷verflow锛夛紝hkBox鏄洓鏀炬粦鍧楃殑鐩掑瓙锛宧k鏄粦鍧�
		 * textBox鏄洓鏀惧唴瀹圭殑鐩掑瓙锛屼竴鑸彲涓巄igBox閲嶅锛宼ext鍗宠婊氬姩鐨勫叿浣撳唴瀹�
		 * */
		var oCon = document.querySelector(bigBox);
		var oBox = document.querySelector(hkBox);
		var oBar = document.querySelector(hk);
		var oDiv1 = document.querySelector(textBox);
		var oSlidBar = document.querySelector(text);
		var times1 = null;
		var times2 = null;
		var i = 0;
		oBar.style.top = 0 + 'px';
		oBar.onmousedown = function(ev) {
			var oEvent = ev || event;
			var disY = oEvent.clientY - oBar.offsetTop;

			document.onmousemove = function(ev) {
				var oEvent = ev || event;
				var t = oEvent.clientY - disY;
				setTop(t);
			};

			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
			};

			return false;
		};

		if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
			oCon.addEventListener('DOMMouseScroll', function(ev) {
				var oEvent = ev || event;
				var t = oBar.offsetTop;
				if(oEvent.detail > 0) {
					t += 10;
				} else {
					t -= 10;
				}
				setTop(t);

				oEvent.preventDefault && oEvent.preventDefault();
				return false;
			}, false);
		} else {
			oCon.onmousewheel = function(ev) {
				var oEvent = ev || event;
				var t = oBar.offsetTop;
				if(oEvent.wheelDelta > 0) {
					t -= 10;
				} else {
					t += 10;
				}
				setTop(t);
				return false;
			};
		}
		oCon.onmouseleave = function() {
			oBar.style.opacity = 0;
			clearInterval(times1);
			times2 = setInterval(function() {
				i -= 0.1;
				if(i <= 0) {
					clearInterval(times2);
				}
				oBar.style.opacity = i;
			}, 1000 / 60)
		}
		oCon.onmouseenter = function() {
			clearInterval(times2);
			times1 = setInterval(function() {
				i += 0.1;
				if(i >= 1) {
					clearInterval(times1);
				}
				oBar.style.opacity = i;
			}, 1000 / 60)

		}

		function setTop(t) {

			if(t < 0) {
				t = 0;
			} else if(t > oBox.offsetHeight - oBar.offsetHeight) {
				t = oBox.offsetHeight - oBar.offsetHeight;
			}

			oBar.style.top = t + 'px';
			var scale = t / (oBox.offsetHeight - oBar.offsetHeight);
			console.log(oSlidBar.offsetHeight - oDiv1.offsetHeight);
			oSlidBar.style.top = -(oSlidBar.offsetHeight - oDiv1.offsetHeight) * scale + 'px';
		}

	},
	"eventDelegation": function(ul) {
		/*
		 * 浜嬩欢濮旀墭妯℃澘 
		 * */
		var oUl = document.querySelector(ul);
		var ali = oUl.getElementsByTagName("li");
		oUl.onclick = function(ev) {
			var ev = ev || event;
			var target = ev.target || ev.srcElement;
			if(target.nodeName.toLowerCase() == "li") {
				console.log(target);
			}
		}
	},

	"ajax": function(obj) {
		/*
		 * 鍙傛暟锛�url(鑾峰彇鏁版嵁鍦板潃)/text(鑾峰彇鏁版嵁绫诲瀷 get/post)/data(浼犲叆鍚庡彴鐨勫弬鏁�/async(鍚屾false/寮傛true)/
		 */
		var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		var async = obj.async || true;
		var type = type || "get"
		var method = type.toLowerCase();
		obj.url = obj.url + '?rand=' + Math.random();
		obj.data = this.params(obj.data);
		if(method === 'get') {
			obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
		}
		if(async === true) {
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					alert(123);
					callback();
				}
			};
		}
		xhr.open(method, obj.url, async);
		if(method === 'post') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(obj.data);
		} else {
			xhr.send(null);
		}
		if(async === false) {
			callback();
		}

		function callback() {
			if(xhr.status == 200) {
				obj.success(xhr.responseText);
			} else {
				alert('鑾峰彇鏁版嵁閿欒锛侀敊璇唬鍙凤細' + xhr.status + '锛岄敊璇俊鎭細' + xhr.statusText);
			}
		}
	},

	"params": function(data) {
		/*
		 * 鍚嶅�瀵硅浆鎹负瀛楃涓�
		 * */
		var arr = [];
		for(var i in data) {
			//鐗规畩瀛楃浼犲弬浜х敓鐨勯棶棰樺彲浠ヤ娇鐢╡ncodeURIComponent()杩涜缂栫爜澶勭悊
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
		}
		return arr.join('&');
	},

	"drag": function(box) {
		//閿洏鎺у埗瀵硅薄绉诲姩
		var obj = document.querySelector(box);
		document.onkeydown = function(evt) {
			var e = evt || window.event;
			switch(e.keyCode) {
				case 37:
					var left = obj.offsetLeft - 10;
					if(left < 0) {
						left = 0;
					}
					obj.style.left = left + "px";
					break;
				case 38:
					var top = obj.offsetTop - 10;
					if(top < 0) {
						top = 0;
					}
					obj.style.top = top + "px";
					break;
				case 39:
					var left = obj.offsetLeft + 10;
					if(left > document.documentElement.clientWidth - obj.offsetWidth) {
						left = document.documentElement.clientWidth - obj.offsetWidth;
					}
					obj.style.left = left + "px";
					break;
				case 40:
					var top = obj.offsetTop + 10;
					if(top > document.documentElement.clientHeight - obj.offsetHeight) {
						top = document.documentElement.clientHeight - obj.offsetHeight;
					}
					obj.style.top = top + "px";
			}
		};

		//榧犳爣鎷栨嫿
		obj.onmousedown = function(evt) {
			var e = evt || window.event;
			var disX = e.offsetX;
			var disY = e.offsetY;
			document.onmousemove = function(evt) {
				var e = evt || window.event;
				var X = e.clientX - disX;
				var Y = e.clientY - disY;

				if(X < 0) {
					X = 0;
				} else if(X > document.documentElement.clientWidth - obj.offsetWidth) { //椤甸潰鐨勫彲瑙嗗搴�- 瀵硅薄鐨勭浉瀵瑰搴�
					X = document.documentElement.clientWidth - obj.offsetWidth;
				}

				if(Y < 0) {
					Y = 0;
				} else if(Y > document.documentElement.clientHeight - obj.offsetHeight) { //椤甸潰鐨勫彲瑙嗛珮搴�- 瀵硅薄鐨勭浉瀵归珮搴�
					Y = document.documentElement.clientHeight - obj.offsetHeight;
				}
				obj.style.left = X + "px";
				obj.style.top = Y + "px";
			};
			document.onmouseup = function() {
				document.onmousemove = null;
			};
		};
	},
	"goPage": function(obj,footObj,pno, psize) {
		var itable = document.querySelector(obj);
		var num = itable.children.length; //鍐呭鎵�湁琛屾暟(鎵�湁璁板綍鏁�
		console.log(num);
		var totalPage = 0; //鎬婚〉鏁�
		var pageSize = psize; //姣忛〉鏄剧ず琛屾暟
		//鎬诲叡鍒嗗嚑椤�
		if(num / pageSize > parseInt(num / pageSize)) {
			totalPage = parseInt(num / pageSize) + 1;
		} else {
			totalPage = parseInt(num / pageSize);
		}
		var currentPage = pno; //褰撳墠椤垫暟
		var startRow = (currentPage - 1) * pageSize + 1; //寮�鏄剧ず鐨勮  31 
		var endRow = currentPage * pageSize; //缁撴潫鏄剧ず鐨勮   40
		endRow = (endRow > num) ? num : endRow;
		40
		console.log(endRow);
		//閬嶅巻鏄剧ず鏁版嵁瀹炵幇鍒嗛〉
		for(var i = 1; i < (num + 1); i++) {
			var irow = itable.rows[i - 1];
			if(i >= startRow && i <= endRow) {
				irow.style.display = "block";
			} else {
				irow.style.display = "none";
			}
		}
		var pageEnd = document.getElementById("pageEnd");
		// var tempStr = "鍏�+num+"鏉¤褰�鍒�+totalPage+"椤�褰撳墠绗�+currentPage+"椤�;
		var tempStr = "";
		if(currentPage > 1) {
			tempStr += "<a href=\"#\" onClick=\"goPage(" + (1) + "," + psize + ")\">棣栭〉</a>";
			tempStr += "<a href=\"#\" onClick=\"goPage(" + (currentPage - 1) + "," + psize + ")\"><涓婁竴椤�/a>"
		} else {
			tempStr += "棣栭〉";
			tempStr += "<涓婁竴椤�";
		}

		if(currentPage < totalPage) {
			tempStr += "<a href=\"#\" onClick=\"goPage(" + (currentPage + 1) + "," + psize + ")\">涓嬩竴椤�</a>";
			tempStr += "<a href=\"#\" onClick=\"goPage(" + (totalPage) + "," + psize + ")\">灏鹃〉</a>";
		} else {
			tempStr += "涓嬩竴椤�";
			tempStr += "灏鹃〉";
		}
		document.querySelector(footObj).innerHTML = tempStr;
	},

	"GetUrl": function(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}

}