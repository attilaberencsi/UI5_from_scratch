import Controller from "sap/ui/core/mvc/Controller";

/**
 * @namespace odata.v4.demo.trippin.controller
 */
export default class AppController extends Controller {
  public onInit(): void {
    // apply content density mode to root view
    //this.getView().addStyleClass((this.getOwnerComponent() as any).getContentDensityClass());
  }
}
