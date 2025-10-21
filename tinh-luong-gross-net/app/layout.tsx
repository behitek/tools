import { Analytics } from "@vercel/analytics/next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Máy Tính Lương Việt Nam 2025 - 100% Riêng Tư, Không Thu Thập Dữ Liệu",
  description: "Công cụ tính lương Gross-Net hoàn toàn riêng tư cho Việt Nam. 100% client-side, tính toán trên trình duyệt, không thu thập dữ liệu cá nhân. Tính chính xác BHXH, BHYT, BHTN và thuế TNCN theo quy định 2025.",
  keywords: [
    "máy tính lương",
    "lương gross net",
    "tính lương việt nam",
    "thuế thu nhập cá nhân",
    "bảo hiểm xã hội",
    "BHXH BHYT BHTN",
    "calculator salary vietnam",
    "gross to net vietnam",
    "tax calculator vietnam",
    "lương thực nhận",
    "thuế TNCN 2025"
  ],
  authors: [{ name: "LuyenCode Tools" }],
  creator: "LuyenCode",
  publisher: "LuyenCode",
  alternates: {
    canonical: "https://tools.luyencode.net/gross-net-convert"
  },
  openGraph: {
    title: "Máy Tính Lương Việt Nam 2025 - 100% Riêng Tư",
    description: "Công cụ tính lương Gross-Net hoàn toàn riêng tư, không thu thập dữ liệu cá nhân. Tính toán trên trình duyệt, bảo mật tuyệt đối cho người lao động Việt Nam.",
    url: "https://tools.luyencode.net/gross-net-convert",
    siteName: "LuyenCode Tools",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Máy Tính Lương Việt Nam 2025 - 100% Riêng Tư",
    description: "Công cụ tính lương Gross-Net hoàn toàn riêng tư, không thu thập dữ liệu. Tính toán trên trình duyệt, bảo mật tuyệt đối",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Máy Tính Lương Việt Nam",
  alternateName: "Vietnam Salary Calculator",
  description: "Công cụ tính lương Gross-Net hoàn toàn riêng tư cho Việt Nam. 100% client-side, tính toán trên trình duyệt, không thu thập dữ liệu cá nhân. Tính chính xác BHXH, BHYT, BHTN và thuế TNCN theo quy định 2025.",
  url: "https://tools.luyencode.net/gross-net-convert",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  permissions: "browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "VND",
    availability: "https://schema.org/InStock"
  },
  creator: {
    "@type": "Organization",
    name: "LuyenCode",
    url: "https://luyencode.net"
  },
  inLanguage: "vi-VN",
  featureList: [
    "100% riêng tư - không thu thập dữ liệu",
    "Tính toán trên trình duyệt (client-side)",
    "Chuyển đổi lương Gross sang Net",
    "Chuyển đổi lương Net sang Gross", 
    "Tính toán BHXH, BHYT, BHTN",
    "Tính thuế thu nhập cá nhân",
    "Hỗ trợ người phụ thuộc",
    "Cài đặt thông số tùy chỉnh"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
