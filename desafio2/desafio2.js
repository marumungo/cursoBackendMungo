const fs = require('fs');

class ProductManager {
    // Generar un array vacío donde se almacenarán los productos y un path que recibirá la ruta del JSON
    constructor(path) {
        this.products = [];
        this.path = path;
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

        // Crear el archivo JSON y agregar el producto
        const respuestaParseadaJson = JSON.stringify(this.products, 'null', 2);
        fs.writeFileSync(this.path, respuestaParseadaJson, 'utf-8');
        console.log("Producto agregado con éxito al archivo JSON");
    }

    getProducts() {
        // Mostrar el array con todos los productos agregados
        console.log("Array desde el archivo Js:");
        console.log(this.products);

        // Mostrar el array con todos los productos agregados desde el archivo JSON
        const contenidoJson = fs.readFileSync(this.path, 'utf-8');
        const respuestaParseadaJavascript = JSON.parse(contenidoJson);
        console.log("Array desde el archivo JSON:");
        console.log(respuestaParseadaJavascript);
        
        return this.products;
    }

    getProductById(id) {
        // Verificar si hay un producto con esa Id, y en tal caso, mostrarlo
        const productIndex2 = this.products.findIndex(e => e.id === id);
        if (productIndex2 >= 0) {
            console.log(this.products[productIndex2]);
        } else {
            console.log("Not Found");
        }

        return this.products[productIndex2];
    }

    updateProduct(id, newInfo) {
        // Actualizar una propiedad o varias de un producto a partir de su ID
        const productIndex3 = this.products.findIndex(e => e.id === id);
        if (productIndex3 >= 0 && Object.keys(newInfo).length > 0) {
            this.products[productIndex3] = { ...this.products[productIndex3], ...newInfo };
            fs.writeFileSync(this.path, JSON.stringify(this.products, 'null', 2), 'utf-8');
            console.log("Producto actualizado");
        } else {
            console.log("Not Found");
        }
    }

    deleteProduct(id) {
        // Eliminar un producto a partir de su ID
        const productIndex4 = this.products.findIndex(e => e.id === id);
        if (productIndex4 >= 0) {
            this.products.splice(productIndex4, 1);
            fs.writeFileSync(this.path, JSON.stringify(this.products, 'null', 2), 'utf-8');
            console.log("Producto eliminado");
        } else {
            console.log("Not Found");
        }
    }

}

// Pruebas de que funciona cada una de las funciones
const productManager = new ProductManager("./desafio2/products.json");

productManager.addProduct("Zapato", "Con taco alto", 3500, "imagen1.com", 253, 45);
productManager.addProduct("Pollera", "Con volados", 2600, "imagen2.com", 178, 28);
productManager.addProduct("Jean", "De color azul", 2400, "imagen3.com", 345, 12);
console.log("Producto con ID repetida:");
productManager.addProduct("Remera", "Escote en v", 1700, "imagen4.com", 345, 56);
console.log("Producto con falta de datos:");
productManager.addProduct("Remera", "Escote en v", 1700, "imagen4.com", 56);

productManager.getProducts();

console.log("Producto a partir de una ID:");
productManager.getProductById(3);
console.log("Producto con ID no existente:");
productManager.getProductById(5);

console.log("Producto antes de actualizar:");
productManager.getProductById(2);
console.log("Producto después de actualizado:");
productManager.updateProduct(2, {description: "SIN volados", price: 3000, newProperty: "i am the new property :)"});
productManager.getProductById(2);

console.log("Producto antes de eliminar:");
productManager.getProductById(1);
console.log("Producto despues de eliminar:");
productManager.deleteProduct(1);
productManager.getProductById(1);




