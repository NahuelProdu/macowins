const _ = require('lodash');
const moment = require('moment');

class Prenda {
    constructor(estado, precio, tipo) {
        this.estado = estado;
        this.precio = precio;
        this.tipo = tipo;
    }

    precioVenta() {
        return this.estado.precioVenta(this.precio);
    }
}

class Nuevo {
    precioVenta(precio) {
        return precio;
    }
}

class Liquidacion {
    precioVenta(precio) {
        return precio / 2;
    }
}

class Promocion {
    constructor(valorUsuario) {
        this.valorUsuario = valorUsuario;
    }

    precioVenta(precio) {
        return precio - this.valorUsuario;
    }
}

class Prenda_Vendida {
    constructor(prenda, cantidad) {
        this.prenda = prenda;
        this.cantidad = cantidad;
    }

    precioFinal() {
        return this.prenda.precioVenta() * this.cantidad;
    }
}

class Venta_Efectivo {
    constructor(prendas, fecha) {
        this.prendas = prendas;
        this.fecha = fecha;
    }

    total() {
        let total = _.sumBy(this.prendas, (prenda) => prenda.precioFinal());
        return total;
    }
}

class Venta_Tarjeta extends Venta_Efectivo {
    constructor(prendas, fecha, cuotas, coeficiente) {
        super(prendas, fecha);
        this.cuotas = cuotas;
        this.coeficiente = coeficiente;
    }

    total() {
        const superTotal = super.total(this.prendas);
        let costoFinanciero = this.cuotas * this.coeficiente + superTotal * 0.01;
        return superTotal + costoFinanciero;
    }
}

class Repositorio_Ventas {
    constructor(ventas) {
        this.ventas = ventas;
    }

    gananciasDeUnDia(fecha) {
        let ventasDeUnDia = this.ventas.filter(venta =>
                moment(fecha).isSame(venta.fecha)
            )
        let ganancias = ventasDeUnDia.map(venta => venta.total())
        return _.sum(ganancias) 
    }
}

module.exports = {Prenda, Nuevo, Liquidacion, Promocion, Prenda_Vendida, Venta_Efectivo, Venta_Tarjeta, Repositorio_Ventas}