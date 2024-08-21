const fs = require('node:fs/promises');
const path = require('node:path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const getAllProducts = async (req, res) => {
    
    try {
        const data = await fs.readFile(productsFilePath, 'utf8');
        const products = JSON.parse(data);
        return res.json(products);
        
}   catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }}

const getProductsCategory = async (req, res) => {
        try {
            const data = await fs.readFile(productsFilePath, 'utf8');
            const products = JSON.parse(data);
            const category = req.params.category.toLowerCase();
            const productsByCategory = products.filter(product => product.category.toLowerCase() === category);       
            res.json(productsByCategory);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }}

    const postProducts = async (req, res) => {
        try {
            const { name, category } = req.body;
    
            if (!name) {
                return res.status(400).json({ error: 'Product name is required' });
            }
            if (!category) {
                return res.status(400).json({ error: 'Product category is required' });
            }

            const data = await fs.readFile(productsFilePath, 'utf8');
            const products = JSON.parse(data);
    
            const lastProduct = products[products.length - 1];
            const newId = lastProduct ? lastProduct.id + 1 : 1;
    
            const newProduct = { id: newId, name: name, category: category };
    
            products.push(newProduct);

            await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));

            return res.status(201).json(newProduct);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    module.exports = {getAllProducts, getProductsCategory, postProducts }
