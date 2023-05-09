import express from "express";
import ProductManager from "./ProductManager.js";
const app = express();

const manager = new ProductManager

app.use(express.urlencoded({extended:true}))

app.get("/products", async(req, res)=>{
    let products = await manager.getProducts()
    let { limit } = req.query;
    let limitProducts = limit ? products.slice(0, limit) : products
    res.send(limitProducts)
})

app.get("/products/:id", async (req, res)=>{
    let products = await manager.getProducts()
    let id = req.params.id
    let idProduct = products.find(prod => prod.id == id)
    res.send(idProduct)
})


const server = app.listen(8080, ()=>{
    console.log("Server Runing on port 8080");
})