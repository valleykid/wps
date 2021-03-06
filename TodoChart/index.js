(function(root, iCat){
	iCat = root.ICAT || {};
	var Model = iCat.util.getModel({
		asyncfunc: function(fn){
			var that = this,
				api = that.get('api') || {},
				argus = that.get('ajaxargus'),
				chartConfig = that.get('chartConfig') || {};
			if(api.getChartsUrl){
				that.getData(api.getChartsUrl, argus, function(data){
					if(data.success && fn){
						var d = iCat.mixin(chartConfig, {series:data.result});
						fn({chartData:d});
					}
				});
			}
		}
	});
	var View = iCat.util.getView({
		widgetName: 'TodoChart',
		model: Model, //from model.js
		el: '.J_widgetWrap',
		tpl: '<widget class=\"TodoChart-wrap\"><!--Define the macro--> <define name=\"chartShow\"> <div class=\"box-wrap\"> <div class=\"box-head\"> <h3 class=\"title\">待办统计</h3> <div class=\"options\"> <div class=\"tools\"> <span class=\"set\"><i class=\"fa fa-cog\"></i></span> <span class=\"refresh\"><i class=\"fa fa-refresh\"></i></span> <span class=\"next\"><i class=\"fa fa-chevron-right\"></i></span> </div> </div> </div> <div class=\"box-body\"> <div class=\"chart-wrap J_chartShow\"></div> </div> </div> </define> <!--backbone template--> <%if(o.displayType==1){%> <%if(o.__toolRender__){%> <span class=\"J_handleBtn\"><!-- data-toggle=\"modal\" data-target=\"#myModal\"--> <i title=\"<%-o.btnText%>\" class=\"fa <%-o.cla? o.cla : \'fa-bookmark\'%>\"></i> <!--<b title=\"<%-o.btnText%>\">click me...</b>--> </span> <%}else{%> <div class=\"modal fade\" id=\"<%-o.modalId || \'myModal\'%>\" role=\"dialog\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button> <h4 class=\"modal-title\" id=\"myModalLabel\">Modal title</h4> </div> <div class=\"modal-body\"> <div lazy-load-wrap=\"chartShow\"><%-o.micro.chartShow()%></div> </div> </div> </div> </div> <%}%> <%}else if(o.displayType==2){%> <%if(o.__toolRender__){%> <span class=\"J_handleBtn\"> <b title=\"<%-o.btnText%>\">click me...</b> </span> <%}else{%> <%-o.micro.chartShow()%> <%}%> <%}else{%> <%-o.micro.chartShow()%> <%}%></widget>', //This is fixed, don't modify!
		style: '1^2^9^2^95^2^79^56^3^1^22^40^1^5^22^13^109^16^31^0^25^76^0^1^0^21^91^28^31^4^74^13^3^3^30^1^28^25^83^23^11^21^41^3^77^80^25^20^14^64^89^92^79^13^9^87^71^1^8^8^11^0^13^69^61^11^0^22^3^15^12^19^29^65^89^17^14^29^86^69^15^10^66^91^22^30^13^21^89^69^11^11^28^84^40^2^12^5^18^4^75^10^8^5^2^81^94^87^74^14^90^14^13^6^18^12^27^11^17^23^36^93^78^87^15^14^29^6^95^86^6^4^30^12^78^31^14^2^86^23^28^7^8^16^13^15^37^92^14^14^5^3^92^89^76^11^16^13^16^18^83^18^6^9^24^75^45^4^13^11^39^17^33^21^25^76^30^30^79^19^79^67^20^4^21^72^77^4^0^28^76^75^27^4^17^73^12^28^33^3^77^9^90^23^72^12^1^25^91^24^4^31^95^76^80^94^28^29^66^7^0^10^1^84^40^2^4^6^1^24^20^80^93^29^14^80^25^0^66^2^76^5^2^1^28^5^29^94^85^77^48^31^86^3^6^30^74^6^29^64^20^4^25^17^85^27^91^31^3^9^16^15^73^85^20^1^96^68^91^80^80^10^74^81^18^26^31^15^10^0^78^88^53^3^8^10^58^3^8^22^16^84^55^21^12^17^73^66^76^12^23^64^1^25^12^21^26^88^3^3^20^72^17^14^8^0^68^87^47^23^25^8^6^2^93^24^31^2^5^2^25^12^85^24^91^13^14^22^22^7^28^16^1^66^50^14^10^9^29^86^30^19^23^86^2^4^29^95^10^77^9^9^5^2^17^31^83^85^84^73^101^26^26^8^13^11^75^23^65^57^25^15^2^38^82^23^19^24^65^18^11^10^25^68^74^27^47^31^64^22^27^13^94^67^65^15^25^19^64^13^95^23^5^76^66^10^9^31^0^11^10^10^96^73^25^14^6^0^93^24^0^27^19^25^11^9^85^1^91^4^5^1^29^14^7^95^6^22^50^3^8^19^68^0^75^5^27^87^5^4^1^12^94^86^80^28^20^69^90^13^15^2^95^17^37^14^10^9^29^86^28^81^31^21^77^6^12^23^93^31^15^86^89^21^1^75^88^84^20^1^96^87^77^81^20^27^71^7^8^8^2^69^57^10^94^25^34^4^13^23^13^70^30^22^5^9^96^73^15^14^17^65^89^17^14^29^86^69^15^10^66^91^9^9^13^1^89^69^6^20^16^16^47^9^30^65^71^24^65^12^3^30^86^24^29^4^84^13^7^0^3^4^13^81^5^1^2^13^123^10^12^19^14^5^64^89^93^29^14^75^93^69^10^86^80^92^28^29^66^8^28^22^23^22^50^93^29^14^0^2^90^6^29^86^41^15^4^22^74^26^0^21^86^12^23^7^0^10^1^4^55^14^9^6^12^24^0^55^0^9^25^40^5^4^72^2^76^27^30^4^9^75^71^6^11^1^109^16^31^0^25^76^0^1^0^21^91^9^2^1^67^86^79^15^4^4^11^31^68^19^22^24^48^28^29^0^13^8^71^13^8^87^71^94^29^29^26^71^83^28^20^24^89', //This is fixed, don't modify!
		events: {
		},
		setPlugins: function(data){
			$('.J_chartShow').highcharts(data.chartData);
		},

		widgetShow: function(){
			var model = this.model,
				md = model.get('MergeData');
			$('#'+(md.modalId || 'myModal')).modal('show');
			this.refresh();
		}
	});
	// Export the widget object for `Node.js` or `seajs/requirejs`
	if(typeof exports!=='undefined'){
		if(typeof module!=='undefined' && module.exports){
			exports = module.exports = View;
		}
		exports['TodoChart'] = View;
	}
	else {
		iCat.widget('TodoChart', function(){ return View; });
	}

	if(typeof define==='function'){
		if(define.amd){
			define('TodoChart', [], function(){ return iCat.widget['TodoChart']; });
		}
		else if(define.cmd) {
			define(function(require, exports, module){ module.exports = iCat.widget['TodoChart']; });
		}
	}
})(this);