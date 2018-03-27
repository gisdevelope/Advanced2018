// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/views/3d/environment/materials/StarMaterial.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\r\n\r\n\x3csnippets\x3e\r\n\r\n\x3csnippet name\x3d"vertexShaderStar"\x3e\x3c![CDATA[\r\n  $vsprecisionf\r\n\r\n\tuniform mat4 proj;\r\n\tuniform mat4 view;\r\n\tuniform mat4 model;\r\n\tuniform vec4 viewport;\r\n\r\n\tattribute vec3 $position;\r\n\tattribute vec4 $color;\r\n  attribute float $size;\r\n\r\n\tvarying vec4 vcolor;\r\n\tvarying float vsize;\r\n\r\n\t$alignToPixelCenter\r\n\r\n\tvoid main(void) {\r\n\t\tvec4 posProj \x3d proj * view * model*vec4($position*1.0e25,1.0);//move infinitely far away\r\n\t\tgl_Position \x3d alignToPixelCenter(posProj, viewport.zw); //pixel align position\r\n    gl_Position.z \x3d gl_Position.w; // project atmosphere onto the far plane\r\n\t\tvcolor \x3d $color/1.2;\r\n\t\tvsize \x3d size*5.0;\r\n\t\tgl_PointSize \x3d vsize;\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fragmentShaderStar"\x3e\x3c![CDATA[\r\n\t$fsprecisionf\r\n\r\n\tvarying vec4 vcolor;\r\n\tvarying float vsize;\r\n\r\n\tvoid main() {\r\n\t\tfloat cap \x3d 0.7;\r\n\t\tfloat scale \x3d 1.0/cap;\r\n\t\tfloat helper \x3d clamp(length(abs(gl_PointCoord-vec2(0.5))),0.0,cap);\r\n\t\tfloat alpha \x3d clamp((cap-helper)*scale,0.0,1.0);\r\n\t\tfloat intensity \x3d alpha*alpha*alpha;\r\n\t\tif (vsize \x3c 3.0)\r\n\t\t\tintensity *\x3d 0.5;\r\n\t\tgl_FragColor \x3d vec4(1.0,1.0,1.0,intensity);\r\n\t\tgl_FragColor.xyz *\x3d vcolor.xyz;\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\x3c/snippets\x3e\r\n'}});
define("dojo/text!./materials/StarMaterial.xml require ../../../request ../../../core/watchUtils ../../../core/promiseUtils ../lib/glMatrix ../support/ExternalRenderer ../webgl-engine/lib/GeometryRenderer ../webgl-engine/lib/Util ../webgl-engine/materials/internal/MaterialUtil ../webgl-engine/lib/RenderPass ../webgl-engine/lib/RenderSlot ../../webgl/Program ../webgl-engine/lib/DefaultVertexAttributeLocations ../../webgl/Util".split(" "),function(v,w,x,y,z,f,A,B,C,D,E,t,F,G,q){var e=f.mat4d;f=f.mat3d;
var g=C.VertexAttrConstants,H="9bb2ff;9eb5ff;aabfff;bbccff;ccd8ff ;dae2ff;e4e9ff;eeefff;f8f6ff;fff9fb;fff5ef;fff1e5;ffeddb;ffe9d2;ffe6ca;ffe3c3;ffe0bb;ffddb4;ffdaad;ffd6a5;ffd29c;ffcc8f;ffc178;ffa94b;ff7b00".split(";"),I=f.toMat4(f.createFrom(1,0,0,0,.9174771405229186,.39778850739794974,0,-.39778850739794974,.9174771405229186)),J=f.toMat4(f.createFrom(1,0,0,0,.9174771405229186,-.39778850739794974,0,.39778850739794974,.9174771405229186)),r=null;return A.createSubclass({properties:{view:{},numBinaryFloats:{value:2},
numBinaryUInt8:{value:1},bytesPerStar:{value:9},needsRender:{value:!1},slot:{value:t.BACKGROUND,set:function(a){this.needsRender=!0;this._set("slot",a)}}},constructor:function(){this._renderData={model:e.identity()};this.slot=t.BACKGROUND;this._vertexBufferLayout=[{name:"position",count:3,type:5126,offset:0,stride:20,normalized:!1},{name:"color",count:4,type:5121,offset:12,stride:20,normalized:!1},{name:"size",count:1,type:5126,offset:16,stride:20,normalized:!1}]},initialize:function(){this._loadDataPromise=
this._loadBrightStarCatalogue();this.addResolvingPromise(this._loadDataPromise)},destroy:function(){this._loadDataPromise.isFulfilled()||this._loadDataPromise.cancel("Atmosphere has been removed.");this._dateHandle&&(this._dateHandle.remove(),this._dateHandle=null);this._program&&(this._program.dispose(),this._program=null)},setup:function(a){this._numStars=this._starData.byteLength/this.bytesPerStar;var b=new Float32Array(this._starData,0,this._numStars*this.numBinaryFloats),c=new Uint8Array(this._starData,
this._numStars*this.numBinaryFloats*4,this._numStars*this.numBinaryUInt8),b=this._createStarGeometryData(b,c);this._renderer=new B(b,this._vertexBufferLayout,this._fillInterleaved,a.rctx);this._renderer.enablePointRendering(!0);this._dateHandle=y.init(this,"view.environment.lighting.date",this._update.bind(this));a.shaderSnippets.vertexShaderStar||a.shaderSnippets._parse(v);this._program=new F(a.rctx,a.shaderSnippets.vertexShaderStar,a.shaderSnippets.fragmentShaderStar,G.Default3D)},render:function(a){if(a.slot!==
this.slot||a.pass!==E.MATERIAL)return!1;var b=this.renderContext.rctx,c=b.gl,d=this._program;b.bindProgram(d);d.setUniformMatrix4fv("view",a.camera.viewMatrix);d.setUniformMatrix4fv("proj",a.camera.projectionMatrix);d.setUniform4fv("viewport",a.camera.fullViewport);d.setUniformMatrix4fv("model",this._renderData.model);b.setDepthFunction(c.LEQUAL);b.setBlendingEnabled(!0);b.setBlendFunctionSeparate(c.SRC_ALPHA,c.ONE_MINUS_SRC_ALPHA,c.ONE,c.ONE_MINUS_SRC_ALPHA);b.setDepthWriteEnabled(!1);this._renderer.render(d);
b.setBlendingEnabled(!1);b.setDepthWriteEnabled(!0);b.setDepthFunction(c.LESS);return!0},_fillInterleaved:function(a,b,c,d,f,h,k){var l=q.getStride(f);c=l/4;var u=D.fill,p=a.faces.indices[g.POSITION],n=a.vertexAttr[g.POSITION].data;d=k+q.findAttribute(f,"position").offset/4;for(var m=0;m<p.length;++m){var e=3*p[m];u(n,e,h,d,b,3);d+=c}b=a.faces.indices[g.COLOR];p=a.vertexAttr[g.COLOR].data;d=k+q.findAttribute(f,"color").offset;n=new Uint8Array(h.buffer);for(m=0;m<b.length;++m)e=4*b[m],u(p,e,n,d,null,
4),d+=l;l=a.faces.indices[g.SIZE];a=a.vertexAttr[g.SIZE].data;d=k+q.findAttribute(f,"size").offset/4;for(m=0;m<l.length;++m)h[d]=a[l[m]],d+=c},_computeDayDuration:function(a){var b=new Date(a.getFullYear(),0,1,11,58,56),c=new Date(a.getFullYear()+1,0,1,11,58,55);return(a-b)/(c-b)},_update:function(a){if(a){var b=a.getHours()/12,c=a.getMinutes()/60*(2/24),d=a.getSeconds()/60*(2/1440),b=(b+c+d-.9972222)%2;a=2*this._computeDayDuration(a);c=e.create(J);e.rotateZ(c,-a*Math.PI);e.multiply(I,c,c);e.rotateZ(c,
-b*Math.PI);this._renderData.model=c;this.needsRender=!0}},_hexToRGB:function(a){return[parseInt(a.substring(0,2),16),parseInt(a.substring(2,4),16),parseInt(a.substring(4,6),16)]},_unpackUint8Attributes:function(a){return 192<=a?[2.9,a-192]:160<=a?[2.5,a-160]:128<=a?[2,a-128]:96<=a?[1.5,a-96]:64<=a?[1,a-64]:32<=a?[.7,a-32]:[.4,a]},_createStarGeometryData:function(a,b){for(var c=new Float32Array(3*this._numStars),d=new Uint8Array(4*this._numStars),f=new Float32Array(this._numStars),h=new Uint32Array(this._numStars),
k=0;k<this._numStars;k++){var l=2*k,e=3*k,p=4*k,n=a[l+0],l=a[l+1];c[e+0]=-Math.cos(n)*Math.sin(l);c[e+1]=-Math.sin(n)*Math.sin(l);c[e+2]=-Math.cos(l);e=this._unpackUint8Attributes(b[k]);n=this._hexToRGB(H[e[1]]);d[p+0]=255*n[0];d[p+1]=255*n[1];d[p+2]=255*n[2];d[p+3]=255;f[k]=e[0];h[k]=k}a={};a[g.POSITION]=h;a[g.NORMAL]=h;a[g.UV0]=h;a[g.COLOR]=h;a[g.SIZE]=h;h={};h[g.POSITION]={size:3,data:c};h[g.COLOR]={size:4,data:d};h[g.SIZE]={size:1,data:f};return{faces:{type:"point",indices:a,positionKey:g.POSITION},
vertexAttr:h}},_loadBrightStarCatalogue:function(){return r?(this._starData=r,z.resolve()):x(w.toUrl("./resources/stars.wsv"),{responseType:"array-buffer",failOk:!0}).then(function(a){if(a=a.data)this._starData=r=a;else throw Error("no data received");}.bind(this)).otherwise(function(a){console.error("Failed to load star data:",a);throw a;})}})});