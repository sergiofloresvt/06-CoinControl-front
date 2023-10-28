import { PredefinedFund } from "./predefined-fund";
import { User } from "./user";

export interface Funds {
    id: number;
    amount: number;
    user: User | null;
    predefinedFund: PredefinedFund;
}
