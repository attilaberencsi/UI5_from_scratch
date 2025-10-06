sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/formatter",
  ],
  function (Controller, UIComponent, Fragment, Filter, Operator, formatter) {
    "use strict";

    return Controller.extend("odata.v4.demo.trippin.controller.Home", {
      formatter: formatter,

      onInit: function () { },

      onIconTabBarSelect: function (oEvent) {
        const oTableBinding = this.byId("idPeopleTable").getBinding("items");
        const sSelectedKey = oEvent.getParameter("key");

        switch (sSelectedKey) {
          case "all":
            oTableBinding.filter([]);
            break;
          case "vip":
            oTableBinding.filter([
              new Filter({
                path: "trips",
                operator: Operator.Any,
                variable: "trip",
                condition: new Filter({ path: "trip/budget", operator: Operator.GE, value1: 2000 })
              })
            ]);
            break;
          case "regular":
            oTableBinding.filter([
              new Filter({
                path: "trips",
                operator: Operator.All,
                variable: "trip",
                condition: new Filter({ path: "trip/budget", operator: Operator.LT, value1: 2000 })
              })
            ]);
            break;
        }
      },

      onColumnListItemPress: function (oEvent) {
        var oItem = oEvent.getSource();

        UIComponent.getRouterFor(this).navTo("details", {
          userID: oItem.getBindingContext().getProperty("ID"),
        });
      },

      onButtonAddBPPress: function () {
        //this.getView().byId("idPeopleTable").getBinding("items").create({});
        UIComponent.getRouterFor(this).navTo("create");
      },

      onPeopleTableDelete: function (oEvent) {
        let oItem = oEvent.getParameter("listItem");
        let oContext = oItem.getBindingContext();
        oContext.delete();
        let oModel = this.getView().getModel();
        oModel.submitBatch(oModel.getUpdateGroupId());

        // Refresh counts
        this._refreshCounts();

      },

      onMostExpensiveTripsButtonPress: function () {
        if (!this._oDialog) {
          Fragment.load({
            id: this.getView().getId(),
            name: "odata.v4.demo.trippin.fragments.MostExpensiveTrips",
            controller: this
          }).then(oDialog => {
            this._oDialog = oDialog;
            this.getView().addDependent(oDialog);
            oDialog.open();
          })
        } else {
          this._oDialog.open();
        }
      },

      onPressCloseDialog: function () {
        this._oDialog.close();
      },

      onPressShowTrips: function () { },

      /**
       * Refresh the counts displayed in the icon tab filters
       * @private
       */
      _refreshCounts: function () {
        let aTabs = this.getView().byId("idIconTabBar").getItems();

        for (let i = 0; i < aTabs.length; i++) {
          const oTab = aTabs[i];
          if (oTab instanceof sap.m.IconTabFilter) {
            oTab.getBinding("count").refresh();
          }
        }
      }

    });
  }
);
