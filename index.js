const _ = require('lodash');

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

class Estado {
    precioVenta(precio) { 
        return precio;
    }
}

class Nuevo extends Estado {
    precioVenta(precio) {
        return super.precioVenta(precio);
    }
}

class Liquidacion extends Estado {
    precioVenta(precio) {
        return super.precioVenta(precio) / 2;
    }
}

class Promocion extends Estado {

    constructor(valorUsuario) {
        this.valorUsuario = valorUsuario;
    }

    precioVenta(precio) {
        return super.precioVenta(precio) / 2;
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
        let totalPrendas = this.prendas.map(prenda => prenda.precioFinal());
        let total = _.sum(totalPrendas);
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
        let costoFinanciero = this.cuotas * this.coeficiente + super.total(this.prendas) * 0.01;
        return super.total(this.prendas) + costoFinanciero;
    }
}