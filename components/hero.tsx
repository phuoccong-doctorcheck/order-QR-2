import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Zap } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-background pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full w-fit">
                <Zap className="w-3 h-3" />
                <span className="text-xs sm:text-sm text-secondary font-medium">Công nghệ POS thế hệ mới</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                POS thông minh với <span className="text-primary">AI</span> &{" "}
                <span className="text-accent">Real-time Analytics</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                FABiBox - Platform POS hiện đại với công nghệ cloud, đồng bộ dữ liệu real-time, phân tích doanh số
                AI-powered, và bảo mật cấp doanh nghiệp. Cho quán café, nhà hàng, và shop bán lẻ.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white group">
                <Download className="w-4 h-4 mr-2" />
                Tải app ngay
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 bg-transparent"
              >
                Dùng thử miễn phí
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">10K+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Cửa hàng sử dụng</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-accent">99.9%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Uptime SLA</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-secondary">24/7</p>
                <p className="text-xs sm:text-sm text-muted-foreground">API Support</p>
              </div>
            </div>
          </div>

          {/* Right - App Mockup */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center">
            <div className="relative w-64 h-96 sm:w-72 sm:h-[480px] lg:w-80 lg:h-[560px]">
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-foreground rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800">
                {/* Phone Screen */}
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 p-4 flex flex-col">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-white text-xs mb-4">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <span>📶</span>
                      <span>📡</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="text-white mb-4">
                    <h2 className="text-lg font-bold">Dashboard AI</h2>
                    <p className="text-blue-100 text-xs">Phân tích thời gian thực</p>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 space-y-3">
                    {/* Sale Card */}
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-blue-100 text-xs">Doanh thu (AI Forecast)</p>
                          <p className="text-white text-2xl font-bold">2,450,000₫</p>
                        </div>
                        <span className="bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-full">
                          +18% YoY
                        </span>
                      </div>
                    </div>

                    {/* Performance Card */}
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-blue-100 text-xs font-medium">Hiệu suất hôm nay</span>
                        <span className="text-white font-bold">94%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{ width: "94%" }}></div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-white/10 border border-white/20 rounded-xl p-3 text-white text-xs font-semibold hover:bg-white/20 transition">
                        ⚡ Bán hàng
                      </button>
                      <button className="bg-white/10 border border-white/20 rounded-xl p-3 text-white text-xs font-semibold hover:bg-white/20 transition">
                        📊 Analytics
                      </button>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="flex justify-around items-center pt-4 border-t border-white/20 mt-4">
                    <button className="text-white font-bold text-xs">📊</button>
                    <button className="text-blue-100 text-xs">🛍️</button>
                    <button className="text-blue-100 text-xs">⚙️</button>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-4 py-2 border border-border">
                <p className="text-xs text-foreground font-semibold">Cloud Sync • End-to-End Encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
