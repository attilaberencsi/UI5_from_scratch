import * as CoreLibrary from "sap/ui/core/library";
const { ValueState } = CoreLibrary;

/** 
 * @namespace odata.v4.demo.trippin.model
 */
export default class Formatter {
  static formatDate(sDate?: string): string {
    if (!sDate) {
      return "";
    }

    const oDate = new Date(sDate);
    return oDate.toDateString();
  }

  static formatUserStatusState(sValue: string): string {
    switch (sValue) {
      case "A":
        return ValueState.Success;
      case "S":
        return ValueState.Warning;
      case "D":
        return ValueState.Error;
      default:
        return ValueState.None;
    }
  }
}