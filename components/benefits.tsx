import { Zap, TrendingUp, Clock, Shield } from "lucide-react"

export default function Benefits() {
  const benefits = [
    {
      icon: Zap,
      title: "Tiết kiệm thời gian",
      detail: "Tự động hóa quy trình, từ tính tiền đến báo cáo",
    },
    {
      icon: TrendingUp,
      title: "Tăng doanh thu",
      detail: "Giảm sai sót, tăng hiệu suất bán hàng",
    },
    {
      icon: Shield,
      title: "Bảo mật dữ liệu",
      detail: "Mã hóa end-to-end, tự động backup",
    },
    {
      icon: Clock,
      title: "Hỗ trợ 24/7",
      detail: "Đội ngũ hỗ trợ sẵn sàng giúp bạn",
    },
  ]

  return (
    <section id="benefits" className="py-16 sm:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Lợi ích cho chủ quán</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tăng hiệu quả vận hành, giảm chi phí, tăng lợi nhuận
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-border hover:border-accent hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.detail}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
