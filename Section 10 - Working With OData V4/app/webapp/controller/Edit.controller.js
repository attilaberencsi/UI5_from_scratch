sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "../model/formatter",
  ],
  function (Controller, UIComponent, MessageToast, MessageBox, formatter) {
    "use strict";

    return Controller.extend("odata.v4.demo.trippin.controller.Edit", {
      formatter: formatter,

      onInit: function () {
        UIComponent.getRouterFor(this)
          .getRoute("edit")
          .attachPatternMatched(this._onObjectMatched, this);
      },

      onPressAddTrip: function () {
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
        let sUserId = this.getView().getBindingContext().getProperty("ID");
        let oModel = this.getView().getModel();
        oModel.resetChanges(oModel.getUpdateGroupId());
        UIComponent.getRouterFor(this).navTo("details", { userID: sUserId }, true);
      },

      _onObjectMatched: function (oEvent) {
        let sUserID = oEvent.getParameter("arguments").userID;

        this.getView().bindElement({
          path: "/People(" + sUserID + ")"
        });
      },
    });
  }
);
