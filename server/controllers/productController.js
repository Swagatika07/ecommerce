// import productModel from "../models/productModel";
import productModel from "../models/productModel.js";


// function for adding product
const addProduct = async(req,res) => {
    try{
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

       
        const images = [image1, image2, image3, image4].filter(item => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
            return result.secure_url;
            })
        );

        console.log(name, description, price, category, subCategory, sizes, bestseller);
        console.log(image1, image2, image3, image4);
        console.log(imagesUrl);
        
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false,
            images: imagesUrl,
            date: Date.now()
        }
        console.log(productData);
        const product = new productModel(productData);
        await product.save();
        res.status(200).send('Product added successfully');

    } catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// function for list product
const listProducts = async(req,res) => {
    try {
        const products = await productModel.find({});
        res.json({success: true, products});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}
// function for removing product
const removeProduct = async(req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).send('Product removed successfully');
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}
// function for single product information
const singleProduct = async(req,res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, product});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// function for update product
const updateProduct = async(req, res) => {

}

export {addProduct, listProducts, removeProduct, singleProduct, updateProduct}