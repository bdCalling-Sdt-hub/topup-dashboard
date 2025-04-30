import React, { useState } from 'react';
import { Table, Pagination, Checkbox } from 'antd';
import { TbSend } from 'react-icons/tb';

const SelectedUser = () => {
    // Sample Data for the Table
    const data = [
        { id: 1, name: 'Christopher Brown', email: 'danghoang87h1@gmail.com', phone: '+7 (903) 941-02-27', date: '15 May 2020 9:00 am', amount: '20.00 USD' },
        { id: 2, name: 'David Anderson', email: 'binhan628@gmail.com', phone: '+7 (903) 840-31-53', date: '15 May 2020 9:30 am', amount: '20.00 USD' },
        { id: 3, name: 'Thomas Patterson', email: 'vuhaitthuongnute@gmail.com', phone: '+7 (903) 880-93-38', date: '15 May 2020 8:30 am', amount: '20.00 USD' },
        { id: 4, name: 'Mark Moore', email: 'manhhacht08@gmail.com', phone: '+7 (903) 880-91-85', date: '15 May 2020 8:30 am', amount: '20.00 USD' },
        { id: 5, name: 'Daniel Bailey', email: 'thuhang.nute@gmail.com', phone: '+7 (903) 134-55-26', date: '15 May 2020 9:00 am', amount: '20.00 USD' },
        { id: 6, name: 'Robert Thompson', email: 'tranthuy.nute@gmail.com', phone: '+7 (903) 679-96-15', date: '15 May 2020 8:00 am', amount: '20.00 USD' },
        { id: 7, name: 'Charles Cook', email: 'nvt.isst.nute@gmail.com', phone: '+7 (903) 134-55-26', date: '15 May 2020 9:30 am', amount: '20.00 USD' },
        { id: 8, name: 'Charles Cook', email: 'nvt.isst.nute@gmail.com', phone: '+7 (903) 134-55-26', date: '15 May 2020 9:30 am', amount: '20.00 USD' },
        { id: 9, name: 'Charles Cook', email: 'nvt.isst.nute@gmail.com', phone: '+7 (903) 134-55-26', date: '15 May 2020 9:30 am', amount: '20.00 USD' },
        { id: 10, name: 'Charles Cook', email: 'nvt.isst.nute@gmail.com', phone: '+7 (903) 134-55-26', date: '15 May 2020 9:30 am', amount: '20.00 USD' },
    ];

    // Initialize selected row keys state
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    console.log(selectedRowKeys);

    // Handle row selection
    const handleSelectRow = (id) => {
        const newSelectedRowKeys = [...selectedRowKeys];
        if (newSelectedRowKeys.includes(id)) {
            const index = newSelectedRowKeys.indexOf(id);
            newSelectedRowKeys.splice(index, 1);
        } else {
            newSelectedRowKeys.push(id);
        }
        setSelectedRowKeys(newSelectedRowKeys);
    };

    // Handle select all
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allRowKeys = data.map((item) => item.id);
            setSelectedRowKeys(allRowKeys);
        } else {
            setSelectedRowKeys([]);
        }
    };

    // Check if all rows are selected
    const isAllSelected = selectedRowKeys.length === data.length;

    // Table Columns
    const columns = [
        {
            title: <Checkbox onChange={handleSelectAll} checked={isAllSelected} />,
            dataIndex: 'select',
            key: 'select',
            render: (text, record) => (
                <Checkbox
                    checked={selectedRowKeys.includes(record.id)}
                    onChange={() => handleSelectRow(record.id)}
                />
            ),
        },
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1, // Auto-increment the ID
        },
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
    ];

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Pagination
    const paginationProps = {
        current: currentPage,
        pageSize: pageSize,
        total: data.length,
        onChange: handlePageChange,
        showSizeChanger: false,
    };

    return (
        <div className="sm:p-8 p-2 overflow-x-auto">
            <div className='flex justify-between mb-5'>
                <h2 className="text-2xl font-semibold mb-4">Setting</h2>
                <button disabled={selectedRowKeys.length === 0} className={`text-white py-2 px-10 bg-[#00adb5] rounded flex items-center gap-2 ${selectedRowKeys.length === 0 && 'bg-[#536566] text-gray-400'}`}>Send Notificaiton <TbSend className='text-xl' /></button>
            </div>

            <div className='min-w-[1000px]'>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={paginationProps}
                    rowKey="id"
                    bordered
                    className="mb-6"
                />
            </div>

        </div>
    );
};

export default SelectedUser;
