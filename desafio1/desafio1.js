class ProductManager {
    // Generar un array vacío donde se almacenarán los productos
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbail, code, stock) {
        // Objeto que almacena todos los valores del producto
        const product = {
            title,
            description,
            price,
            thumbail,
            code,
            stock
        }

       // Validar que no se repita el campo “code” y que todos los campos sean obligatorios
        const productIndex = this.products.findIndex(e => e.code === code);
        if (productIndex >= 0) {
            console.log("El producto ya está agregado");
            return;
        } else if (title === "" || description === "" || typeof price !== "number" || thumbail === "" || typeof code !== "number" || typeof stock !== "number"){
            console.log("Todos los campos son obligatorios!");
            return;
        }

        // Generar un id autoincrementable
        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }

        // Agregar el producto al array
        this.products.push(product);
        console.log("Producto agregado con éxito");
    }

    getProducts() {
        // Mostrar el array con todos los productos agregados
        console.log(this.products);
        return this.products;
    }

    getProductById(randomId) {
        // Verificar si hay un producto con esa Id, y en tal caso, mostrarlo
        const productIndex2 = this.products.findIndex(e => e.id === randomId);
        if (productIndex2 >= 0) {
            console.log(this.products[productIndex2]);
        } else {
            console.log("Not Found");
        }
    }
}

// Pruebas de que funciona cada una de las funciones
const productManager = new ProductManager();
productManager.addProduct("Zapato", "Con taco alto", 3500, "imagen1.com", 253, 45);
productManager.addProduct("Pollera", "Con volados", 2600, "imagen2.com", 178, 28);
productManager.addProduct("Jean", "De color azul", 2400, "imagen3.com", 345, 12);
productManager.addProduct("Remera", "Escote en v", 1700, "imagen4.com", 345, 56);

productManager.getProducts();

productManager.getProductById(3);
productManager.getProductById(5);
