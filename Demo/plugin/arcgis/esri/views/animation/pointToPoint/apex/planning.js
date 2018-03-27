// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define(["require","exports","./functions"],function(y,l,c){function n(b,c){var a=Math.max(b.compared.sourceZoom,b.compared.targetZoom);b=b.source.zoomAtPixelsPerPan(b.desiredPixelFlow/b.compared.pan)/2;return b<a?null!=c.maximumDistance?a+(c.maximumDistance-a)/2:1.5*a:c.maximumDistance?Math.min(c.maximumDistance,b):b}Object.defineProperty(l,"__esModule",{value:!0});l.optimalDistance=function(b,d){var a=n(b,d),e={ascensionFactor:null!=d.ascensionFactor?d.ascensionFactor:.5,descensionFactor:null!=d.descensionFactor?
d.descensionFactor:.5},f=0===e.ascensionFactor,h=0===e.descensionFactor,l=f?c.tAscensionZoomOnly:c.tAscensionZoomPan,p=f?c.dtAscensionZoomOnly:c.dtAscensionZoomPan,q=f?c.ddtAscensionZoomOnly:c.ddtAscensionZoomPan,r=h?c.tDescensionZoomOnly:c.tDescensionZoomPan,t=h?c.dtDescensionZoomOnly:c.dtDescensionZoomPan,u=h?c.ddtDescensionZoomOnly:c.ddtDescensionZoomPan,f=function(a){return l(b,e,a)+c.tPanion(b,e,a)+r(b,e,a)},h=function(a){return p(b,e,a)+c.dtPanion(b,e,a)+t(b,e,a)},v=function(a){return q(b,e,
a)+c.ddtPanion(b,e,a)+u(b,e,a)},k=f(a),w=c.tBaseLine(b),x=d.maximumIterations||20,m=null!=d.maximumDistance?d.maximumDistance:Infinity;for(d=0;d<x;d++){var g=(h(a)+1E-6)/v(a);if(isNaN(g)||a>=m&&0>g){if(!isFinite(m))return null;a=m;k=f(a);break}a-=g;if(a<b.compared.sourceZoom||a<b.compared.targetZoom)return null;g=f(a);if(.005>=Math.abs(g-k)/k)break;k=g}return k>.7*w?null:a<b.compared.sourceZoom||a<b.compared.targetZoom?null:a}});