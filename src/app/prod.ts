export interface ProductoVideojuego {
    titulo: string;
    plataforma: string;
    categoria: string;
    precio: number;
    cantidad: number;
    nombre_tienda: string;
    direccion_tienda: string;
    nuevoPrecio?: number | undefined; // Opcional y puede ser undefined
    nuevaCantidad?: number | undefined; // Opcional y puede ser undefined
}
