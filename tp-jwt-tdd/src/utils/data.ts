import untypedProducts from "../models/products.json";
import untypedOffers from "../models/offers.json";

import { Product } from "../models/productModel";
import { Offers } from "../services/initializeOffers";

export const products: Product[] = untypedProducts as Product[];

export const offers: Offers = untypedOffers as Offers;
