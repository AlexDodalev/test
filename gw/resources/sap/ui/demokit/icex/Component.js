/*!
 * @copyright@
 */
jQuery.sap.declare("sap.ui.demokit.icex.Component");jQuery.sap.require("sap.ui.core.UIComponent");jQuery.sap.require("sap.ui.demokit.icex.model.FavoriteModel");jQuery.sap.require("sap.ui.demokit.icex.util.Sorter");sap.ui.core.UIComponent.extend("sap.ui.demokit.icex.Component",{metadata:{includes:["css/style.css"]},init:function(){sap.ui.core.UIComponent.prototype.init.apply(this,arguments);var p=jQuery.sap.getModulePath("sap.ui.demokit.icex");var i=new sap.ui.model.json.JSONModel(p+"/model/img.json");this.setModel(i,"img");var f=new sap.ui.demokit.icex.model.FavoriteModel();this.setModel(f,"fav");jQuery.ajax(p+"/model/groups.json",{dataType:"json",success:jQuery.proxy(this.onGroupsLoaded,this)});},createContent:function(){return sap.ui.jsview("app","sap.ui.demokit.icex.view.App");},onGroupsLoaded:function(d){if(d){var t=new Date().getTime();d.groups.sort(sap.ui.demokit.icex.util.Sorter.sortByName);for(var i=0;i<d.groups.length;i++){if(d.groups[i].icons){d.groups[i].count=d.groups[i].icons.length;}if(d.groups[i].icons){d.groups[i].icons.sort(sap.ui.demokit.icex.util.Sorter.sortByName);}}jQuery.sap.require("sap.ui.core.IconPool");var a=sap.ui.core.IconPool.getIconNames();var b=[];for(var i=0;i<a.length;i++){b[i]={name:a[i]};}b.sort(sap.ui.demokit.icex.util.Sorter.sortByName);d.groups.splice(0,0,{name:"all",text:"All",icons:b,count:b.length});var g=new sap.ui.model.json.JSONModel(d);g.setSizeLimit(1000000);this.setModel(g);jQuery.sap.log.info("Component.js: Sorted all those groups and icons in "+(new Date().getTime()-t)+" ms");}}});
