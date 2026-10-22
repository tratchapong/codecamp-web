// biome-ignore-all lint: home-page-component
export function HeroBanner() {
  return (
    <section className="w-full bg-white">
      <div className="w-full">
        <img
          src="/home/hero-banner.jpg"
          alt="CodeCamp Thailand - บ้านหลังแรกของคนเริ่มจากศูนย์"
          className="w-full h-auto object-cover block shadow-sm"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
