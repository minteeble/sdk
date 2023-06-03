import {
  NavigationCategoryClientModel,
  NavigationExtensionClientModel,
} from "@minteeble/utils";

export interface UserNavigationInfo {
  categories: Array<NavigationCategoryClientModel>;

  extensions: Array<NavigationExtensionClientModel>;
}
