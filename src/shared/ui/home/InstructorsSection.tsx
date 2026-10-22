// biome-ignore-all lint: home-page-component
export function InstructorsSection() {
  const teachers = [

    {
      name: "กฤษฎา เฉลิมสุข",
      image: "/home/teacher-kritsada.png",
      credentials: [
        "ปริญญาโท คณะวิศวกรรมศาสตร์ สถาบันเทคโนโลยีแห่งเอเชีย",
        "ปริญญาตรี วิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
        "อดีตนายกสมาคมโปรแกรมเมอร์ไทย",
        "ผู้ริเริ่มโครงการ Software Park Thailand Code Camp",
        "อดีต Founder / CTO บริษัท Start up ที่ประเทศสหรัฐอเมริกา, สิงคโปร์",
        "ผู้เชี่ยวชาญด้าน Design Thinking, Start up และ Big Data",
        "วิทยากรสอนโปรแกรมเมอร์และผู้ประกอบการมากกว่า 8 ปี",
        "ที่ปรึกษา DEPA Transformation และ NIA",
      ],
    },
    {
      name: "รัชพงศ์ ตันติภัณฑรักษ์",
      image: "/home/teacher-ratchapong.webp",
      credentials: [
        "ปริญญาโท วิทยาศาสตร์คอมพิวเตอร์ มหาวิทยาลัยธรรมศาสตร์",
        "ปริญญาตรี คอมพิวเตอร์ธุรกิจ มหาวิทยาลัยรังสิต",
        "อดีตอาจารย์ฝ่ายวิชาการและหลักสูตร สถาบัน สยามคอมพิวเตอร์และภาษา",
        "อดีต Assistant System IT Manager บริษัท Crectec (Thailand) Co.,Ltd.",
        "ผู้ช่วยสอน โครงการ Software park Thailand Code Camp รุ่นที่ 4",
        "ผู้สอน โครงการ Code Camp รุ่นที่ 5 ถึงปัจจุบัน",
      ],
    },
  ];

  return (
    <section className="w-full bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:pb-16">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight">
              ทีมอาจารย์
            </h2>
            <span className="relative inline-block px-4 py-1 text-2xl sm:text-3xl md:text-4xl font-black text-[#437B83] border-2 border-[#437B83] rounded-full">
              ผู้สอน
            </span>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="border-2 border-dotted border-[#437B83] rounded-[30px] p-6 sm:p-8 flex flex-col items-center hover:shadow-xl transition-all duration-300 hover:border-solid hover:-translate-y-1 bg-white"
            >
              {/* Circular Avatar */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-md mb-6 border-4 border-[#437B83]/20 shrink-0 group">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Teacher Name */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#276172] text-center mb-6">
                {teacher.name}
              </h3>

              {/* Credentials List */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-600 w-full list-disc pl-5 leading-relaxed">
                {teacher.credentials.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
