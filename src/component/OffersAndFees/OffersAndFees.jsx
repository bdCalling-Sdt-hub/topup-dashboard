import React, { useState } from 'react';
import { Modal, Input, message, Button } from 'antd';  // Import Ant Design Modal, Input, and Button
import { IoMdInformationCircleOutline } from 'react-icons/io'; // Info Icon
import { Tooltip } from 'antd';
import { RxCross2 } from 'react-icons/rx';

const OffersAndFees = () => {
    const [selectedOption, setSelectedOption] = useState('1');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [promoCodeType, setPromoCodeType] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [promoCodeValue, setPromoCodeValue] = useState('');

    const topUpAmount = 100;
    const giftCardAmount = 100;

    const calculateTotalPrice = (amount, feePercentage) => {
        return (amount * (1 + feePercentage / 100)).toFixed(2);
    };

    const calculateEarnings = (amount, feePercentage) => {
        return (amount * (feePercentage / 100)).toFixed(2);
    };

    // Handle form submission for new promo code
    const handleCreatePromoCode = () => {
        if (!promoCodeType || !promoCode || !promoCodeValue) {
            message.error('Please fill in all the fields');
            return;
        }

        // Here, you can save the promo code data to the backend or state
        console.log({
            promoCodeType,
            promoCode,
            promoCodeValue,
        });

        message.success('Promo code created successfully');
        setIsModalVisible(false); // Close the modal
    };

    return (
        <div className="p-8">
            {/* Offers & Fees Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold">Offers & Fees</h2>
                <p className="text-sm text-gray-500">Set your commission for top-ups and gift cards</p>

                <div className="mt-4 rounded-lg grid md:grid-cols-3 gap-2">
                    <table className="w-full bg-[#F0F9FF] table-auto text-left md:col-span-1 rounded-lg text-base">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 text-base font-semibold">Fee Type</th>
                                <th className="py-2 px-4 text-base font-semibold text-center">Percentage Input (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Top-Up Fee Row */}
                            <tr className="">
                                <td className="py-2 px-4">Top-Up Fee</td>
                                <td className="py-2 px-4 ">
                                    <input type="text"
                                        className='bg-[#ffffff] py-2 ring-0 focus:outline-none w-full text-center'
                                        defaultValue={5} />
                                </td>
                            </tr>

                            {/* Gift Card Fee Row */}
                            <tr className="">
                                <td className="py-2 px-4">Gift Card Fee</td>
                                <td className="py-2 px-4">
                                    <input type="text"
                                        className='bg-[#ffffff] py-2 ring-0 focus:outline-none w-full text-center'
                                        defaultValue={10} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table border={1} className="w-full md:col-span-2 !border-2 !rounded-lg border-[#F0F9FF] table-auto text-left border-collapse  ">
                        <thead>
                            <tr className="border-b border-[#F0F9FF]">
                                <th className="py-2 px-4 text-base font-semibold">Fee Type</th>
                                <th className="py-2 px-4 text-base font-semibold">Percentage Input (%)</th>
                                <th className="py-2 px-4 text-base font-semibold">Transaction Amount</th>
                                <th className="py-2 px-4 text-base font-semibold">Fee Percentage</th>
                                <th className="py-2 px-4 text-base font-semibold">Total Price</th>
                                <th className="py-2 px-4 text-base font-semibold">Your Earnings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Top-Up Fee Row */}
                            <tr className="bg-white border-b border-[#F0F9FF]">
                                <td className="py-2 px-4 border-r border-[#F0F9FF]">Top-Up Fee</td>
                                <td className="py-2 px-4 text-center border-r border-[#F0F9FF]">5</td>
                                <td className="py-2 px-4 border-r border-[#F0F9FF]">$100 Top-Up</td>
                                <td className="py-2 px-4 border-r border-[#F0F9FF]">5%</td>
                                <td className="py-2 px-4 border-r border-[#F0F9FF]">${calculateTotalPrice(topUpAmount, 5)}</td>
                                <td className="py-2 px-4">${calculateEarnings(topUpAmount, 5)}</td>
                            </tr>

                            {/* Gift Card Fee Row */}
                            <tr className="bg-white">
                                <td className="py-2 px-4 border-r border-[#F0F9FF]">Gift Card Fee</td>
                                <td className="py-2 px-4 text-center border-r border-[#F0F9FF]">10</td>
                                <td className="py-2 px-4 border-r border-[#F0F9FF]">$100 Gift Card</td>
                                <td className="py-2 px-4 border-r border-[#F0F9FF]">10%</td>
                                <td className="py-2 px-4 border-r border-[#F0F9FF]">${calculateTotalPrice(giftCardAmount, 10)}</td>
                                <td className="py-2 px-4">${calculateEarnings(giftCardAmount, 10)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Promo Code Section */}
            <div>
                <h2 className="text-2xl font-semibold">Promo Code</h2>
                <p className="text-sm text-gray-500">Manage your promo codes</p>

                <div className="mt-4 bg-[#F0F9FF] !rounded-lg overflow-hidden">
                    <table className="w-full table-auto text-left">
                        <thead className='bg-[#00adb5] text-white'>
                            <tr>
                                <th className="py-3 px-4 text-xl font-semibold">Promo Code Type</th>
                                <th className="py-3 px-4 text-xl font-semibold">Promo Code</th>
                                <th className="py-3 px-4 text-xl font-semibold">Promo Code Value</th>
                                <th className="py-3 px-4 text-xl font-semibold">Used</th>
                                <th className="py-3 px-4 text-xl font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className='!border rounded-lg'>
                            <tr className="bg-white !border-b">
                                <td className="py-3 px-4">Top-Up</td>
                                <td className="py-3 px-4">Top-Up 0011</td>
                                <td className="py-3 px-4">5%</td>
                                <td className="py-3 px-4">8500 times</td>
                                <td className="py-3 px-4">
                                    <button className="text-red-500"><RxCross2 className='text-2xl' /></button>
                                </td>
                            </tr>
                            <tr className="bg-white !border-b">
                                <td className="py-3 px-4">Gift Card</td>
                                <td className="py-3 px-4">Gift143</td>
                                <td className="py-3 px-4">10%</td>
                                <td className="py-3 px-4">8500 times</td>
                                <td className="py-3 px-4">
                                    <button className="text-red-500"><RxCross2 className='text-2xl' /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Create New Button */}
                <div className="mt-4">
                    <button
                        className="bg-[#00ADB5] text-white py-2 px-6 rounded-lg"
                        onClick={() => setIsModalVisible(true)}
                    >
                        Create New
                    </button>
                </div>
            </div>

            {/* Modal for creating a new promo code */}
            <Modal
                title="Create New Promo Code"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Promo Code Type</label>
                        <select className='w-full py-2 px-4 border rounded bg-gray-100' name="PromoCodeType" id="">
                            <option value="Top-Up">Top-Up</option>
                            <option value="Gift-Card">Gift Card</option>
                            <option value="Gift-Card">Pubg Card</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Promo Code</label>
                        <input
                            type="text"
                            placeholder='Promo Code'
                            className="w-full py-2 px-4 border rounded bg-gray-100"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Promo Code Value</label>
                        <input
                            type="text"
                            placeholder='Promo Code Value'
                            className="w-full py-2 px-4 border rounded bg-gray-100"
                            value={promoCodeValue}
                            onChange={(e) => setPromoCodeValue(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button onClick={() => setIsModalVisible(false)} className="bg-gray-500 text-white">
                            Cancel
                        </Button>
                        <Button onClick={handleCreatePromoCode} className="bg-[#00ADB5] text-white">
                            Create
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default OffersAndFees;
