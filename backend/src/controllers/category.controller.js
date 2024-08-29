import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Category } from "../models/category.model.js"
const getCategoryById=asyncHandler(async(req,res)=>{
    const {categoryId} = req.params;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new ApiError(404, "Category not found");
        }
        return res.status(200).json(new ApiResponse(200, category, "Category found"));
    } catch (error) {
        throw new ApiError(500, "Unexpected Error", error);
    }
});

const getCategories = asyncHandler(async(req, res) =>{
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
})
export {
    getCategoryById,
    getCategories
}