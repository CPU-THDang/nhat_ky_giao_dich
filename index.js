document.getElementById("write-diary").addEventListener("submit", function (event) {
    event.preventDefault();  // Ngăn form tải lại trang
    
    var tradeId = document.getElementById("write-diary").dataset.tradeId || Date.now().toString(); // Tạo mã lệnh nếu chưa có
    var formData = {
        tradeId: tradeId,
        orderType: document.getElementById("order-trade").value,
        date: document.getElementById("datePicker").value,
        pair: document.getElementById("icon").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value,
        reason: document.getElementById("why").value,
        stoploss: document.getElementById("stoploss").value,
        stoplossReason: document.getElementById("why-sl").value,
        takeProfit: document.getElementById("profit").value,
        emotions: document.getElementById("emotion").value,
        process: document.getElementById("trading").value,
        profitLoss: document.getElementById("p-l").value,
        lessons: document.getElementById("lesson").value
    };

    fetch("https://script.google.com/macros/s/AKfycbxJmeJ342OutGE7sUDa5hVyVMMmxxOWsbOd4eITMqkIkH_bTt4sOp8s_k4GlYSwptmelA/exec", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json()).then(data => {
        alert("Dữ liệu đã được lưu thành công!");
        document.getElementById("write-diary").dataset.tradeId = tradeId; // Giữ mã lệnh để lần 2 cập nhật tiếp
    }).catch(error => console.error("Lỗi khi gửi dữ liệu:", error));
});

window.onload = function () {
    fetch("https://script.google.com/macros/s/AKfycbxJmeJ342OutGE7sUDa5hVyVMMmxxOWsbOd4eITMqkIkH_bTt4sOp8s_k4GlYSwptmelA/exec")
    .then(response => response.json())
    .then(data => {
        let select = document.getElementById("load-trade");
        select.innerHTML = '<option value="">Chọn lệnh cần tiếp tục</option>';
        
        data.forEach(trade => {
            let option = document.createElement("option");
            option.value = trade.tradeId;
            option.textContent = `Lệnh ${trade.tradeId} - ${trade.date}`;
            select.appendChild(option);
        });
    }).catch(error => console.error("Lỗi khi tải dữ liệu:", error));
};

// Khi chọn lệnh, tải dữ liệu lên form
document.getElementById("load-trade").addEventListener("change", function () {
    let tradeId = this.value;
    if (!tradeId) return;

    fetch("YOUR_GOOGLE_SCRIPT_URL")
    .then(response => response.json())
    .then(data => {
        let trade = data.find(t => t.tradeId === tradeId);
        if (trade) {
            document.getElementById("write-diary").dataset.tradeId = tradeId;
            document.getElementById("datePicker").value = trade.date;
            document.getElementById("icon").value = trade.pair;
            document.getElementById("quantity").value = trade.quantity;
            document.getElementById("price").value = trade.price;
            document.getElementById("why").value = trade.reason;
            document.getElementById("stoploss").value = trade.stoploss;
            document.getElementById("why-sl").value = trade.stoplossReason;
            document.getElementById("profit").value = trade.takeProfit;
            document.getElementById("emotion").value = trade.emotions;
            document.getElementById("trading").value = trade.process;
            document.getElementById("p-l").value = trade.profitLoss;
            document.getElementById("lesson").value = trade.lessons;
        }
    }).catch(error => console.error("Lỗi khi tải dữ liệu:", error));
});

//làm sạch dữ liệu

document.getElementById("clear-form").addEventListener("click", function () {
    document.getElementById("write-diary").reset(); // Xóa dữ liệu form
    delete document.getElementById("write-diary").dataset.tradeId; // Xóa ID lệnh đang chỉnh sửa
});
