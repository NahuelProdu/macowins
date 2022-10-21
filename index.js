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

let estadoNuevo = new Liquidacion();
let sacoCheto = new Prenda(estadoNuevo, 1500, 'saco');

console.log(sacoCheto.precioVenta())