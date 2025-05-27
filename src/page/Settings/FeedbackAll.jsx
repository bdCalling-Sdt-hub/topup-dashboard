import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

// Sample data
const data = [
    {
        key: '1',
        name: 'John Brown',
        feedback: 'Great service!',
        date: '2025-05-27',
        details: 'John said the service was quick and helpful.',
    },
    {
        key: '2',
        name: 'Jane Smith',
        feedback: 'Could be better.',
        date: '2025-05-26',
        details: 'Jane felt the response time was slow.',
    },
    {
        key: '3',
        name: 'Michael Lee',
        feedback: 'Excellent support team.',
        date: '2025-05-25',
        details: 'Michael praised the professionalism of the support.',
    },
    // Add more data if you want to test pagination better
];

const FeedbackAll = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    // Columns definition with custom header styling
    const columns = [
        {
            title: <span className="text-white">#SL</span>,
            key: 'sl',
            render: (text, record, index) => index + 1,  // Serial number per page
            width: 60,
        },
        {
            title: <span className="text-white">Name</span>,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <span className="text-white">Feedback</span>,
            dataIndex: 'feedback',
            key: 'feedback',
        },
        {
            title: <span className="text-white">Date</span>,
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: <span className="text-white">Action</span>,
            key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => showModal(record)}>
                    <FaEye className="text-[#00adb5] text-xl" />
                </Button>
            ),
        },
    ];

    // Show modal with selected row details
    const showModal = (record) => {
        setSelectedRow(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setSelectedRow(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedRow(null);
    };

    return (
        <div className="">
            <div className="flex justify-between items-center py-5">
                <Link to="/settings" className="flex gap-4 items-center">
                    <IoChevronBack className="text-2xl" />
                    <h1 className="text-2xl font-semibold">Settings / Feedback</h1>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}  // enable pagination, 5 rows per page
                bordered
                className="ant-table-thead text-white"
                rowKey="key"
            />

            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Close"
                width={600}
            >
                <h2 className='text-2xl font-semibold'>Feedback Details</h2>
                {selectedRow && (
                    <p className='text-base my-5'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis corporis ipsam saepe officiis laborum vitae tempora quia fugiat ut. Doloremque excepturi natus recusandae minus consequatur debitis et nihil dolor! Incidunt aliquid ullam pariatur molestiae quos ratione commodi alias est exercitationem, error minus inventore! Vel voluptates, ad perferendis doloribus explicabo consequuntur?
                    </p>
                )}
            </Modal>

            <style jsx global>{`
                /* Override Ant Design table header bg color */
                .ant-table-thead > tr > th {
                    background-color: #00adb5 !important; /* Tailwind blue-ish */
                    color: white !important;
                }
            `}</style>
        </div>
    );
};

export default FeedbackAll;
