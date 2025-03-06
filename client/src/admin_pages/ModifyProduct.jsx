import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModifyProduct = ({ product }) => {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [sizes, setSizes] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product) {
      setProductId(product.id);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setSubCategory(product.subCategory);
      setSizes(product.sizes.join(', '));
      setBestseller(product.bestseller);
    }
  }, [product]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('sizes', sizes);
    formData.append('bestseller', bestseller);

    images.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    try {
      const response = await axios.put('/api/products/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data);
      // Clear form fields after successful update
      setProductId('');
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setSubCategory('');
      setSizes('');
      setBestseller(false);
      setImages([]);
    } catch (error) {
      console.error(error);
      alert('Error updating product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full items-start gap-3'>
      <div>
        <label>Product ID</label>
        <input type='text' value={productId} onChange={(e) => setProductId(e.target.value)} required />
      </div>
      <div>
        <label>Product Name</label>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Price</label>
        <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Category</label>
        <input type='text' value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      <div>
        <label>Sub-Category</label>
        <input type='text' value={subCategory} onChange={(e) => setSubCategory(e.target.value)} required />
      </div>
      <div>
        <label>Sizes</label>
        <input type='text' value={sizes} onChange={(e) => setSizes(e.target.value)} required />
      </div>
      <div>
        <label>Bestseller</label>
        <input type='checkbox' checked={bestseller} onChange={(e) => setBestseller(e.target.checked)} />
      </div>
      <div>
        <label>Upload Images</label>
        <input type='file' multiple onChange={handleImageChange} />
      </div>
      <button type='submit'>Update Product</button>
    </form>
  );
};

export default ModifyProduct;
