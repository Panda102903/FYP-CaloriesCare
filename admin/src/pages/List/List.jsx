import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [editData, setEditData] = useState(null);
    const [image, setImage] = useState(null);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error('Error fetching food list');
        }
    };

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error('Error removing food');
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('id', editData._id);
        formData.append('name', editData.name);
        formData.append('description', editData.description);
        formData.append('price', editData.price);
        formData.append('category', editData.category);
        if (image) {
            formData.append('image', image);
        }

        const response = await axios.put(`${url}/api/food/edit`, formData);
        if (response.data.success) {
            toast.success(response.data.message);
            setEditData(null); // Đóng form chỉnh sửa
            setImage(null);
            fetchList(); // Làm mới danh sách
        } else {
            toast.error('Error updating food');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className="list-table-format">
                        <img src={`${url}/images/${item.image}`} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
                        <div className="actions">
                            <p onClick={() => setEditData(item)} className="edit-cursor">
                                Edit
                            </p>
                            <p onClick={() => removeFood(item._id)} className="delete-cursor">
                                Delete
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {editData && (
                <>
                    {/* Nền mờ */}
                    <div className="edit-form-overlay" onClick={() => setEditData(null)}></div>

                    {/* Form chỉnh sửa */}
                    <div className="edit">
                        <form className="flex-col" onSubmit={handleEditSubmit}>
                            <h3>Edit Food</h3>
                            <div className="edit-img-upload flex-col">
                                <p>Upload Image</p>
                                <label htmlFor="edit-image">
                                    <img
                                        src={image ? URL.createObjectURL(image) : `${url}/images/${editData.image}`}
                                        alt="Food"
                                    />
                                </label>
                                <input
                                    type="file"
                                    id="edit-image"
                                    onChange={handleImageChange}
                                    hidden
                                />
                            </div>
                            <div className="edit-product-name flex-col">
                                <p>Product Name</p>
                                <input
                                    type="text"
                                    name="name"
                                    value={editData.name}
                                    onChange={handleInputChange}
                                    placeholder="Type here"
                                />
                            </div>
                            <div className="edit-product-description flex-col">
                                <p>Product Description</p>
                                <textarea
                                    name="description"
                                    value={editData.description}
                                    onChange={handleInputChange}
                                    rows="6"
                                    placeholder="Write content here"
                                />
                            </div>
                            <div className="edit-category-price">
                                <div className="edit-category flex-col">
                                    <p>Product Category</p>
                                    <select
                                        name="category"
                                        value={editData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Salad">Salad</option>
                                        <option value="Rolls">Rolls</option>
                                        <option value="Deserts">Deserts</option>
                                        <option value="Sandwich">Sandwich</option>
                                        <option value="Cake">Cake</option>
                                        <option value="Pure Veg">Pure Veg</option>
                                        <option value="Pasta">Pasta</option>
                                        <option value="Noodles">Noodles</option>
                                    </select>
                                </div>
                                <div className="edit-price flex-col">
                                    <p>Product Price</p>
                                    <input
                                        type="number"
                                        name="price"
                                        value={editData.price}
                                        onChange={handleInputChange}
                                        placeholder="$10"
                                    />
                                </div>
                            </div>
                            <div className="edit-btn-container">
                                <button type="submit" className="edit-btn save">Save</button>
                                <button
                                    type="button"
                                    className="edit-btn cancel"
                                    onClick={() => setEditData(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}


        </div>
    );
};

export default List;
