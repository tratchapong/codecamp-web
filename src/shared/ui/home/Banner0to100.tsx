// biome-ignore-all lint: home-page-component
export function Banner0to100() {
  return (
    <section className="w-full relative bg-white py-8 md:py-16">
      {/* Boxed Content: 2-column layout with Video on left and Roadmap Image on right */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-10">
          {/* Left Column: YouTube Shorts Video (approx 36% width on desktop) */}
          <div className="w-full max-w-[360px] md:max-w-none md:w-[36%] flex justify-center">
            <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-xl bg-black border border-neutral-200 relative group">
              <iframe
                src="https://www.youtube.com/embed/vNkRyqSutFQ?rel=0&modestbranding=1"
                title="CodeCamp Thailand 900 กว่าคนที่ผ่าน"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* Right Column: Roadmap Image (0 to 100) (approx 64% width on desktop) */}
          <div className="w-full md:w-[64%] flex justify-center">
            <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-neutral-100 bg-white">
              <img
                src="/home/codecamp-0-100.jpg"
                alt="Roadmap to Fullstack Developer จาก 0 ถึง 100 - CodeCamp Thailand"
                className="w-full h-auto object-contain block"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
