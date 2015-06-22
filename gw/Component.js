jQuery.sap.declare("sap.m.gw.Component");
jQuery.sap.require("sap.m.gw.MyRouter");

sap.ui.core.UIComponent.extend("sap.m.gw.Component", {
	// As is typical with components, the first thing we see is the component's settings configuration, 
	// in the form of the metadata. 
	// We'll tackle the configuration in three arbitrary sections: general, config and routing.

	//General
	metadata : 
    {
        name : "GW app",
        version : "1.0",
        includes : [],
        dependencies : 
        {
        // specify the library dependencies, which, when the component is instantiated
        // sap.ui.layout.form.SimpleForm
        libs : ["sap.m", "sap.ui.layout"],
        components : []
        },
    	rootView : "sap.m.gw.view.App",

    	//Config
    	config : 
        {
            resourceBundle : "i18n/messageBundle.properties",
            serviceConfig : 
            {
                name : "Northwind",
                serviceUrl : "http://services.odata.org/V2/(S(sapuidemotdg))/OData/OData.svc/"
                //http://sap-ides.afk-m.by:8020/sap/opu/odata/sap/zodata_srv/?sap-client=800
            }
        },

        //Routing
        //new sap.ui.core.routing.Router(oRoutes?, oConfig?, oOwner?, oTargetsConfig?)
        routing: 
        {
            config : 
            {
				routerClass : sap.m.gw.MyRouter,
				viewType : "XML",
				viewPath : "sap.m.gw.view",
				//unless stated otherwise, when the router instantiates a view, 
				//it should place it in the detail part of our sap.m.SplitApp control (via the detailPages aggregation)
				targetAggregation : "detailPages", 
				clearTarget : false // clears the view
			},
			routes : 
			[
				{
					pattern : "",
					name : "main", //mandatory field
					view : "Master",
					targetAggregation : "masterPages", //We have a "main" route that causes the Master view 
					//to be placed in the masterPages aggregation of the sap.m.SplitApp, which is available via its id 'idAppControl'.
					// Its a left side of a split view
					targetControl : "idAppControl",
					subroutes : 
						[
							{
								//pattern : "{product}/:tab:",
                                pattern : "{product}/:tab:",
								name : "product",
								view : "Detail"
							}
						]
				},

/*				{
					name : "catchallMaster", //mandatory field
					view : "Master",
					targetAggregation : "masterPages",
					targetControl : "idAppControl",
					subroutes : 
					[
						{
							pattern : ":all*:",
							name : "catchallDetail",
							view : "NotFound"
						}
					]
				}*/
			]
        }
    },
    //Initialization
    init : function() {

        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

        var mConfig = this.getMetadata().getConfig();

        // always use absolute paths relative to our own component
        // (relative paths will fail if running in the Fiori Launchpad)
        var rootPath = jQuery.sap.getModulePath("sap.m.gw");

        // set i18n model
        var i18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl : [rootPath, mConfig.resourceBundle].join("/")
        });
        this.setModel(i18nModel, "i18n");
        
        // Create and set domain model to the component
        var sServiceUrl = mConfig.serviceConfig.serviceUrl;
        var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
        this.setModel(oModel);

        // set device model
        var deviceModel = new sap.ui.model.json.JSONModel({
            isTouch : sap.ui.Device.support.touch,
            isNoTouch : !sap.ui.Device.support.touch,
            isPhone : sap.ui.Device.system.phone,
            isNoPhone : !sap.ui.Device.system.phone,
            listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
            listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
        });
        deviceModel.setDefaultBindingMode("OneWay");
        this.setModel(deviceModel, "device");
        
        this.getRouter().initialize();

            
    },
});
