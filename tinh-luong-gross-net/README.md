# Công cụ chuyển đổi lương Gross và Net

A modern, customizable salary calculator for Vietnam that converts between Gross and Net salary with detailed tax and insurance breakdowns.

## ✨ Features

- **Bidirectional Conversion**: Convert from Gross to Net or Net to Gross salary
- **Vietnamese Tax Compliance**: Pre-configured with Vietnam 2025 tax rates and insurance percentages
- **Customizable Parameters**: Adjust insurance rates, tax brackets, and deductions
- **Real-time Calculations**: Instant updates as you type
- **Detailed Breakdown**: Shows BHXH, BHYT, BHTN, taxable income, and personal income tax
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components for a polished experience

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Tailwind CSS animations
- **Theme**: next-themes for dark mode support

## 📊 Default Configuration (Vietnam 2025)

### Insurance Rates
- **BHXH (Social Insurance)**: 8%
- **BHYT (Health Insurance)**: 1.5%
- **BHTN (Unemployment Insurance)**: 1%

### Tax Deductions
- **Personal Deduction**: 11,000,000 VNĐ/month
- **Dependent Deduction**: 4,400,000 VNĐ/person/month

### Tax Brackets
| Taxable Income Range (VNĐ/month) | Tax Rate |
|----------------------------------|----------|
| 0 - 5,000,000 | 5% |
| 5,000,001 - 10,000,000 | 10% |
| 10,000,001 - 18,000,000 | 15% |
| 18,000,001 - 32,000,000 | 20% |
| 32,000,001 - 52,000,000 | 25% |
| 52,000,001 - 80,000,000 | 30% |
| Above 80,000,000 | 35% |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gross-net-convert
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## 🎯 Usage

### Basic Calculation

1. **Choose Conversion Mode**:
   - **Gross → Net**: Enter your gross salary to see net salary after deductions
   - **Net → Gross**: Enter your desired net salary to see required gross salary

2. **Enter Salary**: Input your salary amount in VNĐ

3. **Add Dependents**: Specify number of dependents for additional tax deductions

4. **View Results**: See detailed breakdown of:
   - Insurance contributions (BHXH, BHYT, BHTN)
   - Taxable income after deductions
   - Personal income tax
   - Final net salary

### Customization

Click the **Settings** button (⚙️) to customize:

- **Insurance Rates**: Adjust BHXH, BHYT, BHTN percentages
- **Tax Deductions**: Modify personal and dependent deduction amounts
- **Tax Brackets**: Update tax rates and income thresholds

The settings button shows an orange indicator when parameters differ from defaults.

### Dark Mode

Toggle between light and dark themes using the **Theme** button (🌙/☀️).

## 📁 Project Structure

```
gross-net-convert/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── salary-calculator.tsx    # Main calculator component
│   ├── settings-dialog.tsx      # Settings configuration dialog
│   ├── theme-provider.tsx       # Theme context provider
│   └── ui/                      # shadcn/ui components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
│   └── utils.ts          # Tailwind class utilities
├── public/               # Static assets
└── styles/               # Additional stylesheets
```

## 🧮 Calculation Logic

### Gross to Net Conversion

1. **Insurance Deductions**: 
   - BHXH = Gross × 8%
   - BHYT = Gross × 1.5%
   - BHTN = Gross × 1%

2. **Taxable Income**: 
   - Income after insurance - Personal deduction - (Dependents × Dependent deduction)

3. **Tax Calculation**: Progressive tax applied to taxable income using tax brackets

4. **Net Salary**: Gross - Total Insurance - Tax

### Net to Gross Conversion

Uses binary search algorithm to find the gross salary that results in the desired net salary, accounting for the progressive nature of tax calculations.

## 🎨 UI/UX Features

- **Gradient Background**: Eye-catching blue-purple-teal gradient
- **Glass Morphism**: Backdrop blur effects for modern appearance
- **Smooth Animations**: Hover effects and transitions
- **Responsive Layout**: Optimized for all screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Vietnamese Localization**: All text in Vietnamese with proper formatting

## 🔧 Customization

The application is highly customizable through the settings dialog. All parameters can be adjusted to match different scenarios or future regulation changes.

### Adding New Tax Brackets

Tax brackets are stored as an array and can be modified in the settings. The last bracket should have `Number.POSITIVE_INFINITY` as the limit for unlimited upper bound.

### Modifying Insurance Rates

Insurance percentages can be adjusted individually for BHXH, BHYT, and BHTN to reflect current or future rates.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚠️ Disclaimer

This calculator is for estimation purposes only. Tax rates and deductions may change based on current Vietnamese regulations. Please consult with tax professionals for official calculations.

---

*Built with ❤️ for the Vietnamese developer community*