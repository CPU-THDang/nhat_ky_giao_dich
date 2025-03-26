document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("write-diary");
    const clearBtn = document.createElement("button"); // Tạo nút Clear
    clearBtn.textContent = "Clear";
    clearBtn.type = "button";
    document.getElementById("submit").appendChild(clearBtn);

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn form tải lại trang

        let formData = {
            orderTrade: document.getElementById("order-trade").value,
            date: document.getElementById("datePicker").value,
            icon: document.getElementById("icon").value,
            quantity: parseFloat(document.getElementById("quantity").value) || 0,
            price: parseFloat(document.getElementById("price").value) || 0,
            why: document.getElementById("why").value,
            stoploss: parseFloat(document.getElementById("stoploss").value) || 0,
            whySl: document.getElementById("why-sl").value,
            profit: parseFloat(document.getElementById("profit").value) || 0,
            emotion: document.getElementById("emotion").value,
            trading: document.getElementById("trading").value,
            "p-l": parseFloat(document.getElementById("p-l").value) || 0,
            lesson: document.getElementById("lesson").value,
        };

        // Gửi dữ liệu lên Google Sheets thông qua Google Apps Script
        fetch("YOUR_GOOGLE_SCRIPT_URL", {
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
