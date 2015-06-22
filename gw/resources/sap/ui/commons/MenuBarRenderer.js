/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var M={};M.render=function(r,m){var a=r;m.doBeforeRendering();a.write("<div");a.writeControlData(m);a.addClass("sapUiMnuBar");if(m.getDesign()==sap.ui.commons.MenuBarDesign.Header){a.addClass("sapUiMnuBarHeader");}var I=!m.getEnabled();if(I){a.addClass("sapUiMnuBarDsbl");}a.addStyle("width",m.getWidth());a.writeStyles();a.writeClasses();a.writeAttribute("tabindex","0");var t=m.getTooltip_AsString();M.writeAria(a,"menubar",t,I);a.write("><ul");a.writeAttribute("id",m.getId()+"-area");a.writeAttribute("class","sapUiMnuBarArea");a.write(">");var v=0;var b=m.getItems();for(var i=0;i<b.length;i++){var o=b[i];if(o.getVisible()){v++;a.write("<li");a.writeElementData(o);a.addClass("sapUiMnuBarItm");var d=!o.getEnabled()||I;if(d){a.addClass("sapUiMnuBarItmDsbl");}a.writeClasses();a.writeAttribute("itemidx",""+i);var t=o.getTooltip_AsString();M.writeAria(a,"menuitem",t,d,v);a.writeAttribute("tabindex","-1");a.write("><span>");a.writeEscaped(o.getText());a.write("</span></li>");}}a.write("<li");a.writeAttribute("id",m.getId()+"-ovrflw");a.writeAttribute("itemidx","ovrflw");a.writeAttribute("style","display:none;");a.writeAttribute("tabindex","-1");a.addClass("sapUiMnuBarItm");a.addClass("sapUiMnuBarOvrFlw");if(d){a.addClass("sapUiMnuBarItmDsbl");}a.writeClasses();var c=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");var O;if(c){O=c.getText("MNUBAR_OVRFLW");}M.writeAria(a,"menuitem",O,false,0);a.write("><span></span></li></ul></div>");};M.writeAria=function(r,R,t,d,i){if(t){r.writeAttributeEscaped("title",t);}if(!sap.ui.getCore().getConfiguration().getAccessibility()){return;}r.writeAttribute("role",R);if(R=="menuitem"){r.writeAttribute("aria-haspopup",true);r.writeAttribute("aria-posinset",i);}if(d){r.writeAttribute("aria-disabled",true);}};return M;},true);
