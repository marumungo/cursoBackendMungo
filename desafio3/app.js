// Importaciones
const { ProductManager } = require ("./products/productManager.js");
const express = require ("express");

// Agregar los productos mediante la clase ProductManager
const productManager = new ProductManager("./products/products.json");

productManager.addProduct("Zapatos", "Con taco alto", 3500, "imagen1.com", 253, 45);
productManager.addProduct("Pollera", "Con volados", 2600, "imagen2.com", 178, 28);
productManager.addProduct("Jean", "De color azul", 2410, "imagen3.com", 345, 12);
productManager.addProduct("Remera", "Escote en v", 1700, "imagen4.com", 56, 39);
productManager.addProduct("Blusa", "Con cuello alto", 3100, "imagen5.com", 124, 24);
productManager.addProduct("Pantalón cargo", "Tiro alto", 4280, "imagen6.com", 176, 53);
productManager.addProduct("Saco", "Abrigado de color beige", 7240, "imagen7.com", 67, 26);
productManager.addProduct("Sandalias", "Abiertas con cierre", 3520, "imagen8.com", 89, 62);
productManager.addProduct("Corset", "Sin tirantes", 5470, "imagen9.com", 53, 19);
productManager.addProduct("Top", "Escote corazón", 1390, "imagen10.com", 25, 36);

const products = productManager.getProducts();


// Agregar los productos mediante la clase ProductManager
const app = express();

app.use(express.urlencoded({extended: true}));

// Endpoint de inicio
app.get("/", (req, res) => {
    res.send("Hola!");
});

// Endpoint de products, en el que se retornan todos los productos, o un limite de ellos si recibe una limit query
app.get("/products", (req, res) => {
    const { limit } = req.query;
    const limitProducts = products.slice(0, limit);

    if (!limit) {
        return res.send({products});
    } else {
        res.send({limitProducts});
    }
});

// Endpoint de products segun su id, que retorna un solo producto, según la id que reciba por params
app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;
    const parseId = parseInt(pid);
    const productById = products.find(product => product.id === parseId);

    if (!productById) {
        return res.send({error: "No existe un producto con esa ID"});
    } else {
        res.send({productById});
    }
});

app.listen(8000, () => {
    console.log("Escuchando en el puerto 8000");
});


