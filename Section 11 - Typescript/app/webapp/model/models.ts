import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

export default {
  createDeviceModel(): JSONModel {
    const oModel = new JSONModel({
      isTouch: sap.ui.Device.support.touch,
      isNoTouch: !sap.ui.Device.support.touch,
      isPhone: sap.ui.Device.system.phone,
      isTablet: sap.ui.Device.system.tablet,
      isDesktop: sap.ui.Device.system.desktop,
      isPortrait: sap.ui.Device.orientation.portrait,
      isLandscape: sap.ui.Device.orientation.landscape
    });
    oModel.setDefaultBindingMode("OneWay");
    return oModel;
  },

  createResourceModel(sBundleName: string): ResourceModel {
    const oResourceModel = new ResourceModel({
      bundleName: sBundleName
    });
    return oResourceModel;
  }
};
