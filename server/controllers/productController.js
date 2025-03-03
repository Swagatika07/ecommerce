// import productModel from "../models/productModel";
import productModel from "../models/productModel.js";


// function for adding product
const addProduct = async(req,res) => {
    try{
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body;
        const image1 = req.files.image1[0];
        const image2 = req.files.image2[0];
        const image3 = req.files.image3[0];
        const image4 = req.files.image4[0];

        console.log(name, description, price, category, subCategory, sizes, bestseller);
        // console.log(image1, image2, image3, image4);

        // const date = new Date().getTime();
        // const product = new Product({
        //     name,
        //     description,
        //     price,
        //     image,
        //     category,
        //     subCategory,
        //     sizes,
        //     date,
        //     bestseller
        // });
        // await product.save();
        res.status(200).send('Product added successfully');

    } catch(err){
        console.log(err);
        res.status(500).send('Internal server error');
    }
}

// function for list product
const listProducts = async(req,res) => {
    
}
// function for removing product
const removeProduct = async(req,res) => {
    
}
// function for single product information
const singleProduct = async(req,res) => {
    
}

// function for update product
const updateProduct = async(req, res) => {

}

export {addProduct, listProducts, removeProduct, singleProduct, updateProduct}