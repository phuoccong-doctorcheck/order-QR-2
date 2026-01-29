import { AlertCircle, TrendingDown, Clock } from "lucide-react"

export default function PainPoints() {
  const painPoints = [
    {
      icon: Clock,
      title: "Mất thời gian",
      description: "Quản lý bán hàng thủ công, ghi chép rối loạn, dễ quên thông tin",
    },
    {
      icon: TrendingDown,
      title: "Sai sót liên tục",
      description: "Tính tiền sai, lẫn lộn đơn hàng, không theo dõi được tồn kho",
    },
    {
      icon: AlertCircle,
      title: "Khó quản lý",
      description: "Không biết doanh thu chính xác, khó kiểm soát nhân viên",
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Bạn đang gặp phải những vấn đề này?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quản lý bán hàng thủ công gây lãng phí thời gian, dễ sai sót, và khó kiểm soát
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {painPoints.map((point, idx) => {
            const Icon = point.icon
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 border border-border rounded-2xl bg-gray-50 hover:bg-white hover:border-primary/30 transition"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{point.title}</h3>
                <p className="text-muted-foreground">{point.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
