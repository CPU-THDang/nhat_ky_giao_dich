document.getElementById("write-diary").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn tải lại trang

    let tradeId = localStorage.getItem("currentTradeId") || Date.now().toString();
    
    // Thu thập dữ liệu từ form
    let tradeData = {
        id: tradeId,
        orderType: document.getElementById("order-trade").value,
        date: document.getElementById("datePicker").value,
        icon: document.getElementById("icon").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value,
        reason: document.getElementById("why").value,
        stoploss: document.getElementById("stoploss").value,
        reasonSL: document.getElementById("why-sl").value,
        profit: document.getElementById("profit").value,
        emotion: document.getElementById("emotion").value,
        trading: document.getElementById("trading").value,
        p_l: document.getElementById("p-l").value,
        lesson: document.getElementById("lesson").value,
    };

    // Lưu ID vào localStorage nếu là lần đầu
    if (!localStorage.getItem("currentTradeId")) {
        localStorage.setItem("currentTradeId", tradeId);
    }

    // Gửi dữ liệu lên Google Apps Script
    fetch("https://script.google.com/macros/s/AKfycbxJmeJ342OutGE7sUDa5hVyVMMmxxOWsbOd4eITMqkIkH_bTt4sOp8s_k4GlYSwptmelA/exec", {
        method: "POST",
        body: JSON.stringify(tradeData),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "inserted") {
            alert("Lệnh đã lưu tạm, nhập lần 2 để hoàn thành!");
        } else if (data.status === "updated") {
            alert("Lệnh đã cập nhật thành công!");
            localStorage.removeItem("currentTradeId"); // Xóa ID sau khi cập nhật
        } else {
            alert("Lỗi khi lưu dữ liệu!");
        }
    })
    .catch(error => console.error("Lỗi gửi dữ liệu:", error));
});

// Tải dữ liệu lần 2 khi trang mở lại
function loadTradeData() {
    let tradeId = localStorage.getItem("currentTradeId");
    if (!tradeId) {
        console.log("Không có lệnh đang nhập dở!");
        return;
    }

    fetch(`https://script.google.com/macros/s/AKfycbxJmeJ342OutGE7sUDa5hVyVMMmxxOWsbOd4eITMqkIkH_bTt4sOp8s_k4GlYSwptmelA/exec?id=${tradeId}`)
    .then(response => response.json())
    .then(data => {
        if (data) {
            Object.keys(data).forEach(key => {
                if (document.getElementById(key)) {
                    document.getElementById(key).value = data[key] || "";
                }
            });
        } else {
            alert("Không tìm thấy dữ liệu cho lệnh này!");
        }
    })
    .catch(error => console.error("Lỗi tải dữ liệu:", error));
}

// Gọi dữ liệu khi trang tải xong
window.onload = loadTradeData;

// Xóa dữ liệu
document.getElementById("clear-trade").addEventListener("click", function () {
    localStorage.removeItem("currentTradeId");
    document.getElementById("write-diary").reset();
});
