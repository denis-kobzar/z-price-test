import {Customer} from "./customer";

export interface Action {
  type: string;
  payload: Customer;
}
