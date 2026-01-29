import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FB</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">FABiBox</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition">
              Tính năng
            </a>
            <a href="#benefits" className="text-muted-foreground hover:text-foreground transition">
              Lợi ích
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition">
              Liên hệ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hidden sm:inline-flex border-border text-foreground hover:bg-muted bg-transparent"
            >
              Đăng nhập
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white">Dùng thử</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
