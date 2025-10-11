# 🎯 Emoji Picker - Bộ chọn emoji miễn phí

Live demo: https://behitek.github.io/tools/

> Công cụ chọn emoji miễn phí với bộ sưu tập emoji đầy đủ. Tìm kiếm, chọn và sao chép emoji nhanh chóng cho social media, tin nhắn và website.

## ✨ Tính năng

- 🔍 **Tìm kiếm nhanh**: Tìm emoji theo từ khóa
- 📂 **Phân loại rõ ràng**: Emoji được sắp xếp theo danh mục
- 📋 **Sao chép dễ dàng**: Click để copy emoji vào clipboard
- 📱 **Responsive**: Hoạt động tốt trên mọi thiết bị
- 🎨 **Giao diện thân thiện**: Dễ sử dụng và trực quan

## 🚀 Setup Locally

Toàn bộ website sử dụng HTML, CSS, JS để vận hành. Bạn có thể chạy local hoặc deploy lên các dịch vụ online miễn phí.

```bash
$ git clone https://github.com/behitek/tools.git
$ cd tools/emoji-picker
# Mở file index.html lên bằng 1 trình duyệt bất kỳ
```

## 🎯 Automatic Deploy to GitHub Pages

Repository này đã được cấu hình tự động deploy lên GitHub Pages bằng GitHub Actions:

### Cách hoạt động:
1. **GitHub Actions Workflow**: Khi có commit mới push lên branch `main`, workflow `.github/workflows/deploy.yml` sẽ tự động chạy
2. **Tự động build và deploy**: Workflow sẽ lấy nội dung từ thư mục `emoji-picker` và deploy lên GitHub Pages
3. **URL live**: Website sẽ có sẵn tại `https://behitek.github.io/tools/`

### Để enable GitHub Pages:
1. Vào **Repository Settings** > **Pages**
2. Trong phần **Source**, chọn **GitHub Actions**
3. Workflow sẽ tự động chạy khi có commit mới

### Workflow Features:
- ✅ Tự động trigger khi push lên branch `main`
- ✅ Deploy static files từ thư mục `emoji-picker`
- ✅ Support manual trigger với `workflow_dispatch`
- ✅ Proper permissions cho GitHub Pages deployment

## 📁 Cấu trúc project

```
tools/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── emoji-picker/
│   ├── index.html             # Main HTML file
│   ├── style.css              # Styles
│   ├── script.mini.js         # JavaScript functionality
│   ├── categories/            # Emoji category images
│   ├── .nojekyll             # Disable Jekyll processing
│   └── README.md             # This file
└── README.md                 # Root project README
```

## 🔧 Technical Details

- **Framework**: Pure HTML/CSS/JavaScript
- **Deployment**: GitHub Pages với GitHub Actions
- **CI/CD**: Tự động deploy khi push code
- **Browser Support**: Modern browsers với ES6+ support
