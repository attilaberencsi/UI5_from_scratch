import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import MessageToast from "sap/m/MessageToast";
import type Event from "sap/ui/base/Event";
import type ListItem from "sap/m/ListItem";
import type Model from "sap/ui/model/odata/v4/ODataModel";

export default class Create extends Controller {

  public onInit(): void {
    UIComponent.getRouterFor(this)
      .getRoute("create")
      .attachPatternMatched(this._onCreateMatched, this);
  }

  public onPressAddTrip(): void {
    this.getView()
      .byId("idTripsTable")
      .getBinding("items")
      ?.create({}, false, true, false);
  }

  public onRemoveTrip(oEvent: Event): void {
    const oItem = oEvent.getParameter("listItem") as ListItem;

    oItem.getBindingContext()?.delete();
  }

  public onPressSave(): void {
    const oModel = this.getView().getModel() as Model;

    oModel.submitBatch(oModel.getUpdateGroupId()).then(() => {
      if (!(this.getOwnerComponent() as any).bError) {
        const oBundle = this.getView().getModel("i18n")?.getResourceBundle();

        MessageToast.show(oBundle?.getText("userCreated") ?? "", {
          closeOnBrowserNavigation: false,
        });

        UIComponent.getRouterFor(this).navTo(
          "details",
          {
            userID: this.getView().getBindingContext()?.getProperty("ID"),
          },
          true
        );
      }
    });
  }

  public onPressCancel(): void {
    const oModel = this.getView().getModel() as Model;

    oModel.resetChanges(oModel.getUpdateGroupId());

    UIComponent.getRouterFor(this).navTo("home", {}, true);
  }

  private _onCreateMatched(): void {
    const oListBinding = this.getView().getModel().bindList("/People");

    const oContext = oListBinding.create({}, false, false, true);

    this.getView().setBindingContext(oContext);
  }
}
