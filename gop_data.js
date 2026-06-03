const fs = require('fs');

try {
    // 1. Đọc dữ liệu từ 2 file JSON của bạn
    const file1 = JSON.parse(fs.readFileSync('500_vatly_500_hoahoc.json', 'utf8'));
    const file2 = JSON.parse(fs.readFileSync('500_cau_hoi_toan_thpt.json', 'utf8'));

    // 2. Gộp các môn lại với nhau
    const merged = { ...file1, ...file2 };

    // 3. Định dạng lại cấu trúc chuẩn cho web (bổ sung Anh, Văn nếu trống)
    const finalData = {
        "Toán": merged["Toán"] || [],
        "Vật lý": merged["Vật lý"] || [],
        "Hóa học": merged["Hóa học"] || [],
        "Tiếng Anh": merged["Tiếng Anh"] || [],
        "Ngữ văn": merged["Ngữ văn"] || []
    };

    // 4. Bọc nó vào biến QUESTIONS_DATA và ghi ra file questions.js
    const content = `const QUESTIONS_DATA = ${JSON.stringify(finalData)};`;
    fs.writeFileSync('questions.js', content);
    
    console.log("✅ Tuyệt vời! Đã gộp thành công 1.500 câu hỏi vào file questions.js");
} catch(e) {
    console.error("❌ Lỗi cmnr:", e.message);
}

