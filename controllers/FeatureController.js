import { Food } from "../models/Food";
import { User } from "../models/User";


// ADD TO CART
const addToCart = async (req, res) => {

    const userId = req.params.id;
    const {id, name, price, rating, image, quantity } = req.body;

    try {
        
        let existingItem = await Food.findOne({id, userId: userId})

        if(existingItem) {
            let updatedItem = await Food.findOneAndUpdate({id, userId}, {
                $set: {
                    quantity: existingItem.quantity + 1,
                    totalPrice: existingItem.price * (existingItem.quantity + 1)
                }
            },
            {
                upsert: true,
                new: true
            }
        )

        if(!updatedItem) {
            return res.status(400).json({success: false, message: "Failed to add to cart"})
        }
        return res.status(200).json({success: true, message: "Added to cart"})
        }

        let newFood = await Food.create({
            id,
            name,
            price,
            rating,
            image, 
            quantity,
            userId,
            totalPrice: price * quantity
        });

        const savedFood = await newFood.save()

        let user = await User.findOneAndUpdate({_id: userId}, {
            $push: {
                cartItems: savedFood._id,
            }
        })

        if(!user) {
            return res
              .status(400)
              .json({ success: false, message: "Failed to add to cart" })
        }


    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

// GET CART ITEMS ROUTE
const getCart = async (req, res) => {
    const userId = req.params.id

    try {
        
        const cartItems = await Food.find({userId})

        if(!cartItems) {
            return res.status(400).json({success: false, message: "No items found"})
        }

        return res.status(200).json({success: true, cartItems, message: "Cart Items fetched successfully"})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

// REMOVE FROM CART ROUTE
const removeFromCart = async (req, res) => {
    const id = req.params.id;

    try {
        
        let food = await Food.findOneAndDelete({_id: id})

        if(!food) {
            return res.status(400).json({success: false, message: "Food not found"})
        }

        return res.status(200).json({success: true, message: "Removed from cart"})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}