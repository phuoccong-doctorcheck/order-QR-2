import { Code2, Server, Lock, Cpu } from "lucide-react"

export default function TechStack() {
  const technologies = [
    {
      icon: Cpu,
      title: "Mobile-First Architecture",
      description: "React Native + Node.js backend, tối ưu cho thiết bị di động",
    },
    {
      icon: Server,
      title: "Cloud Infrastructure",
      description: "Deployed trên AWS, CDN toàn cầu, auto-scaling cho traffic cao",
    },
    {
      icon: Lock,
      title: "Security & Compliance",
      description: "OAuth 2.0, JWT tokens, GDPR compliant, PCI-DSS certified",
    },
    {
      icon: Code2,
      title: "Developer-Friendly",
      description: "REST API, webhooks, SDK sẵn sàng, documentation chi tiết",
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Công nghệ tân tiến</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Xây dựng trên nền tảng hiện đại với kiến trúc mở rộng, bảo mật cao, và hiệu suất vượt trội
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 border border-primary/20 rounded-2xl bg-white hover:shadow-lg hover:border-primary/40 transition group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition">
                  <Icon className="w-6 h-6 text-primary group-hover:text-white transition" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">{tech.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{tech.description}</p>
              </div>
            )
          })}
        </div>

        {/* Technical Specs */}
        <div className="mt-12 sm:mt-16 border border-border rounded-2xl p-6 sm:p-8 bg-white">
          <h3 className="text-2xl font-bold text-foreground mb-6">Thông số kỹ thuật</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Latency</p>
              <p className="text-2xl font-bold text-primary">&lt;100ms</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Availability</p>
              <p className="text-2xl font-bold text-primary">99.99%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Data Centers</p>
              <p className="text-2xl font-bold text-primary">Multi-region</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
