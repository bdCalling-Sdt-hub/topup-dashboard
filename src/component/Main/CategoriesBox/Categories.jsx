import React, { useState } from "react";
import { Modal, Input, message, Pagination, Card, Button, Row, Col, Checkbox } from "antd";
import { FaPlus } from "react-icons/fa";
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi";
import Url from "../../../redux/baseApi/forImageUrl";
import { IoAddOutline } from "react-icons/io5";

const Categories = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // Change to control items per page

  const [addCatagories] = useAddCategoryMutation();
  const [editCatagories, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery();
  const allMain = allCategories?.data;

  const [deleteCategory] = useDeleteCategoryMutation();

  const [categories, setCategories] = useState([
    { id: 1, name: "Real Estate", image: "/category/all.png" },
    { id: 2, name: "Technology", image: "/category/all.png" },
    { id: 3, name: "Health", image: "/category/all.png" },
    { id: 4, name: "Education", image: "/category/all.png" },
    { id: 5, name: "Finance", image: "/category/all.png" },
    { id: 6, name: "Sports", image: "/category/all.png" },
    { id: 7, name: "Lifestyle", image: "/category/all.png" },
    { id: 8, name: "Food", image: "/category/all.png" },
  ]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const showAddModal = () => {
    setCategoryName("");
    setImage(null);
    setIsAddModalVisible(true);
  };

  const showEditModal = (category) => {
    setCategoryName(category?.name);
    setImage(category?.image);
    setId(category?.id);
    setIsEditModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
    setCategoryName("");
    setImage(null);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setCategoryName("");
    setImage(null);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      message.error("Please enter a category name!");
      return;
    }
    if (!image) {
      message.error("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", image);

    try {
      const res = await addCatagories(formData).unwrap();
      if (res.error) {
        message.error(res.error.data.message);
      }
      if (res.success) {
        message.success("Category added successfully!");
        closeAddModal();
      }
    } catch (error) {
      console.error(error?.data?.message);
      message.error(error?.data?.message);
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData();
    const image2 = form?.image?.files[0];
    if (image2) {
      formData.append("image", image2);
    }
    const categoryName2 = form?.categoryName?.value;
    if (categoryName2) {
      formData.append("name", categoryName2);
    }
    formData.append("id", id);

    try {
      const res = await editCatagories({ data: formData });
      if (res?.data?.error) {
        message.error(res?.data?.error?.data?.message);
      }
      if (res?.data?.success) {
        message.success(res?.data?.message);
        closeEditModal();
      }
    } catch (error) {
      console.log('Error:', error);
      message.error("Error updating category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const res = await deleteCategory(categoryId?.id).unwrap();
      if (res) {
        message.success(res?.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Error deleting category");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategorySelection = (id) => {
    const newSelectedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((categoryId) => categoryId !== id)
      : [...selectedCategories, id];
    setSelectedCategories(newSelectedCategories);
  };

  const handleDeleteSelected = async () => {
    try {
      for (const categoryId of selectedCategories) {
        await deleteCategory(categoryId);
      }
      message.success("Selected categories deleted successfully!");
      setSelectedCategories([]); // Clear selected categories after deletion
    } catch (error) {
      message.error("Error deleting selected categories");
    }
  };

  const paginatedCategories = categories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className="my-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold py-5 ">Pubg UC</h1>

        {/* Delete selected categories */}
        {selectedCategories.length > 0 && (
          <div className="flex justify-end mb-4">
            <button className="px-8 rounded-lg py-3 bg-red-500 text-white" onClick={handleDeleteSelected}>
              Delete Selected
            </button>
          </div>
        )}
      </div>

      {/* Categories Grid */}
      <Row gutter={[16, 16]}>
        {paginatedCategories.map((category) => (
          <Col span={4} key={category.id}>
            <Card
              hoverable
              cover={<img alt={category.name} src={category?.image} />}
            >
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategorySelection(category.id)}
                style={{ position: "absolute", top: 10, right: 10 }}
              />
              <h3 className="text-center">{category.name}</h3>
              <div className="flex justify-between">
                <Button
                  danger
                  onClick={() => handleDeleteCategory(category)}
                >
                  Delete
                </Button>
                <button
                  className="px-5 py-2 bg-[#00adb5] text-white rounded-lg"
                  onClick={() => showEditModal(category)}
                >
                  Edit
                </button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={categories.length}
        onChange={handlePageChange}
        style={{ marginTop: "20px", textAlign: "center" }}
      />

      {/* Add Modal */}
      <Modal
        title="Add Category"
        visible={isAddModalVisible}
        onCancel={closeAddModal}
        footer={null}
      >
        <form onSubmit={handleAddCategory}>
          <div className="my-5">
            <span className="mb-3 font-semibold text-base">Pubg UC Name</span>
            <Input
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="my-5 w-full">
            <span className="mb-3 font-semibold text-base block">Pubg UC Image</span>
            <input
              type="file"
              accept="image/*"
              className="block w-full border-dashed border-gray-300 rounded-lg p-2"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button className="w-full py-3 bg-[#00adb5] text-white rounded-lg" type="submit">
            Add Pubg UC
          </button>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Category"
        visible={isEditModalVisible}
        onCancel={closeEditModal}
        footer={null}
      >
        <form onSubmit={handleEditCategory}>
          <div className="my-5">
            <span className="mb-3 font-semibold text-base">Pubg UC Name</span>
            <Input
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="my-5 w-full">
            <span className="mb-3 font-semibold text-base block">Pubg UC Image</span>
            <img src={Url + image} alt="Category Image" className="w-full mb-4" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button className="w-full py-3 bg-[#00adb5] text-white rounded-lg" type="submit">
            Edit Pubg UC
          </button>
        </form>
      </Modal>

      <div className="flex mt-10">
        <button
          className="px-8 py-3 bg-[#00adb5] text-white rounded-lg flex items-center justify-center gap-2"
          onClick={showAddModal}
        >
          <IoAddOutline className="text-2xl" /> Add Pubg UC
        </button>
      </div>

    </section>
  );
};

export default Categories;
