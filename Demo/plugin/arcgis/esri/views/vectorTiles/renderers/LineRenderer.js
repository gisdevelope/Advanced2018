// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/libs/gl-matrix/mat4 ../../../core/libs/gl-matrix/vec4 ../../../core/libs/gl-matrix/vec3 ../../../core/libs/gl-matrix/vec2 ../../webgl/Program ../../webgl/VertexArrayObject ../GeometryUtils ./vtShaderSnippets".split(" "),function(C,D,u,z,A,w,x,B,y,h){return function(){function l(){this._triangleAttributeLocations={a_pos:0,a_offsetAndNormal:1,a_accumulatedDistance:2};this._initialized=!1;this._viewProjMat=u.create();this._offsetVector=A.create();this._screenSize=
w.create();this._color=z.create();this._dashArray=w.create()}l.prototype.dispose=function(){this._triangleslProgram&&(this._triangleslProgram.dispose(),this._triangleslProgram=null);this._patternLineProgram&&(this._patternLineProgram.dispose(),this._patternLineProgram=null)};l.prototype.render=function(b,d,a,e,n,f,p,l,h,v){if(0!==d.triangleElementCount){this._initialized||this._initialize(b);var q=n.tileTransform.transform,r=n.coordRange/512,c=f.getPaintValue("line-translate",a);if(0!==c[0]||0!==
c[1]){u.copy(this._viewProjMat,n.tileTransform.transform);var q=c[0],c=c[1],m=0,g=0,g=(1<<n.key.level)/Math.pow(2,a)*r,m=e.rotation;if(1===f.getPaintValue("line-translate-anchor",a)){e=Math.sin(y.C_DEG_TO_RAD*-m);var k=Math.cos(y.C_DEG_TO_RAD*-m),m=g*(q*k-c*e),g=g*(q*e+c*k)}else m=g*q,g*=c;this._offsetVector[0]=m;this._offsetVector[1]=g;this._offsetVector[2]=0;u.translate(this._viewProjMat,this._viewProjMat,this._offsetVector);q=this._viewProjMat}e=f.getPaintValue("line-pattern",a);m=void 0!==e;c=
1/h;h=f.getPaintValue("line-blur",a)+c;g=f.getPaintValue("line-width",a);c=.5*(g+c);v*=f.getPaintValue("line-opacity",a);var k=f.getPaintValue("line-color",a),t=k[3]*v;this._color[0]=t*k[0];this._color[1]=t*k[1];this._color[2]=t*k[2];this._color[3]=t;if(k=this._getTrianglesVAO(b,n)){b.bindVAO(k);if(m){if(a=p.getMosaicItemPosition(e,!0))p.bind(b,9729,a.page,1),b.bindProgram(this._patternLineProgram),this._patternLineProgram.setUniformMatrix4fv("u_transformMatrix",q),this._patternLineProgram.setUniformMatrix4fv("u_extrudeMatrix",
l),this._patternLineProgram.setUniform2fv("u_normalized_origin",n.tileTransform.displayCoord),this._patternLineProgram.setUniform1f("u_depth",f.z),this._patternLineProgram.setUniform1f("u_lineHalfWidth",c),this._patternLineProgram.setUniform1f("u_blur",h),this._patternLineProgram.setUniform1f("u_opacity",v),this._patternLineProgram.setUniform2f("u_pattern_tl",a.tl[0],a.tl[1]),this._patternLineProgram.setUniform2f("u_pattern_br",a.br[0],a.br[1]),this._patternLineProgram.setUniform2f("u_spriteSize",
r*a.size[0],a.size[1]),this._patternLineProgram.setUniform1i("u_texture",1)}else p=f.getPaintValue("line-dasharray",a),2>p.length&&(p=[1,-1]),r*=g,this._dashArray[0]=r*p[0],this._dashArray[1]=r*p[1],b.bindProgram(this._triangleslProgram),this._triangleslProgram.setUniformMatrix4fv("u_transformMatrix",q),this._triangleslProgram.setUniformMatrix4fv("u_extrudeMatrix",l),this._triangleslProgram.setUniform2fv("u_normalized_origin",n.tileTransform.displayCoord),this._triangleslProgram.setUniform1f("u_depth",
f.z),this._triangleslProgram.setUniform4fv("u_color",this._color),this._triangleslProgram.setUniform1f("u_lineHalfWidth",c),this._triangleslProgram.setUniform2fv("u_dasharray",this._dashArray),this._triangleslProgram.setUniform1f("u_blur",h);b.drawElements(4,d.triangleElementCount,5125,12*d.triangleElementStart);b.bindVAO()}}};l.prototype._initialize=function(b){if(this._initialized)return!0;var d=new x(b,h.lineShaderVS,h.lineShaderFS,this._triangleAttributeLocations);b=new x(b,h.patternLineShaderVS,
h.patternLineShaderFS,this._triangleAttributeLocations);this._triangleslProgram=d;this._patternLineProgram=b;this._trianglesVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offsetAndNormal",count:4,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_accumulatedDistance",count:1,type:5122,offset:8,stride:12,normalized:!1,divisor:0}]};return this._initialized=!0};l.prototype._getTrianglesVAO=function(b,d){if(d.lineTrianglesVertexArrayObject)return d.lineTrianglesVertexArrayObject;
var a=d.lineVertexBuffer,e=d.lineTrianglesIndexBuffer;if(!a||!e)return null;d.lineTrianglesVertexArrayObject=new B(b,this._triangleAttributeLocations,this._trianglesVertexAttributes,{geometry:a},e);return d.lineTrianglesVertexArrayObject};return l}()});