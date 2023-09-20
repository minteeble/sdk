import {
  ISmartContractInstance,
  SmartContractInstance,
} from "../SmartContractInstance";

export interface IERC1155SmartContractInstance extends ISmartContractInstance {}

export class ERC1155SmartContractInstance
  extends SmartContractInstance
  implements IERC1155SmartContractInstance {}
