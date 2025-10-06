sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/UIComponent", "sap/m/MessageToast"],
  function (Controller, UIComponent, MessageToast) {
    "use strict";

    return Controller.extend("odata.v4.demo.trippin.controller.Create", {
      onInit: function () {
        UIComponent.getRouterFor(this)
          .getRoute("create")
          .attachPatternMatched(this._onCreateMatched, this);
      },

      onButtonAddTripPress: function () {
        this.getView().byId("idTripsCreateTable").getBinding("items").create({}, false, true, false);
      },

      onRemoveTrip: function (oEvent) {
        let oItem = oEvent.getParameter("listItem");
        let oContext = oItem.getBindingContext();
        oContext.delete();
      },

      onPressSave: function () {
        const oModel = this.getView().getModel();
        oModel.submitBatch(oModel.getUpdateGroupId()).then(function () {
          if (!this.getOwnerComponent().bError) {
            let oBundle = this.getView().getModel("i18n").getResourceBundle();
            MessageToast.show(oBundle.getText("userCreated"), {
              closeOnBrowserNavigation: false
            });
            UIComponent.getRouterFor(this).navTo("details", {
              userID: this.getView().getBindingContext().getProperty("ID")
            }, true);
          }
        }.bind(this));

      },

      onPressCancel: function () {
        let oModel = this.getView().getModel();
        oModel.resetChanges(oModel.getUpdateGroupId());        
        UIComponent.getRouterFor(this).navTo("home", {}, true);
      },

      _onCreateMatched: function () {
        // Example of setting the update group id in the binding, for one time, but we can do it globally in manifest.json as well
        // let oListBinding = this.getView().getModel().bindList("/People", null, [], [],{
        //   $$updateGroupId: "cud",
        // });
        let oListBinding = this.getView().getModel().bindList("/People");

        // Set bInactive flag to true
        // Such a context will only be sent to the server after the first property update.
        // When the first property updates happens, the context is no longer inactive
        // After that happens, roundtrip happens, so we need updateGroups
        let oContext = oListBinding.create({}, false, false, true);
        this.getView().setBindingContext(oContext);
      },
    });
  }
);
