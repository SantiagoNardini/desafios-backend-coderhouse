import fs from 'fs'

class ProductManager {
    constructor() {
        this.products = []
    }


    generateID = () => {
        if (this.products.length === 0) return 1
        return this.products[this.products.length - 1].id + 1
    }
    addProduct = (title, description, price, thumbnail, code, stock) => {

        const id = this.generateID()
        const product = { id, title, description, price, thumbnail, code, stock }

        if (!title || !description || !price || !thumbnail || !code || !stock) { return console.log("no se completaron todos los campos") }

        if (this.products.some(product => product.code === code)) {
            return console.log(`El código ${code} ya está en uso`);
        }

        this.products.push(product)

    }
    getProductById = (id) => {
        const product = this.products.find(product => product.code === id);
        if (!product) {
            console.log("Producto no encontrado");
        }
        return product
    }

    getProducts = () => {
        return this.products;
    }
}

const manager = new ProductManager()
manager.addProduct("Remera negra", "Remera de tela color negro", 8000, "img ilustrativa", 10, 32);
manager.addProduct("Remera negra", "Remera de tela color blanca", 7500, "img ilustrativa", 11, 26);
manager.addProduct("Buzo azul", "Buzo de color azul", 14000, "img ilustrativa", 12, 16);

const products = manager.getProducts();
console.log("Productos totales", products);


const product = manager.getProductById(12);
console.log("Producto obtenido por ID", product);


const productNotFound = manager.getProductById(9999);
console.log(productNotFound);

const fillname = './products.txt'
const obj = manager

fs.writeFileSync(fillname, JSON.stringify(obj, null, '\t'))
const contenido = JSON.parse(fs.readFileSync(fillname, 'utf-8'))
 contenido.precio= 2000
fs.writeFileSync(fillname, JSON.stringify(contenido,null, '\t'))