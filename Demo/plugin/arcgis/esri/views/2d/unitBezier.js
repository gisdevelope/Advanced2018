// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.4/esri/copyright.txt for details.
//>>built
define([],function(){var a=function(a,d,p,m){function c(a,c){var e,f,b,d;c=null==c?1E-6:c;b=a;for(f=0;8>f;f++){d=((k*b+h)*b+g)*b-a;if(Math.abs(d)<c)return b;e=(3*k*b+2*h)*b+g;if(1E-6>Math.abs(e))break;b-=d/e}e=0;f=1;b=a;if(b<e)return e;if(b>f)return f;for(;e<f;){d=((k*b+h)*b+g)*b;if(Math.abs(d-a)<c)break;a>d?e=b:f=b;b=.5*(f-e)+e}return b}var g=3*a,h=3*(p-a)-g,k=1-g-h,l=3*d,n=3*(m-d)-l,q=1-l-n;return function(a,d){a=c(a,d);return((q*a+n)*a+l)*a}},m=/^cubic-bezier\((.*)\)/;a.parse=function(c){var d=
a[c]||null;!d&&(c=m.exec(c))&&(c=c[1].split(",").map(function(a){return parseFloat(a.trim())}),4!==c.length||c.some(function(a){return isNaN(a)})||(d=a.apply(a,c)));return d};a.ease=a(.25,.1,.25,1);a.linear=a(0,0,1,1);a.easeIn=a["ease-in"]=a(.42,0,1,1);a.easeOut=a["ease-out"]=a(0,0,.58,1);a.easeInOut=a["ease-in-out"]=a(.42,0,.58,1);return a});