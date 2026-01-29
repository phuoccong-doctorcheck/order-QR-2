import { Database, Zap, Lock, BarChart3, Smartphone, Cloud } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Analytics",
      description: "Dự báo doanh số, phân tích xu hướng, và khuyến nghị tối ưu giá cả tự động",
    },
    {
      icon: Cloud,
      title: "Cloud Sync Real-time",
      description: "Đồng bộ dữ liệu tức thời giữa nhiều thiết bị, không mất dữ liệu",
    },
    {
      icon: Lock,
      title: "Bảo mật Enterprise-Grade",
      description: "Mã hóa End-to-End, PCI-DSS compliant, backup tự động hàng ngày",
    },
    {
      icon: Database,
      title: "Quản lý dữ liệu",
      description: "CSDL tập trung, đồng bộ offline, lưu trữ không giới hạn",
    },
    {
      icon: BarChart3,
      title: "Advanced Reporting",
      description: "Báo cáo chi tiết, export dữ liệu, tích hợp kế toán",
    },
    {
      icon: Smartphone,
      title: "API & Integrations",
      description: "REST API mở, kết nối với hệ thống quản lý, thanh toán online",
    },
  ]

  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Công nghệ tiên tiến</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nền tảng POS được xây dựng với các công nghệ hiện đại nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="group p-6 border border-border rounded-2xl hover:border-primary hover:shadow-lg hover:bg-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary group-hover:text-white rounded-lg flex items-center justify-center mb-4 transition">
                  <Icon className="w-6 h-6 text-primary group-hover:text-white transition" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
