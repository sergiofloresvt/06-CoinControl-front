import { PredefinedFund } from "./predefined-funds";
import { User } from "./user";

export interface Funds {
    id: number;
    amount: number;
    user: User | null;
    predefinedFund: PredefinedFund;
}
