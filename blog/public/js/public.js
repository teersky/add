;
(function(doc, win, undefined) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(clientWidth === undefined) return;
			docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
		};
	if(doc.addEventListener === undefined) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);
function charts(obj,y,m,d,second,datas) {
	$(function() {
		$(obj).highcharts({
			chart: {
				type: 'spline',
				backgroundColor: 'rgba(0,0,0,0)'
			},
			xAxis: {
				type: 'datetime',
				labels: {
					overflow: 'justify'
				}
			},
			yAxis: {
				min: 0,
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,
				
			},
			tooltip: {
				valueSuffix: ' °C'
			},
			plotOptions: {
				spline: {
					lineWidth: 4,
					states: {
						hover: {
							lineWidth: 5
						}
					},
					marker: {
						enabled: false
					},
					pointInterval: second, // one hour
					pointStart: Date.UTC(y, m, d, 0, 0, 0)
				}
			},
			series: datas,
			navigation: {
				menuItemStyle: {
					fontSize: '15px'
				}
			}
		});
	});
}
function charts2(obj, y, m, d, second, datas) {
	$(function() {
		$(obj).highcharts({
			chart: {
				type: 'spline',
				backgroundColor: 'rgba(0,0,0,0)'
			},
			xAxis: {
				type: 'datetime',
				labels: {
					enabled: false
				},
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,
			},
			yAxis: {
				labels: {
					enabled: false
				},
				min: 0,
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,

			},
			tooltip: {
				valueSuffix: ' °C'
			},
			plotOptions: {
				spline: {
					lineWidth: 4,
					states: {
						hover: {
							lineWidth: 5
						}
					},
					marker: {
						enabled: false
					},
					pointInterval: second, // one hour
					pointStart: Date.UTC(y, m, d, 0, 0, 0)
				}
			},
			series: datas,
			navigation: {
				menuItemStyle: {
					fontSize: '15px'
				}
			}
		});
	});
}

function bars(obj, y, m, d, second, datas) {
	$(function() {
		$(obj).highcharts({
			chart: {
				type: 'column',
				backgroundColor: 'rgba(0,0,0,0)'
			},

			xAxis: {
				type: 'datetime',
				labels: {
					enabled: false
				},
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,
			},
			yAxis: {
				labels: {
					enabled: false
				},
				min: 0,
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null,

			},
			tooltip: {
		        headerFormat: '<span style="font-size:10px"></span><table>',
		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		        footerFormat: '</table>',
		        shared: true,
		        useHTML: true
			},
			plotOptions: {
				column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
			},
			series: datas,
			navigation: {
				menuItemStyle: {
					fontSize: '15px'
				}
			}
		});
	});
}