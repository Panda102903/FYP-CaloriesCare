import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
        if (response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/");
        }
    };

    const cancelTransaction = async () => {
        try {
            await axios.post(`${url}/api/order/cancel`, { orderId });
            console.log("Transaction canceled successfully");
        } catch (error) {
            console.error("Failed to cancel transaction:", error);
        }
    };

    useEffect(() => {
        verifyPayment();

        // Hàm xử lý khi người dùng nhấn nút "Back"
        const handlePopState = async () => {
            const confirmCancel = window.confirm(
                "Are you sure you want to cancel this transaction? This action cannot be undone."
            );
            if (confirmCancel) {
                // Hủy giao dịch
                await cancelTransaction();
                navigate("/"); // Điều hướng về trang chính
            } else {
                // Giữ người dùng ở lại trang hiện tại
                navigate(0); // Refresh trang
            }
        };

        // Lắng nghe sự kiện popstate
        window.addEventListener("popstate", handlePopState);

        return () => {
            // Xóa bỏ sự kiện khi component bị unmount
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
