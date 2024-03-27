import express from 'express'
import axios from 'axios'
import fs from 'fs'
const router = express.Router()

import {login} from '../controllers/Auth.js'

router.post('/register', login)
router.get('/categories/:cat_name/products', async (req, res) => {
    try {
        const category_name = req.params.cat_name;
        const n = req.query.n;
        const responses = [];
        const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
        const bearerToken = req.headers.authorization;
        // const url = `http://20.244.56.144/test/companies/AMZ/categories/${category_name}/products?top=${n}&minPrice=1&maxPrice=10000000`
        // console.log(url)
        for (const company of companies) {
            const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category_name}/products?top=${n}&minPrice=1&maxPrice=10000000`, {
                headers: {
                    Authorization: bearerToken
                }
            });
            const companyProducts = response.data.map(product => ({
                ...product,
                company: company
            }));
            responses.push(companyProducts);
        }

        const allProducts = responses.flatMap(response => response);

        const productsWithIds = allProducts.map((product, index) => ({
            id: index + 1,
            ...product
        }));

        fs.writeFileSync('products.json', JSON.stringify(productsWithIds, null, 2));

        res.json({ message: 'Products data saved to products.json', data: productsWithIds});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/categories/:category_name/products/:productId', (req, res) => {
    try {
        const category_name = req.params.category_name;
        const productId = parseInt(req.params.productId);

        const productsData = fs.readFileSync('products.json', 'utf8');
        const products = JSON.parse(productsData);

        const product = products.find(product => product.id === productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router