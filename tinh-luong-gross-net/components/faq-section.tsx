"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

const faqData = [
  {
    category: "Khái niệm cơ bản",
    questions: [
      {
        question: "Lương Gross và Net khác nhau như thế nào?",
        answer: "Lương Gross (lương gốc) là mức lương được ghi trong hợp đồng lao động, chưa trừ các khoản bảo hiểm và thuế thu nhập cá nhân. Lương Net (lương thực nhận) là số tiền bạn thực sự nhận được sau khi đã trừ BHXH, BHYT, BHTN và thuế TNCN. Ví dụ: Lương Gross 20 triệu có thể chỉ thực nhận khoảng 17-18 triệu tùy vào số người phụ thuộc."
      },
      {
        question: "Tại sao cần phải trừ bảo hiểm xã hội khỏi lương?",
        answer: "Bảo hiểm xã hội là quy định bắt buộc theo luật pháp Việt Nam nhằm đảm bảo quyền lợi cho người lao động. Gồm 3 loại: BHXH (8% vào quỹ hưu trí và tử tuất) để hưởng chế độ hưu trí, ốm đau; BHYT (1.5%) để khám chữa bệnh; BHTN (1%) để hỗ trợ khi thất nghiệp. Tổng cộng 10.5% lương gross sẽ được trừ vào bảo hiểm."
      },
      {
        question: "Công thức tính lương Net từ Gross như thế nào?",
        answer: "Công thức chi tiết: 1) Tính bảo hiểm: BHXH = Gross × 8% (tối đa 46.8M), BHYT = Gross × 1.5% (tối đa 46.8M), BHTN = Gross × 1% (tối đa theo vùng). 2) Thu nhập chịu thuế = Gross - Tổng bảo hiểm - 11 triệu - (4.4 triệu × số người phụ thuộc). 3) Tính thuế TNCN theo bậc lũy tiến. 4) Lương Net = Gross - Tổng bảo hiểm - Thuế TNCN."
      },
      {
        question: "Mức lương tối thiểu vùng 2025 là bao nhiêu?",
        answer: "Mức lương tối thiểu vùng (hiệu lực từ 1/7/2024): Vùng I: 4.96 triệu/tháng, Vùng II: 4.41 triệu/tháng, Vùng III: 3.86 triệu/tháng, Vùng IV: 3.45 triệu/tháng. Đây là lương Gross tối thiểu và cũng là cơ sở tính mức đóng BHTN tối đa (20 lần mức tối thiểu vùng). Lương cơ sở hiện tại là 2.34 triệu/tháng."
      }
    ]
  },
  {
    category: "Bảo hiểm xã hội",
    questions: [
      {
        question: "Tỷ lệ đóng BHXH, BHYT, BHTN năm 2025 là bao nhiêu?",
        answer: "Tỷ lệ đóng bảo hiểm năm 2025 - Người lao động đóng tổng cộng 10.5%: BHXH 8% (vào quỹ hưu trí và tử tuất), BHYT 1.5%, BHTN 1%. Doanh nghiệp đóng tổng cộng 21.5%: BHXH 17% (14% vào quỹ hưu trí và tử tuất + 3% vào quỹ ốm đau và thai sản), BHYT 3%, BHTN 1%, BHTNLĐ-BNN 0.5%. Tổng cộng bảo hiểm bắt buộc chiếm 32% lương gross."
      },
      {
        question: "Lương đóng bảo hiểm có giới hạn tối đa không?",
        answer: "Có, mức đóng bảo hiểm có 2 loại giới hạn khác nhau: 1) BHXH + BHYT: tối đa 20 lần lương cơ sở (2.34 triệu) = 46.8 triệu/tháng. 2) BHTN: tối đa 20 lần lương tối thiểu vùng - Vùng I: 99.2 triệu, Vùng II: 88.2 triệu, Vùng III: 77.2 triệu, Vùng IV: 69 triệu. Nếu lương vượt mức này, chỉ tính bảo hiểm theo mức tối đa."
      },
      {
        question: "Có được miễn đóng bảo hiểm trong trường hợp nào?",
        answer: "Một số trường hợp được miễn: Người từ đủ 60 tuổi nam, 55 tuổi nữ đã hưởng lương hưu; Người nước ngoài làm việc dưới 3 tháng; Học sinh, sinh viên làm thêm dưới 3 tháng; Người làm việc theo hợp đồng dân sự (không phải hợp đồng lao động). Tuy nhiên, đa số trường hợp đều phải đóng bảo hiểm bắt buộc."
      },
      {
        question: "Những khoản thu nhập nào được tính vào cơ sở đóng bảo hiểm?",
        answer: "Cơ sở đóng bảo hiểm bao gồm: Lương cơ bản + phụ cấp chức vụ + các khoản phụ cấp thường xuyên. KHÔNG bao gồm: Thưởng, phụ cấp ăn trưa, hỗ trợ đi lại, hỗ trợ nhà ở, thưởng sáng kiến. Đây là điểm quan trọng khi tính toán chính xác số tiền phải đóng bảo hiểm."
      }
    ]
  },
  {
    category: "Thuế thu nhập cá nhân",
    questions: [
      {
        question: "Bậc thuế thu nhập cá nhân năm 2025 như thế nào?",
        answer: "Bậc thuế TNCN năm 2025 (theo Luật Thuế TNCN): Đến 5 triệu (5%), Trên 5-10 triệu (10%), Trên 10-18 triệu (15%), Trên 18-32 triệu (20%), Trên 32-52 triệu (25%), Trên 52-80 triệu (30%), Trên 80 triệu (35%). Thuế được tính lũy tiến từng phần, tức là chỉ phần vượt mức mới áp dụng thuế suất cao hơn."
      },
      {
        question: "Mức giảm trừ gia cảnh năm 2025 là bao nhiêu?",
        answer: "Mức giảm trừ gia cảnh năm 2025: Bản thân 11 triệu/tháng (132 triệu/năm), mỗi người phụ thuộc 4.4 triệu/tháng (52.8 triệu/năm). Ví dụ: Có 2 con thì được giảm trừ 11 + 4.4×2 = 19.8 triệu từ thu nhập chịu thuế hàng tháng."
      },
      {
        question: "Thu nhập nào phải chịu thuế TNCN?",
        answer: "Các loại thu nhập chịu thuế: Lương, thưởng từ công việc; Thu nhập từ kinh doanh; Thu nhập từ đầu tư chứng khoán, bất động sản; Thu nhập từ chuyển nhượng tài sản; Thu nhập khác như trúng thưởng, được tặng. Mỗi loại có cách tính thuế khác nhau, lương và thưởng từ công việc áp dụng thuế suất lũy tiến từng phần 5-35%."
      },
      {
        question: "Làm thế nào để tính thuế khi có nhiều nguồn thu nhập?",
        answer: "Khi có nhiều nguồn thu nhập từ lương: Cộng tất cả thu nhập chịu thuế trong tháng, trừ giảm trừ gia cảnh, sau đó áp dụng bậc thuế lũy tiến từng phần. Nếu có thu nhập từ kinh doanh hoặc đầu tư, cần kê khai riêng theo quy định. Thuế tổng hợp sẽ được quyết toán cuối năm."
      },
      {
        question: "Có cách nào giảm thuế TNCN hợp pháp không?",
        answer: "Các cách giảm thuế hợp pháp: Kê khai đầy đủ người phụ thuộc; Đóng bảo hiểm nhân thọ tự nguyện (tối đa 2.4 triệu/tháng); Ủng hộ từ thiện, nhân đạo; Học tập nâng cao trình độ; Đóng quỹ hưu trí tự nguyện. Lưu ý phải có chứng từ hợp lệ và tuân thủ quy định của pháp luật."
      },
      {
        question: "Tại sao cần dùng thuật toán tìm kiếm nhị phân để tính Net to Gross?",
        answer: "Việc tính từ Net sang Gross phức tạp vì bảo hiểm và thuế được tính dựa trên Gross, tạo ra phương trình phi tuyến. Thuật toán tìm kiếm nhị phân sẽ: 1) Ước tính Gross ban đầu, 2) Tính Net từ Gross ước tính, 3) So sánh với Net mục tiêu, 4) Điều chỉnh Gross và lặp lại cho đến khi đạt độ chính xác ±1,000 VNĐ."
      }
    ]
  },
  {
    category: "Người phụ thuộc",
    questions: [
      {
        question: "Ai được coi là người phụ thuộc để giảm trừ thuế?",
        answer: "Người phụ thuộc gồm: Con dưới 18 tuổi hoặc từ đủ 18 tuổi trở lên nhưng bị khuyết tật, không có khả năng lao động; Vợ/chồng không có thu nhập hoặc có thu nhập dưới 10 triệu/tháng; Cha, mẹ, ông, bà từ 60 tuổi trở lên (nam) hoặc 55 tuổi trở lên (nữ) không có thu nhập hoặc có thu nhập dưới 10 triệu/tháng."
      },
      {
        question: "Một người có thể kê khai bao nhiêu người phụ thuộc?",
        answer: "Không giới hạn số người phụ thuộc, nhưng mỗi người phụ thuộc chỉ được một người kê khai. Ví dụ: Có thể kê khai vợ, 2 con, cha mẹ (4 người), được giảm trừ 4.4×4 = 17.6 triệu/tháng. Cần có giấy tờ chứng minh quan hệ và tình trạng thu nhập của người phụ thuộc."
      },
      {
        question: "Thủ tục kê khai người phụ thuộc như thế nào?",
        answer: "Thủ tục kê khai: Nộp đơn đăng ký giảm trừ gia cảnh cho doanh nghiệp; Kèm theo bản sao giấy khai sinh (con), giấy đăng ký kết hôn (vợ/chồng), giấy khai sinh + CMND (cha mẹ); Chứng minh thu nhập người phụ thuộc (nếu có); Doanh nghiệp sẽ áp dụng từ tháng tiếp theo sau khi nộp đơn."
      }
    ]
  },
  {
    category: "Tình huống đặc biệt",
    questions: [
      {
        question: "Làm thêm giờ có ảnh hưởng đến thuế TNCN không?",
        answer: "Có, tiền làm thêm giờ được cộng vào thu nhập chịu thuế trong tháng. Nếu làm thêm nhiều khiến tổng thu nhập tăng, có thể đẩy lên bậc thuế cao hơn. Ví dụ: Lương 15 triệu + làm thêm 5 triệu = 20 triệu sẽ chịu thuế cao hơn so với chỉ lương 15 triệu. Cần tính toán kỹ để tối ưu thu nhập thực tế."
      },
      {
        question: "Lương tháng 13, thưởng Tết có đóng thuế không?",
        answer: "Lương tháng 13 và thưởng Tết đều phải chịu thuế TNCN. Các khoản thưởng này được cộng vào tổng thu nhập chịu thuế của tháng nhận thưởng, sau đó tính thuế theo biểu thuế lũy tiến từng phần (5%-35%) như thu nhập lương bình thường. Ví dụ: Nếu tháng 1 nhận lương 20 triệu + thưởng Tết 30 triệu = tổng 50 triệu, sẽ tính thuế trên 50 triệu theo bậc thuế lũy tiến."
      },
      {
        question: "Nghỉ việc giữa tháng, lương và thuế tính như thế nào?",
        answer: "Lương nghỉ việc giữa tháng tính theo số ngày làm việc thực tế. Thuế TNCN vẫn áp dụng bình thường cho phần thu nhập trong tháng. Bảo hiểm được đóng đủ tháng nếu làm việc từ ngày 1, hoặc theo tỷ lệ nếu vào làm giữa tháng. Khi nghỉ việc cần làm thủ tục chuyển sổ BHXH để tiếp tục đóng ở nơi làm việc mới."
      },
      {
        question: "Có 2 nguồn lương từ 2 công ty khác nhau thì sao?",
        answer: "Khi có 2 nguồn lương, mỗi công ty tính thuế riêng lẻ có thể thiếu hoặc thừa thuế. Cuối năm phải kê khai quyết toán thuế tổng hợp để tính chính xác. Thường sẽ phải đóng thêm thuế vì tổng thu nhập cao hơn, áp dụng bậc thuế cao hơn. Nên báo với công ty chính để được tính thuế chính xác hơn."
      },
      {
        question: "Cách tính thuế TNCN theo bậc lũy tiến từng phần hoạt động như thế nào?",
        answer: "Thuế TNCN tính lũy tiến từng phần có nghĩa là chỉ phần thu nhập vượt mức mới chịu thuế suất cao hơn. Ví dụ thu nhập chịu thuế 15 triệu: 5 triệu đầu × 5% = 250K, 5 triệu tiếp (phần từ >5-10 triệu) × 10% = 500K, 5 triệu cuối (phần từ >10-15 triệu) × 15% = 750K. Tổng thuế = 1.5 triệu (10% trên tổng thu nhập), không phải 15 triệu × 15% = 2.25 triệu."
      },
      {
        question: "Tại sao cần phải làm tròn kết quả cuối cùng?",
        answer: "Trong thực tế, các phép tính lương luôn được làm tròn để tránh số lẻ phức tạp. Theo quy định, tiền lương và thuế thường được làm tròn đến đơn vị nghìn đồng. Công cụ này áp dụng Math.round() để đảm bảo kết quả phù hợp với thực tế và dễ đọc, tương tự như cách tính toán của các phòng nhân sự."
      }
    ]
  },
  {
    category: "Quy định pháp luật",
    questions: [
      {
        question: "Quy định mới về thuế TNCN năm 2025 có gì thay đổi?",
        answer: "Năm 2025 duy trì ổn định: Giảm trừ bản thân 11 triệu/tháng, người phụ thuộc 4.4 triệu/tháng, bậc thuế 5-35% không đổi. Tăng mức lương tối thiểu vùng ảnh hưởng đến mức đóng bảo hiểm tối đa. Tăng cường thanh tra, kiểm tra việc kê khai và nộp thuế của doanh nghiệp và cá nhân."
      },
      {
        question: "Doanh nghiệp có quyền thay đổi cách tính lương không?",
        answer: "Doanh nghiệp phải tuân thủ đúng quy định pháp luật về lương tối thiểu, bảo hiểm và thuế. Có thể thỏa thuận về cấu trúc lương (lương cơ bản + phụ cấp + thưởng) nhưng không được vi phạm quyền lợi người lao động. Mọi thay đổi phải được thỏa thuận trong hợp đồng lao động hoặc thỏa ước lao động tập thể."
      },
      {
        question: "Làm việc remote có ảnh hưởng đến cách tính thuế không?",
        answer: "Làm việc remote không ảnh hưởng đến cách tính thuế TNCN. Thuế được tính theo nơi đăng ký thuế của doanh nghiệp, không phải nơi làm việc thực tế. Tuy nhiên, nếu làm việc ở nước ngoài có thể có quy định khác về tránh đánh thuế kép. Cần tham khảo chuyên gia thuế nếu có tình huống phức tạp."
      }
    ]
  }
]

export function FaqSection() {
  return (
    <section className="mt-12">
      <Card className="backdrop-blur-lg bg-white/95 dark:bg-gray-900/95 shadow-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl md:text-3xl">
              Câu hỏi thường gặp về Lương Gross-Net
            </CardTitle>
          </div>
          <p className="text-muted-foreground mt-2">
            Tổng hợp các câu hỏi phổ biến về cách tính lương, bảo hiểm xã hội và thuế thu nhập cá nhân tại Việt Nam
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 border-b border-blue-200 dark:border-blue-800 pb-2">
                  {category.category}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, questionIndex) => (
                    <AccordionItem 
                      key={`${categoryIndex}-${questionIndex}`} 
                      value={`${categoryIndex}-${questionIndex}`}
                      className="border-gray-200 dark:border-gray-800"
                    >
                      <AccordionTrigger className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
          
          {/* Additional SEO Content */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">
              💡 Lưu ý quan trọng
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Công cụ áp dụng mức lương cơ sở 2.34 triệu và lương tối thiểu vùng từ 1/7/2024</li>
              <li>• Bảo hiểm được tính riêng biệt: BHXH+BHYT (tối đa 46.8M), BHTN (tối đa theo vùng)</li>
              <li>• Thuế TNCN áp dụng khi thu nhập chịu thuế {'>'} 0 đồng theo bậc lũy tiến từng phần</li>
              <li>• Conversion Net→Gross sử dụng thuật toán tìm kiếm nhị phân với độ chính xác ±1,000 VNĐ</li>
              <li>• Thưởng tháng 13, thưởng Tết được cộng vào thu nhập tháng để tính thuế lũy tiến</li>
              <li>• Nên tham khảo chuyên gia thuế cho các tình huống phức tạp</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}