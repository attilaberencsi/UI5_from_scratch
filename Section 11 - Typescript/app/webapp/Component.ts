import UIComponent from "sap/ui/core/UIComponent";
import models from "./model/models";

/**
 * @namespace odata.v4.demo.trippin
 */
export default class Component extends UIComponent {
  public init(): void {
    // call the base component's init function
    super.init();

    // set the device model
    this.setModel(models.createDeviceModel(), "device");
  }
}
