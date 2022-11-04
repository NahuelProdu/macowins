const assert = require('assert');
const index = require('../index')
const moment = require('moment')

//Estados
let estadoNuevo = new index.Nuevo;
let estadoLiquidacion = new index.Liquidacion;
let estadoPromocion = new index.Promocion(800);

//Prendas
let prendaNueva = new index.Prenda(estadoNuevo, 1000, 'Camisa')
let prendaLiquidacion = new index.Prenda(estadoLiquidacion, 1000, 'Saco');
let prendaPromocion = new index.Prenda(estadoPromocion, 1000, 'Pantalon');

//Prendas Vendidas
let prendaVendida1 = new index.Prenda_Vendida(prendaNueva, 2);
let prendaVendida2 = new index.Prenda_Vendida(prendaLiquidacion, 3);
let prendaVendida3 = new index.Prenda_Vendida(prendaPromocion, 4);

//Ventas
const fecha = moment('08-11-2021');
let venta_efec_nuevas = new index.Venta_Efectivo([prendaVendida1], fecha)
let venta_efec_liqui = new index.Venta_Efectivo([prendaVendida2], fecha)
let venta_tarj_nuevas = new index.Venta_Tarjeta([prendaVendida1], fecha, 10, 0.2)
let venta_tarj_promo = new index.Venta_Tarjeta([prendaVendida3], fecha, 10, 0.2)


describe('Prendas', function () {

    describe('Prenda Nueva - Precio base $1000', function () {
        it('Precio venta $1000', function () {
            assert.equal(prendaNueva.precioVenta(), 1000)
        });
    });

    describe('Prenda Liquidacion - Precio base $1000', function () {
        it('Precio venta $500', function () {
            assert.equal(prendaLiquidacion.precioVenta(), 500)
        });
    });
    
    describe('Prenda Promocion - Precio base $1000', function () {
        it('Precio venta $200 - Valor usuario $800', function () {
            assert.equal(prendaPromocion.precioVenta(), 200)
        });
    });
});

describe('Ventas', function () {

    describe('Venta Efectivo - Precio c/u $1000', function () {
        it('Prendas nuevas - Total venta $2000', function () {
            assert.equal(venta_efec_nuevas.total(), 2000)
        });
    });

    describe('Venta Efectivo - Precio c/u $1000', function () {
        it('Prendas liquidacion - Total venta $1500', function () {
            assert.equal(venta_efec_liqui.total(), 1500)
        });
    });

    describe('Venta Tarjeta - Precio c/u $1000', function () {
        it('Prendas nuevas - Total venta $2022', function () {
            assert.equal(venta_tarj_nuevas.total(), 2022)
        });
    });

    describe('Venta Tarjeta - Precio c/u $1000', function () {
        it('Prendas en promocion - Total venta $810', function () {
            assert.equal(venta_tarj_promo.total(), 810)
        });
    });

})


describe('Ganancias', function () {

    let arrayVentas = [venta_efec_liqui, venta_efec_nuevas, venta_tarj_nuevas, venta_tarj_promo];
    let ventas = new index.Repositorio_Ventas(arrayVentas);

    describe('Ganancias de un día laboral', function () {
        it('Ventas del 08-11-2021 - Total venta $6332', function () {
            assert.equal(ventas.gananciasDeUnDia(fecha), 6332)
        });
    });

    describe('Ganancias de un día no laboral', function () {
        it('Ventas del 11-11-2021 - Total venta $0', function () {
            const fecha2 = moment('11-11-2021')
            assert.equal(ventas.gananciasDeUnDia(fecha2), 0)
        });
    });
})