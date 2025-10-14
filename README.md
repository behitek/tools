# 🛠️ Tools Collection

A collection of useful web tools and utilities.

## 📦 Available Tools

### 💰 Máy tính lương (Salary Calculator)
> Tính toán chính xác lương gross-net theo luật Việt Nam 2025

**Live Demo**: https://behitek.github.io/tools/tinh-luong-gross-net/

**Features**:
- 💵 Tính toán gross-to-net và net-to-gross
- 🏢 Hỗ trợ 4 vùng lương tối thiểu Việt Nam
- 🔧 Tùy chỉnh mức đóng bảo hiểm riêng
- 📊 Hiển thị chi tiết từng khoản tính toán
- 🎯 Làm nổi bật kết quả tính toán
- 📱 Giao diện responsive, thân thiện

**Tech Stack**: Next.js, TypeScript, Tailwind CSS, Radix UI

**Location**: `/tinh-luong-gross-net/`

### 🎯 Emoji Picker
> Bộ chọn emoji miễn phí với bộ sưu tập emoji đầy đủ

**Live Demo**: https://behitek.github.io/tools/emoji-picker/

**Features**:
- 🔍 Quick search by keywords
- 📂 Organized by categories
- 📋 One-click copy to clipboard
- 📱 Responsive design
- 🎨 User-friendly interface

**Tech Stack**: Vanilla HTML, CSS, JavaScript

**Location**: `/emoji-picker/`

## 🚀 Deployment

This repository is automatically deployed to GitHub Pages using GitHub Actions. Each tool is accessible via:

- **Base URL**: `https://behitek.github.io/tools/`
- **Salary Calculator**: `https://behitek.github.io/tools/tinh-luong-gross-net/`
- **Emoji Picker**: `https://behitek.github.io/tools/emoji-picker/`

## 🔧 Development

Each tool is self-contained in its own directory with:
- Static HTML/CSS/JavaScript files
- Individual README with specific instructions
- Automatic deployment via GitHub Actions

## 📁 Repository Structure

```
tools/
├── .github/
│   └── workflows/
│       └── deploy.yml                    # Deployment workflow
├── emoji-picker/                        # Emoji picker tool
│   ├── index.html
│   ├── style.css
│   ├── script.mini.js
│   └── categories/
├── tinh-luong-gross-net/                # Salary calculator tool
│   ├── app/                             # Next.js app directory
│   ├── components/                      # React components
│   ├── lib/                            # Utility functions
│   ├── public/                         # Static assets
│   ├── package.json
│   ├── next.config.mjs
│   └── tsconfig.json
├── index.html                          # Homepage
└── README.md                           # This file
```

## 🤝 Contributing

Feel free to contribute new tools or improvements to existing ones:

1. Fork the repository
2. Create your feature branch
3. Add your tool in a new directory
4. Update this README
5. Submit a pull request

## 📄 License

Open source - feel free to use and modify as needed.