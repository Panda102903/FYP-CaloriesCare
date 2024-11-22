import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

//edit food item
const editFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // Nếu có file hình ảnh mới được tải lên
        if (req.file) {
            // Xóa hình ảnh cũ
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.log("Failed to delete old image:", err);
            });
            // Gán hình ảnh mới
            food.image = req.file.filename;
        }

        // Cập nhật các thuộc tính khác
        food.name = req.body.name || food.name;
        food.description = req.body.description || food.description;
        food.price = req.body.price || food.price;
        food.category = req.body.category || food.category;

        // Lưu lại vào cơ sở dữ liệu
        await food.save();
        res.json({ success: true, message: "Food updated successfully", data: food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food item" });
    }

}

export { addFood, listFood, removeFood, editFood }