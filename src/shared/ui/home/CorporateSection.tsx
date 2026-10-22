// biome-ignore-all lint: home-page-component
export function CorporateSection() {
  return (
    <section className="w-full bg-[#f8fafb] py-16 sm:py-20 border-t border-neutral-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#5D98A3]/15 text-[#3a6870] font-bold text-xs sm:text-sm tracking-wider uppercase mb-3">
            Tax Deduction 250%
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#276172] tracking-tight">
            พิเศษสำหรับบริษัท
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            หลักสูตรได้รับการรับรองมาตรฐาน STEM สามารถนำค่าใช้จ่ายในการฝึกอบรมไปลดหย่อนภาษีได้ 250%
          </p>
        </div>

        {/* STEM Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200/80 group hover:shadow-2xl transition-all duration-300 p-2 sm:p-3">
            <img
              src="/home/stem-cert-1.jpg"
              alt="ใบรับรองหลักสูตร STEM เลขที่รับรอง TPC690045"
              className="w-full h-auto object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200/80 group hover:shadow-2xl transition-all duration-300 p-2 sm:p-3">
            <img
              src="/home/stem-cert-2.png"
              alt="ใบรับรองหลักสูตร Full-Stack CodeCamp STEM"
              className="w-full h-auto object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
