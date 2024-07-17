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
        console.error("Error fetching category by ID:", error);
        throw new ApiError(500, "Something unexpected occurred while fetching category details");
    }
});

export {
    getCategoryById
}