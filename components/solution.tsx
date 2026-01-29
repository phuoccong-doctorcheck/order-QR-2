import { CheckCircle } from "lucide-react"

export default function Solution() {
  const solutions = [
    "Quản lý đơn hàng tự động, tính tiền nhanh chóng",
    "Theo dõi doanh thu & báo cáo chi tiết theo thời gian thực",
    "Quản lý nhân viên, kho hàng dễ dàng",
    "Tích hợp thanh toán online & offline",
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                FABiBox giải quyết vấn đề của bạn
              </h2>
              <p className="text-lg text-muted-foreground">
                Từ quản lý đơn hàng đến báo cáo doanh thu - tất cả đều tự động, thông minh và dễ sử dụng
              </p>
            </div>

            <div className="space-y-4">
              {solutions.map((solution, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-base sm:text-lg text-foreground font-medium">{solution}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative h-80 sm:h-96 bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-xl overflow-hidden order-1 lg:order-2">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">⚡</div>
                <p className="text-white font-bold text-xl">
                  Tự động hóa
                  <br />
                  quản lý bán hàng
                </p>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-8 right-8 bg-white/10 backdrop-blur rounded-xl px-4 py-2 border border-white/20 text-white text-sm font-semibold">
              ✓ Nhanh 10x
            </div>
            <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur rounded-xl px-4 py-2 border border-white/20 text-white text-sm font-semibold">
              ✓ Chính xác 100%
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
