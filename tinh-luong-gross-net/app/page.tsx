import { FaqSection } from "@/components/faq-section"
import { SalaryCalculator } from "@/components/salary-calculator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Máy Tính Lương Việt Nam</h1>
          <p className="text-lg text-white/90 text-pretty">
            Chuyển đổi lương Gross - Net với các thông số có thể tùy chỉnh
          </p>
        </div>
        <SalaryCalculator />
        <FaqSection />
        <footer className="mt-8 text-center text-white/80 text-sm">
          <p>
            * Các tỷ lệ và mức khấu trừ có thể được tùy chỉnh trong phần cài đặt. Vui lòng kiểm tra với quy định hiện
            hành.
          </p>
        </footer>
      </div>
    </main>
  )
}
