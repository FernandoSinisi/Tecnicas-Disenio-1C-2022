import { Product } from "./productModel";
import { Payment } from "./paymentsModel";
import { Calendar } from "./calendarModel";

export type ShoppingCart = {
    products: Product[];
    payment: Payment;
    purchase_date: Calendar;
}
