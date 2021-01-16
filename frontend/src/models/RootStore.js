import VaseStore from "./VaseStore"
import ColoringForm from "./ColoringForm"
import BasketStore from "./BasketStore"
import FigurineStore from "./FigurineStore"
import { types } from "mobx-state-tree";

/**
 * A RootStore model.
 */
// prettier-ignore
const RootStore = types.model("RootStore").props({
  vaseStore: types.optional(VaseStore, {}),
  coloringFormStore: types.optional(ColoringForm, {}),
  basketStore: types.optional(BasketStore, {}),
  figStore: types.optional(FigurineStore, {}),
});

export default RootStore;

