import { initializeOffers } from "../src/services/initializeOffers";
import { offers } from "../src/utils/data";


describe("initialize offer test", () => {
  it("given rules initializeOffers should validate ES_COCA_COLA_1L rule ", () => {

    const expectedRule = {
      "code": "ES_COCA_COLA_1L",
      "description": "GASEOSA COCA COLA 1L",
      "type": "EQUALS",
      "field": "PRODUCT.code",
      "value": "ABR000J"
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "ES_COCA_COLA_1L")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate PRODUCTO_GASEOSA rule ", () => {

    const expectedRule = {
      "code": "PRODUCTO_GASEOSA",
      "description": "PRODUCTO ES CATEGORIA GASEOSA",
      "type": "EQUALS",
      "field": "PRODUCT.category.code",
      "value": "X001BXX"
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "PRODUCTO_GASEOSA")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate MES_FEBRERO rule ", () => {

    const expectedRule = {
      "code": "MES_FEBRERO",
      "description": "EL MES ES FEBRERO",
      "type": "EQUALS",
      "field": "CALENDAR.month",
      "value": 2
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "MES_FEBRERO")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should  validate MES_JUNIO rule ", () => {

    const expectedRule = {
      "code": "MES_JUNIO",
      "description": "EL MES ES JUNIO",
      "type": "EQUALS",
      "field": "CALENDAR.month",
      "value": 6
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "MES_JUNIO")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate MES_JULIO rule ", () => {

    const expectedRule = {
      "code": "MES_JULIO",
      "description": "EL MES ES JULIO",
      "type": "EQUALS",
      "field": "CALENDAR.month",
      "value": 7
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "MES_JULIO")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate PRODUCTO_LACTEO rule ", () => {

    const expectedRule = {
      "code": "PRODUCTO_LACTEO",
      "description": "PRODUCTO ES CATEGORIA LACTEO",
      "type": "EQUALS",
      "field": "PRODUCT.category.code",
      "value": "X033AXX"
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "PRODUCTO_LACTEO")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate PRICE_LOWER_10000 rule", () => {

    const expectedRule = {
      "code": "PRICE_LOWER_10000",
      "description": "Producto con precio menor a 10000",
      "type": "LOWER",
      "field": "PRODUCT.price",
      "value": 10000
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "PRICE_LOWER_10000")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate PRICE_HIGHER_50000 rule ", () => {

    const expectedRule = {
      "code": "PRICE_HIGHER_50000",
      "description": "Producto con precio menor a 50000",
      "type": "HIGHER",
      "field": "PRODUCT.price",
      "value": 50000
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "PRICE_HIGHER_50000")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate PRODUCTO_NO_PHILLEP rule ", () => {

    const expectedRule = {
      "code": "PRODUCTO_NO_PHILLEP",
      "description": "Producto no es marca Phillep",
      "type": "DISTINCT",
      "field": "PRODUCT.brand.code",
      "value": "HHGFDP"
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "PRODUCTO_NO_PHILLEP")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate PAGO_MACRO rule ", () => {

    const expectedRule = {
      "code": "PAGO_MACRO",
      "description": "Pago con tarjeta de banco macro",
      "type": "EQUALS",
      "field": "PAYMENT.entity",
      "value": "MACRO"
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "PAGO_MACRO")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate PAGO_TARJETA_DEBITO_CREDITO rule ", () => {

    const expectedRule = {
      "code": "PAGO_TARJETA_DEBITO_CREDITO",
      "description": "Pago con tarjeta debito o credito",
      "type": "IN",
      "field": "PAYMENT.method",
      "value": [
        "CREDIT",
        "DEBIT"
      ]
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "PAGO_TARJETA_DEBITO_CREDITO")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate PAGO_EFECTIVO rule ", () => {

    const expectedRule = {
      "code": "PAGO_EFECTIVO",
      "description": "Pago en efectivo",
      "type": "EQUALS",
      "field": "PAYMENT.method",
      "value": "CASH"
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "PAGO_EFECTIVO")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate PAGO_TARJETA_MACRO rule ", () => {

    const expectedRule = {
      "type": "AND",
      "code": "PAGO_TARJETA_MACRO",
      "rules": [
        {
          "code": "PAGO_MACRO",
          "description": "Pago con tarjeta de banco macro",
          "type": "EQUALS",
          "field": "PAYMENT.entity",
          "value": "MACRO"
        },
        {
          "code": "PAGO_TARJETA_DEBITO_CREDITO",
          "description": "Pago con tarjeta debito o credito",
          "type": "IN",
          "field": "PAYMENT.method",
          "value": [
            "CREDIT",
            "DEBIT"
          ]
        }
      ]
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "PAGO_TARJETA_MACRO")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate ELECTRO_LIQ_TARJETA_MACRO rule ", () => {

    const expectedRule = undefined

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "ELECTRO_LIQ_TARJETA_MACRO")).toEqual(expectedRule);
  });

  it("given rules initializeOffers should validate NO_MACRO rule ", () => {

    const expectedRule = {
      "type": "NOT",
      "code": "NO_MACRO",
      "rules": [
        {
          "code": "PAGO_MACRO",
          "description": "Pago con tarjeta de banco macro",
          "type": "EQUALS",
          "field": "PAYMENT.entity",
          "value": "MACRO"
        }
      ]
    };

    const result = initializeOffers(offers);

    expect(result.rules.find(x => x.code === "NO_MACRO")).toEqual(expectedRule);
  });

  it("given rules and offer initializeOffers should update rules references on OF0001 offer", () => {

    const expectedOffer = {
      "description": "25% de descuento en las compras de Julio pagando con credito o debito Macro",
      "code": "OF0001",
      "rule": {
        "type": "AND",
        "code": "PAGO_MACRO_EN_JULIO",
        "rules": [
          {
            "type": "AND",
            "code": "PAGO_TARJETA_MACRO",
            "rules": [
              {
                "code": "PAGO_MACRO",
                "description": "Pago con tarjeta de banco macro",
                "type": "EQUALS",
                "field": "PAYMENT.entity",
                "value": "MACRO"
              },
              {
                "code": "PAGO_TARJETA_DEBITO_CREDITO",
                "description": "Pago con tarjeta debito o credito",
                "type": "IN",
                "field": "PAYMENT.method",
                "value": ["CREDIT", "DEBIT"]
              }
            ]
          },
          {
            "code": "MES_JULIO",
            "description": "EL MES ES JULIO",
            "type": "EQUALS",
            "field": "CALENDAR.month",
            "value": 7
          }]
      },
      "discount": {
        "type": "CART_PERCENTAGE",
        "value": 25
      }
    };

    const result = initializeOffers(offers);

    expect(result.offers.find(x => x.code === "OF0001")).toEqual(expectedOffer);
  });

  it("given rules and offer initializeOffers should update rules references on OF0002 offer", () => {

    const expectedOffer = {
      "description": "7 pesos de descuento en gaseosas excepto la Coca Cola de 1L",
      "code": "OF0002",
      "rule": {
        "type": "AND",
        "code": "GASEOSA_EXCEPTO_COCA",
        "rules": [{
          "code": "NO_ES_COCA_COLA_1L",
          "type": "NOT",
          "rules": [
            {
              "code": "ES_COCA_COLA_1L",
              "description": "GASEOSA COCA COLA 1L",
              "type": "EQUALS",
              "field": "PRODUCT.code",
              "value": "ABR000J"
            }
          ]
        },
          {
            "code": "PRODUCTO_GASEOSA",
            "description": "PRODUCTO ES CATEGORIA GASEOSA",
            "type": "EQUALS",
            "field": "PRODUCT.category.code",
            "value": "X001BXX"
          },
          {
            "code": "MES_JUNIO",
            "description": "EL MES ES JUNIO",
            "type": "EQUALS",
            "field": "CALENDAR.month",
            "value": 6
          }]
      },
      "discount": {
        "type": "FIX",
        "value": 7
      }
    }

    const result = initializeOffers(offers);

    expect(result.offers.find(x => x.code === "OF0002")).toEqual(expectedOffer);
  });

  it("given rules and offer initializeOffers should update rules references on OF0003 offer", () => {

    const expectedOffer = {
      "description": "10% de descuento en lácteos durante febrero",
      "code": "OF0003",
      "rule": {
        "type": "AND",
        "code": "LACTEO_FEBRERO",
        "rules": [
          {
            "code": "PRODUCTO_LACTEO",
            "description": "PRODUCTO ES CATEGORIA LACTEO",
            "type": "EQUALS",
            "field": "PRODUCT.category.code",
            "value": "X033AXX"
          },
          {
            "code": "MES_FEBRERO",
            "description": "EL MES ES FEBRERO",
            "type": "EQUALS",
            "field": "CALENDAR.month",
            "value": 2
          }
        ]
      },
      "discount": {
        "type": "PRODUCT_PERCENTAGE",
        "value": 10
      }
    }

    const result = initializeOffers(offers);

    expect(result.offers.find(x => x.code === "OF0003")).toEqual(expectedOffer);
  });

  it("given rules and offer initializeOffers should update rules references on OF0004 offer", () => {

    const expectedOffer = {
      "description": "Los Lunes y Miércoles de Febrero, los productos de marca: LA CALMISIMA (codigo 0088ABC) tienen un 15% de descuento solo pagando con CREDITO O DEBITO DEL BANCO GALICIA",
      "code": "OF0004",
      "rule": {
        "type": "AND",
        "rules": [
          {
            "type": "OR",
            "rules": [
              {
                "type": "EQUALS",
                "description": "DIA LUNES",
                "field": "CALENDAR.week_day",
                "value": "Monday"
              },
              {
                "type": "EQUALS",
                "description": "DIA MIERCOLES",
                "field": "CALENDAR.week_day",
                "value": "Wednesday"
              }
            ]
          },
          {
            "type": "AND",
            "rules": [
              {
                "type": "EQUALS",
                "description": "AÑO 2022 ",
                "field": "CALENDAR.year",
                "value": 2022
              },
              {
                "type": "EQUALS",
                "description": "FEBRERO",
                "field": "CALENDAR.month",
                "value": 2
              },
              {
                "type": "EQUALS",
                "description": "ES MARCA LA CALMISIMA",
                "field": "PRODUCT.brand.code",
                "value": "Z001ABC"
              }
            ]
          },
          {
            "type": "AND",
            "rules": [
              {
                "type": "EQUALS",
                "description": "Banco Galcia",
                "field": "PAYMENT.entity",
                "value": "Galicia"
              },
              {
                "type": "EQUALS",
                "description": "pago con tarjeta de credito ",
                "field": "PAYMENT.method",
                "value": "CREDIT"
              }
            ]
          }
        ]
      },
      "discount": {
        "type": "PRODUCT_PERCENTAGE",
        "value": 15
      }
    }

    const result = initializeOffers(offers);

    expect(result.offers.find(x => x.code === "OF0004")).toEqual(expectedOffer);
  });

});
