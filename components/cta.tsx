import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

export default function CTA() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-r from-primary via-accent to-secondary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Sẵn sàng nâng cấp kinh doanh của bạn?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Hơn 10,000 chủ quán, nhà hàng, và shop đã tin tưởng FABiBox
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-gray-100 text-primary font-bold group">
              Dùng thử ngay <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 bg-transparent"
            >
              Nhận tư vấn miễn phí
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/20">
            <div className="flex items-center justify-center gap-2 text-white">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span>Miễn phí 7 ngày</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span>Không cần thẻ tín dụng</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white">
              <Check className="w-5 h-5 flex-shrink-0" />
              <span>Hỗ trợ đầy đủ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
