// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define("require exports dojo/has ../../../core/libs/gl-matrix/mat4 ../../../core/libs/gl-matrix/vec4 ../../../core/libs/gl-matrix/vec3 ../../webgl/Program ../../webgl/VertexArrayObject ../GeometryUtils ./vtShaderSnippets".split(" "),function(F,G,A,l,m,q,B,C,D,n){var E=1/65536;return function(){function a(){this._attributeLocations={a_pos:0,a_vertexOffset:1,a_tex:2,a_levelInfo:3};this._initialized=!1;this._extrudeMat=l.create();this._haloColor=m.create();this._sdfColor=m.create();this._scaleVec=q.create()}
a.prototype.dispose=function(){this._sdfProgram&&(this._sdfProgram.dispose(),this._sdfProgram=null)};a.prototype.render=function(e,h,d,r,a,t,f,u,v,m,n,q){var b=this;if(!A("esri-vector-tiles-avoid-text")){this._initialized||this._initialize(e);var x=f.getLayoutValue("text-size",d),p=x/24;r=D.degToByte(r);var k=f.getLayoutValue("text-rotation-alignment",d);1===k&&(1!==f.getLayoutValue("symbol-placement",d)||f.hasLayoutProperty("text-rotation-alignment")||(k=0));var y=0===k,k=f.getLayoutValue("text-keep-upright",
d)&&y,z=.1*24/x/n,w=q*f.getPaintValue("text-opacity",d);this._glyphTextureSize||(this._glyphTextureSize=new Float32Array([u.width/4,u.height/4]));y?l.copy(this._extrudeMat,v):l.copy(this._extrudeMat,m);this._scaleVec[0]=p;this._scaleVec[1]=p;this._scaleVec[2]=1;l.scale(this._extrudeMat,this._extrudeMat,this._scaleVec);e.bindProgram(this._sdfProgram);if(v=this._getSDFVAO(e,t))e.bindVAO(v),this._sdfProgram.setUniformMatrix4fv("u_transformMatrix",t.tileTransform.transform),this._sdfProgram.setUniformMatrix4fv("u_extrudeMatrix",
this._extrudeMat),this._sdfProgram.setUniform2fv("u_normalized_origin",t.tileTransform.displayCoord),this._sdfProgram.setUniform1f("u_depth",f.z+E),this._sdfProgram.setUniform2fv("u_mosaicSize",this._glyphTextureSize),this._sdfProgram.setUniform1f("u_mapRotation",r),this._sdfProgram.setUniform1f("u_keepUpright",k?1:0),this._sdfProgram.setUniform1f("u_level",10*d),this._sdfProgram.setUniform1f("u_fadeSpeed",10*a.fadeSpeed),this._sdfProgram.setUniform1f("u_minfadeLevel",10*a.minfadeLevel),this._sdfProgram.setUniform1f("u_maxfadeLevel",
10*a.maxfadeLevel),this._sdfProgram.setUniform1f("u_fadeChange",10*(d+a.fadeChange)),this._sdfProgram.setUniform1f("u_opacity",w),this._sdfProgram.setUniform1i("u_texture",0),h.glyphPerPageElementsMap.forEach(function(a,c){u.bind(e,9729,c,0);c=f.getPaintValue("text-halo-color",d);if(0<c[3]){var g=c[3]*w;b._haloColor[0]=g*c[0];b._haloColor[1]=g*c[1];b._haloColor[2]=g*c[2];b._haloColor[3]=g;c=z+f.getPaintValue("text-halo-blur",d)/p/8;g=.75-f.getPaintValue("text-halo-width",d)/p/8;b._sdfProgram.setUniform4fv("u_color",
b._haloColor);b._sdfProgram.setUniform1f("u_edgeDistance",g);b._sdfProgram.setUniform1f("u_edgeWidth",c);e.drawElements(4,a[1],5125,12*a[0])}c=f.getPaintValue("text-color",d);0<c[3]&&(g=c[3]*w,b._sdfColor[0]=g*c[0],b._sdfColor[1]=g*c[1],b._sdfColor[2]=g*c[2],b._sdfColor[3]=g,b._sdfProgram.setUniform4fv("u_color",b._sdfColor),b._sdfProgram.setUniform1f("u_edgeDistance",.75),b._sdfProgram.setUniform1f("u_edgeWidth",z),e.drawElements(4,a[1],5125,12*a[0]))}),e.bindVAO()}};a.prototype._initialize=function(a){if(this._initialized)return!0;
this._sdfProgram=new B(a,n.sdfShaderVS,n.sdfShaderFS,this._attributeLocations);this._sdfVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:16,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:16,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}]};return this._initialized=!0};a.prototype._getSDFVAO=function(a,
h){if(h.textVertexArrayObject)return h.textVertexArrayObject;var d=h.textVertexBuffer,e=h.textIndexBuffer;if(!d||!e)return null;h.textVertexArrayObject=new C(a,this._attributeLocations,this._sdfVertexAttributes,{geometry:d},e);return h.textVertexArrayObject};return a}()});