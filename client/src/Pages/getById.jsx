import React, { useState } from 'react';
import axios from 'axios';

const GetById = () => {
    const [productId, setProductId] = useState('');
    const [category, setCategory] = useState('Laptop');
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState(null);
    const [accessToken,setAccessToken] = useState('') 
    const [regErr,setRegErr] = useState('')
    const [n,setn] = useState(10)

    async function handleGetN(){
        try {
            const res = await axios.get(`http://localhost:8800/api/categories/${category}/products?n=${n}`,{
                headers : {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((res)=> {
                console.log(res)
                setProducts(res.data.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSubmit() {
        try {
            const res = await axios.get(`http://localhost:8800/api/categories/${category}/products/${productId}`);
            setProduct(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleRegister(){
        const res = await axios.post('http://localhost:8800/api/register', {
            email: 'test@test.com',
            password: 'password'
        });
        console.log(res)
        setAccessToken(res.data.data.access_token);
    }

    return (
        <div className=''>
            <button className='font-bold border-2 border-black my-3 px-2 py-1 mx-2' onClick={handleRegister}>Register</button>
            <span className='text-green-500'>{regErr}</span>
            <div className='border-[1px] border-black p-3 my-3'>
            <input type="text" className='border-[1px] border-black mx-2' placeholder='Enter Product Id' value={productId} onChange={e => setProductId(e.target.value)} />
            <input type="text" className='border-[1px] border-black mx-2' placeholder='Enter Category' value={category} onChange={e => setCategory(e.target.value)} />
            <button onClick={handleSubmit} className='border-2 border-black px-3 mx-3'>Get Product</button>
            </div>
            {/* <span>{accessToken}</span> */}
            <div className='border-2 border-black p-3 my-3'>
                <h2 className='font-bold'>Product Details By Id - </h2>
                {
                product && (
                    <div>
                        <h2>Product Details</h2>
                        <p>ID: {product.id}</p>
                        <p>Name: {product.productName}</p>
                        <p>Price: {product.price}</p>
                        <p>Rating: {product.rating}</p>
                        <p>Discount: {product.discount}</p>
                        <p>Availability: {product.availability}</p>
                        <p>discount: {product.discount}</p>
                        <p>Company: {product.company}</p>
                    </div>
                )}
            </div>
            <div>
                <input type="text" placeholder='get N products from each company' value={n} onChange={e => setn(e.target.value)} />
                <button className='border-2 border-black mx-2 px-3' onClick={handleGetN}>Get N</button>
            </div>
            {/* //populateProducts */}
            <h2 className="font-bold"> All Products - </h2>
            {products && products.map((product,index) => (<li key={index}>{JSON.stringify(product)}</li>))}
        </div>
    );
}

export default GetById;
