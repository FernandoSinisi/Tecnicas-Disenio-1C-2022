import { Application } from "express";
import { continueIfJWTValid } from "../services/jwt";
import products from '../models/products.json'
import { State } from "../services/initializeOffers";
import { processProducts } from "../services/processProducts";
import { ShoppingCart } from "../models/shoppingCartModel";
import { simplifyProcessedProducts } from "../services/simplifyProcessedProducts";
import { Payment } from "../models/paymentsModel";
import { Calendar } from "../models/calendarModel";
import { Product } from "../models/productModel";


const routes = (app: Application, state: State) => {
    app.route('/products/')
        .get(continueIfJWTValid, (req, res) => {
            res.status(200).json(products);
        })
        .post(continueIfJWTValid, (req, res) => {
            let payment: Payment = req.body.payment
            if (payment == null) {
                res.status(403).json({error: "bad format payment"});
            }
            let purchase_date: Calendar = req.body.purchase_date
            if (purchase_date == null) {
                res.status(403).json({error: "bad format purchase_date"});
            }
            let products: Product[] = req.body.products
            if (products == null) {
                res.status(403).json({error: "bad format products"});
            }
            let shoppingCart: ShoppingCart = {
                products,
                payment,
                purchase_date
            }
            let processedProducts = processProducts(state, shoppingCart)
            let simplifiedProcessedProducts = simplifyProcessedProducts(processedProducts)
            res.status(200).json(simplifiedProcessedProducts);
        });
}

export default routes;
