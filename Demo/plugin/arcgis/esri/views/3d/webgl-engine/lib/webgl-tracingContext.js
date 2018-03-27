// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define([],function(){return{makeTracingContext:function(c){var d={},f=null,g=null,h=null,k=0,e=function(a,b){var d=a+"Original";c[d]=c[a];c[a]=function(){var a=c[d].apply(c,arguments);b(a,arguments);return a}};e("createTexture",function(a,b){void 0!==a&&null!==a&&(a._traceObjId=k++,d[a._traceObjId]={type:"texture",ref:a})});e("deleteTexture",function(a,b){void 0!==b[0]._traceObjId&&delete d[b[0]._traceObjId]});e("bindTexture",function(a,b){null!==b[1]&&(f=b[1]._traceObjId)});var l=function(a){switch(a){case c.ALPHA:return 1;
case c.RGB:return 3;case c.LUMINANCE:return 1;case c.LUMINANCE_ALPHA:return 2}return 4};e("texImage2D",function(a,b,c){null!==f&&(b[5]instanceof HTMLImageElement&&null!==f?(a=b[5],d[f].calcSize=a.width*a.height*l(c)):b[5]instanceof HTMLCanvasElement&&null!==f?(a=b[5],d[f].calcSize=a.width*a.height*l(c)):9<=b.length?d[f].calcSize=b[3]*b[4]*l(b[2]):console.log("texMem tracing: overload not yet implemented!"))});e("generateMipmap",function(a,b){null!==f&&(d[f].isMipmapped=!0)});e("createRenderbuffer",
function(a,b){void 0!==a&&null!==a&&(a._traceObjId=k++,d[a._traceObjId]={type:"renderBuffer",ref:a})});e("bindRenderbuffer",function(a,b){null!==b[1]&&(g=b[1]._traceObjId)});e("renderbufferStorage",function(a,b){null!==g&&(d[g].calcSize=b[2]*b[3]*2)});e("deleteRenderbuffer",function(a,b){void 0!==b[0]._traceObjId&&delete d[b[0]._traceObjId]});e("createBuffer",function(a,b){void 0!==a&&null!==a&&(a._traceObjId=k++,d[a._traceObjId]={type:"VBO",ref:a})});e("bindBuffer",function(a,b){null!==b[1]&&(h=
b[1]._traceObjId)});e("bufferData",function(a,b){null!==h&&(d[h].calcSize=c.getBufferParameter(c.ARRAY_BUFFER,c.BUFFER_SIZE))});e("deleteBuffer",function(a,b){void 0!==b[0]._traceObjId&&delete d[b[0]._traceObjId]});var m=function(a){var b=0,c;for(c in d)d[c].type===a&&void 0!==d[c].calcSize&&(b+=d[c].calcSize,d[c].isMipmapped&&(b+=.3333*d[c].calcSize));return b/1E6};c.getUsedTextureMemory=function(){return m("texture")};c.getUsedTextureMemoryStats=function(){var a={},b;for(b in d)if("texture"===d[b].type){var c=
d[b].ref._debugTracingType||"untagged",e=0;void 0!==d[b].calcSize&&(e=d[b].calcSize,d[b].isMipmapped&&(e+=.3333*d[b].calcSize));a[c]=void 0===a[c]?e/1E6:a[c]+e/1E6}return a};c.getUsedRenderbufferMemory=function(){return m("renderBuffer")};c.getUsedVBOMemory=function(){return m("VBO")};c._isTracingEnabled=!0;return c}}});