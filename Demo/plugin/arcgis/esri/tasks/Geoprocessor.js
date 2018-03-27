// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define("dojo/_base/lang dojo/Deferred dojo/io-query ../request ../geometry/support/normalizeUtils ../geometry/SpatialReference ../layers/MapImageLayer ../layers/support/MapImage ./Task ./support/DataFile ./support/Date ./support/FeatureSet ./support/GPMessage ./support/JobInfo ./support/LinearUnit ./support/ParameterValue ./support/RasterData".split(" "),function(g,q,r,h,l,m,t,u,v,w,x,y,z,n,A,B,C){return v.createSubclass({declaredClass:"esri.tasks.Geoprocessor",constructor:function(){this._updateTimers=
[];this._handleExecuteResponse=this._handleExecuteResponse.bind(this);this._handleGetResultImageResponse=this._handleGetResultImageResponse.bind(this);this._handleGetResultDataResponse=this._handleGetResultDataResponse.bind(this)},properties:{outSpatialReference:{value:null,type:m},processSpatialReference:{value:null,type:m},updateDelay:{value:1E3,type:Number},url:{}},cancelJob:function(a,c){var b={query:g.mixin({},this.parsedUrl.query,{f:"json"}),callbackParamName:"callback"};if(this.requestOptions||
c)b=g.mixin({},this.requestOptions,c,b);return h(this.parsedUrl.path+"/jobs/"+a+"/cancel",b).then(function(a){return a.data})},cancelJobStatusUpdates:function(a){clearTimeout(this._updateTimers[a]);this._updateTimers[a]=null},checkJobStatus:function(a,c){var b={query:g.mixin({},this.parsedUrl.query,{f:"json"}),callbackParamName:"callback"};if(this.requestOptions||c)b=g.mixin({},this.requestOptions,c,b);return h(this.parsedUrl.path+"/jobs/"+a,b).then(this._handleCheckJobStatusResponse)},getResultImage:function(a,
c,b,e){b={query:this._gpEncode(g.mixin({},this.parsedUrl.query,{f:"json"},b.toJSON())),callbackParamName:"callback"};if(this.requestOptions||e)b=g.mixin({},this.requestOptions,e,b);return h(this.parsedUrl.path+"/jobs/"+a+"/results/"+c,b).then(this._handleGetResultImageResponse)},getResultData:function(a,c,b){var e={query:g.mixin({},this.parsedUrl.query,{f:"json",returnType:"data"}),callbackParamName:"callback"};if(this.requestOptions||b)e=g.mixin({},this.requestOptions,b,e);return h(this.parsedUrl.path+
"/jobs/"+a+"/results/"+c,e).then(this._handleGetResultDataResponse)},getResultMapImageLayer:function(a){var c=this.parsedUrl,b;b=c.path.indexOf("/GPServer/");a=c.path.substring(0,b)+"/MapServer/jobs/"+a;c.query&&(a+="?"+r.objectToQuery(c.query));return new t(a)},execute:function(a,c){var b={},e={},d=[];this._collectGeometries(a,d,b);return l.normalizeCentralMeridian(d).then(function(d){for(var k in b){var f=this.outSpatialReference,p=b[k];e[k]=d.slice(p[0],p[1])}d={query:this._gpEncode(g.mixin({},
this.parsedUrl.query,{f:"json","env:outSR":f?f.wkid||JSON.stringify(f.toJSON()):null,"env:processSR":this.processSpatialReference?this.processSpatialReference.wkid||JSON.stringify(this.processSpatialReference.toJSON()):null},a),null,e),callbackParamName:"callback"};if(this.requestOptions||c)d=g.mixin({},this.requestOptions,c,d);return h(this.parsedUrl.path+"/execute",d)}.bind(this)).then(this._handleExecuteResponse)},submitJob:function(a,c){var b={},e={},d=[],f=new q;this._collectGeometries(a,d,b);
l.normalizeCentralMeridian(d).then(function(d){for(var f in b){var k=this.outSpatialReference,l=b[f];e[f]=d.slice(l[0],l[1])}d={query:this._gpEncode(g.mixin({},this.parsedUrl.query,{f:"json","env:outSR":k?k.wkid||JSON.stringify(k.toJSON()):null,"env:processSR":this.processSpatialReference?this.processSpatialReference.wkid||JSON.stringify(this.processSpatialReference.toJSON()):null},a),null,e),callbackParamName:"callback"};if(this.requestOptions||c)d=g.mixin({},this.requestOptions,c,d);return h(this.parsedUrl.path+
"/submitJob",d)}.bind(this)).then(function(a){this._jobUpdateHandler(a.data,f)}.bind(this)).then(null,function(a){f.reject(a)});return f.promise},_collectGeometries:function(a,c,b){for(var e in a){var d=a[e];if("object"===typeof d&&null!=d){var f;Array.isArray(d)&&d.length?(f=d[0]&&d[0].declaredClass)&&-1<f.indexOf("Graphic")?(b[e]=[c.length,c.length+d.length],d.forEach(function(a){c.push(a.geometry)})):f&&-1<f.indexOf("esri.geometry.")&&(b[e]=[c.length,c.length+d.length],d.forEach(function(a){c.push(a)})):
(f=d.declaredClass)&&-1<f.indexOf("FeatureSet")&&(d=d.features,b[e]=[c.length,c.length+d.length],d.forEach(function(a){c.push(a.geometry)}))}}},_gpEncode:function(a,c,b){for(var e in a){var d=a[e];g.isArray(d)?a[e]=JSON.stringify(d.map(function(a){return this._gpEncode({item:a},!0).item},this)):d instanceof Date&&(a[e]=d.getTime())}return this._encode(a,c,b)},_decode:function(a){var c=a.dataType,b=B.fromJSON(a);if(-1!==["GPBoolean","GPDouble","GPLong","GPString"].indexOf(c))return b;if("GPLinearUnit"===
c)b.value=A.fromJSON(b.value);else if("GPFeatureRecordSetLayer"===c||"GPRecordSet"===c)b.value=y.fromJSON(b.value);else if("GPDataFile"===c)b.value=w.fromJSON(b.value);else if("GPDate"===c)a=b.value,g.isString(a)?b.value=x.fromJSON({date:a}):b.value=Date.fromJSON(a);else if("GPRasterData"===c||"GPRasterDataLayer"===c)a=a.value.mapImage,b.value=a?u.fromJSON(a):C.fromJSON(b.value);else if(-1!==c.indexOf("GPMultiValue:")){var e=c.split(":")[1];a=b.value;b.value=a.map(function(a){return this._decode({paramName:"_name",
dataType:e,value:a}).value},this)}else console.log(this.declaredClass+" : GP Data type not handled. : "+b.dataType),b=null;return b},_jobUpdateHandler:function(a,c){var b=a.jobId;a=n.fromJSON(a);var e,d;clearTimeout(this._updateTimers[b]);this._updateTimers[b]=null;c.progress(a);switch(a.jobStatus){case "job-submitted":case "job-executing":case "job-waiting":case "job-new":e=this._getJobStatus.bind(this);d=this._jobUpdateHandler.bind(this);this._updateTimers[b]=setTimeout(function(){e(b).then(function(a){d(a,
c)})},this.updateDelay);break;default:c.resolve(a)}},_getJobStatus:function(a){return h(this.parsedUrl.path+"/jobs/"+a,{query:g.mixin({},this.parsedUrl.query,{f:"json"}),callbackParamName:"callback"}).then(function(a){return a.data})},_handleGetResultDataResponse:function(a){return this._decode(a.data)},_handleCheckJobStatusResponse:function(a){return n.fromJSON(a.data)},_handleExecuteResponse:function(a){a=a.data;var c=a.messages||[];return{results:(a.results||[]).map(this._decode,this),messages:c.map(z.fromJSON)}},
_handleGetResultImageResponse:function(a){return this._decode(a.data)}})});