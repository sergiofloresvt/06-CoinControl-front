import { Category } from "./category";
import { User } from "./user";

export interface Expense {
    id: number;
    amount: number;
    description: string;
    date: string;
    category: Category;
    user: User
}
