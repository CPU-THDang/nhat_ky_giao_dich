document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("write-diary");
    const clearBtn = document.createElement("button"); // Tạo nút Clear
    clearBtn.textContent = "Clear";
    clearBtn.type = "button";
    document.getElementById("submit").appendChild(clearBtn);

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn form tải lại trang

        // Lấy ngày từ input
        let dateValue = document.getElementById("datePicker").value;
        if (!dateValue) {
            alert("Vui lòng chọn ngày!");
            return;
        }

        // Lấy giờ hiện tại
        let now = new Date();
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        let seconds = String(now.getSeconds()).padStart(2, '0');

        // Gộp ngày + giờ thành một chuỗi
        let fullDateTime = `${dateValue} ${hours}:${minutes}:${seconds}`;
        let USDT = "/USDT";
        let formData = {
            orderTrade: document.getElementById("order-trade").value,
            date: fullDateTime, // Lưu cả ngày và giờ
            icon: document.getElementById("icon").value + USDT,
            quantity: parseFloat(document.getElementById("quantity").value) || 0,
            price: parseFloat(document.getElementById("price").value) || 0,
            why: document.getElementById("why").value,
            stoploss: parseFloat(document.getElementById("stoploss").value) || 0,
            whySl: document.getElementById("why-sl").value,
            profit: parseFloat(document.getElementById("profit").value) || 0,
            emotion: document.getElementById("emotion").value,
            trading: document.getElementById("trading").value,
            "p-l": (document.getElementById("p-l").value),
            lesson: document.getElementById("lesson").value,
        };

        // Gửi dữ liệu lên Google Sheets thông qua Google Apps Script
        fetch("https://script.google.com/macros/s/AKfycbxJmeJ342OutGE7sUDa5hVyVMMmxxOWsbOd4eITMqkIkH_bTt4sOp8s_k4GlYSwptmelA/exec", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        .then(() => {
            alert("Dữ liệu đã được gửi lên Google Sheets!");
        })
        .catch((error) => {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Gửi dữ liệu thất bại!");
        });
    });

    // Xử lý nút "Clear" để xóa dữ liệu form
    clearBtn.addEventListener("click", function () {
        form.reset(); // Xóa toàn bộ dữ liệu trong form
    });
});
