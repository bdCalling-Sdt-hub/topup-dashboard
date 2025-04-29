import { useEffect, useState } from "react";
import { ConfigProvider, Table, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";

const { Item } = Form;

const Users = () => {
  // Static users data
  const allUsers = [
    {
      id: 1,
      fullName: "John Doe",
      accountID: "A12345",
      email: "john.doe@example.com",
      phoneNumber: "+1234567890",
      address_line1: "123 Main St",
      createdAt: "2023-01-15T10:30:00Z",
      imageUrl: "https://example.com/image1.jpg",
      status: "Active",
      gender: "Male",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      accountID: "B67890",
      email: "jane.smith@example.com",
      phoneNumber: "+0987654321",
      address_line1: "456 Elm St",
      createdAt: "2023-02-20T12:15:00Z",
      imageUrl: "https://example.com/image2.jpg",
      status: "Inactive",
      gender: "Female",
    },
    {
      id: 3,
      fullName: "Michael Johnson",
      accountID: "C11223",
      email: "michael.johnson@example.com",
      phoneNumber: "+1122334455",
      address_line1: "789 Oak St",
      createdAt: "2023-03-10T09:00:00Z",
      imageUrl: "https://example.com/image3.jpg",
      status: "Active",
      gender: "Male",
    },
    // Add more static users as needed
  ];

  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState([]); // Store filtered data

  // Format static user data
  useEffect(() => {
    const formattedUsers = allUsers.map((user, index) => ({
      id: user.id,
      si: index + 1,
      fullName: user.fullName,
      accountID: user.accountID,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address_line1: user.address_line1,
      createdAt: user.createdAt,
      imageUrl: user.imageUrl,
      status: user.status,
      gender: user.gender,
    }));
    setDataSource(formattedUsers);
  }, []);

  // Search Filter
  useEffect(() => {
    if (searchText.trim() === "") {
      setDataSource(allUsers || []);
    } else {
      setDataSource(
        allUsers.filter(
          (user) =>
            user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase()) ||
            String(user.phoneNumber).includes(searchText)
        )
      );
    }
  }, [searchText]);

  // Date Filter
  useEffect(() => {
    if (!selectedDate) {
      setDataSource(allUsers || []);
    } else {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      setDataSource(
        allUsers.filter(
          (user) => moment(user.createdAt).format("YYYY-MM-DD") === formattedDate
        )
      );
    }
  }, [selectedDate]);

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      },
    },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/users/${record.id}`}>
          <GoInfo className="text-2xl" />
        </Link>
      ),
    },
  ];

  return (
    <section>
      <div className="md:flex justify-between items-center py-6 mb-4">
        <Link to={"/collaborator"} className="text-2xl flex items-center">
          <FaAngleLeft /> Users List
        </Link>
        <Form layout="inline" className="flex space-x-4">
          <Item name="date">
            <DatePicker
              className="rounded-md border border-[#92b8c0]"
              onChange={(date) => setSelectedDate(date)}
              placeholder="Select Date"
            />
          </Item>
          <Item name="username">
            <Input
              className="rounded-md w-[70%] md:w-full border border-[#92b8c0]"
              placeholder="User Name"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Item>
          <Item>
            <button className="size-8 rounded-full flex justify-center items-center bg-[#92b8c0] text-black">
              <IoIosSearch className="size-5" />
            </button>
          </Item>
        </Form>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#00adb5",
              headerColor: "#fff",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            onChange: setCurrentPage,
          }}
          scroll={{ x: "max-content" }}
          responsive={true}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
        />
      </ConfigProvider>
    </section>
  );
};

export default Users;
