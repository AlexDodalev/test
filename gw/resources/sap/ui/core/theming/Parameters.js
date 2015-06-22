/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Core','sap/ui/thirdparty/URI'],function(q,C,U){"use strict";var P={};var p=null;var t=null;function r(){p=null;}function c(m,R){var a=/^url\(['|"]{1}(?!https?:\/\/|\/)(.*)['|"]{1}\)$/,A=R.replace(/library-parameters\.json.*/,"");for(var i in m){if(a.test(m[i])){m[i]=m[i].replace(a,function($,b,d){var n=new URI(A+b).normalize().path();return"url('"+n+"')";});}}return m;}function f(a){q("link[id^=sap-ui-theme-]").each(function(){a(this.getAttribute("id"),this.href);});if(q.sap._mIEStyleSheets){for(var i in q.sap._mIEStyleSheets){if(i.indexOf("sap-ui-theme-")===0){var s=q.sap._mIEStyleSheets[i];if(typeof s.href==="string"){a(i,s.href);}}}}}function l(i,u){var $=q.sap.byId(i);if($.length>0){var d=$.css("background-image");var a=/\(["']data:text\/plain;utf-8,(.*)["']\)$/i.exec(d);if(a&&a.length>=2){var s=a[1];if(s.charAt(0)!=="{"&&s.charAt(s.length-1)!=="}"){try{s=decodeURI(s);}catch(e){q.sap.log.warning("Could not decode theme parameters URI from "+u);}}try{var o=q.parseJSON(s);q.extend(p,o);return;}catch(e){q.sap.log.warning("Could not parse theme parameters from "+u+". Loading library-parameters.json as fallback solution.");}}}var R,b;u=u.replace(/\/library([^\/.]*)\.(?:css|less)($|[?#])/,function(h,k,m){return"/library-parameters.json"+(m?m:"");});R=q.sap.sjax({url:u,dataType:'json'});if(R.success){b=(typeof R.data=="string")?q.parseJSON(R.data):R.data;if(q.isArray(b)){for(var j=0;j<b.length;j++){b[j]=c(b[j],u);q.extend(p,b[j]);}}else{b=c(b,u);q.extend(p,b);}}else{q.sap.log.warning("Could not load theme parameters from: "+u);}}function g(){if(!p){p={};t=sap.ui.getCore().getConfiguration().getTheme();f(l);}return p;}P._addLibraryTheme=function(T,s){if(p){l(T,s);}};P.get=function(n){if(arguments.length==1){var s=g()[n];if(typeof s==="undefined"&&typeof n==="string"){var i=n.indexOf(":");if(i!==-1){n=n.substr(i+1);}s=g()[n];}return s;}else if(arguments.length==0){return q.extend({},g());}else{return undefined;}};P._setOrLoadParameters=function(L){p={};t=sap.ui.getCore().getConfiguration().getTheme();f(function(i,h){var s=i.substr(13);if(L[s]){q.extend(p,L[s]);}else{l(i,h);}});};P.reset=function(){var o=arguments[0]===true;if(!o||sap.ui.getCore().getConfiguration().getTheme()!==t){r();}};P._getThemeImage=function(s,F){s=s||"sapUiGlobalLogo";var a=sap.ui.core.theming.Parameters.get(s);if(a){var m=/url[\s]*\('?"?([^\'")]*)'?"?\)/.exec(a);if(m){a=m[1];}else if(a==="''"||a==="none"){a=null;}}if(!!F&&!a){return sap.ui.resource('sap.ui.core','themes/base/img/1x1.gif');}return a;};return P;},true);
