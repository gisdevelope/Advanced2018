// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define("require exports ./TilingScheme ./TerrainConst ../../../core/Error ../support/aaBoundingRect ../lib/glMatrix".split(" "),function(x,k,q,r,p,n,v){function l(a,b,d,c){f.set(d,m);m[c]=b[c];c=f.subtract(m,b);var e=f.subtract(a,b,w),e=f.dot(e,c),t=f.dot(c,c);b=0>=e?b:t<=e?d:f.add(b,f.scale(c,e/t),m);a=f.subtract(a,b,m);return Math.PI/2-Math.atan(a[2]/Math.sqrt(a[0]*a[0]+a[1]*a[1]))}function u(a,b){var d=a.getElevationBounds();a=a.extent;d=.5*(d[0]+d[1]);h[0]=a[0];h[1]=a[1];h[2]=d;g[0]=a[2];g[1]=
a[3];g[2]=d;a=d=Infinity;b[0]<h[0]?d=l(b,h,g,0):b[0]>g[0]&&(d=l(b,g,h,0));b[1]<h[1]?a=l(b,h,g,1):b[1]>g[1]&&(a=l(b,g,h,1));return Math.min(d,a)}Object.defineProperty(k,"__esModule",{value:!0});var f=v.vec3d,m=f.create(),w=f.create(),h=f.create(),g=f.create();k.autoUpdateSkirtsVisibility=function(a,b){var d,c=!0,e=a.extent,f=n.containsPoint(e,b);f?d=a.getElevation(b):(d=a.getElevationBounds(),d=.5*(d[0]+d[1]));d>b[2]?c=!1:f||(n.containsPointWithMargin(e,b,a.hideSkirtsDistanceFromExtentMargin*Math.min(e[2]-
e[0],e[3]-e[1]))?u(a,b)>a.hideSkirtsMinimumCameraTilt&&(c=!1):c=!1);c!==a.skirts&&(a.skirts=c)};k.tiltOnEdge=l;k.tiltToExtentEdge=u;k.checkIfTileInfoSupportedForViewSR=function(a,b,d){if(a.spatialReference.isGeographic)return new p("tilingscheme:local-gcs-not-supported","Geographic coordinate systems are not supported in local scenes");var c=q.checkUnsupported(a);if(c)return c;var e=a.lods,c=e[0].resolution*Math.pow(2,e[0].level),f=[c*a.size[0],c*a.size[1]],h=[a.origin.x,a.origin.y];b=n.fromExtent(b);
var g=n.create();q.computeRowColExtent(b,f,h,g);f=(g[2]-g[0])*(g[3]-g[1]);f>r.MAX_ROOT_TILES?(e=e[0].scale*Math.pow(2,e[0].level),c=Math.max((b[3]-b[1])/a.size[1],(b[2]-b[0])/a.size[0])*e/c,b=Math.floor(Math.log(c)/Math.log(10)),c=Math.ceil(c/Math.pow(10,b))*Math.pow(10,b),c=new p("tilingscheme:too-many-root-tiles","Scale of level 0 of the tiling scheme (1:"+Math.floor(e).toLocaleString()+") is too large for the layer's extent. Suggested scale: 1:"+c.toLocaleString()+".",{level0Scale:e,suggestedLevel0Scale:c,
requiredNumRootTiles:f,allowedNumRootTiles:r.MAX_ROOT_TILES})):c=null;return c?c:d&&!a.spatialReference.equals(d)?new p("tilingscheme:spatial-reference-mismatch","The tiling scheme does not match the spatial reference of the local scene"):null}});