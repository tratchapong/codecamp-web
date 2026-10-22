export type MainNavItem = {
    title: string;
    href: string;
};

export const mainNav: MainNavItem[] = [
    { title: "คอร์สเรียน", href: "/courses/" },
    { title: "คู่มือเปลี่ยนสายงาน", href: "/guide/switch-to-developer/" },
    { title: "โชว์เคส", href: "/showcase/" },
    { title: "คลังความรู้", href: "/blog/" },
    { title: "สถานที่ตั้ง", href: "/location/" },
    { title: "เกี่ยวกับเรา", href: "/aboutus/" }
];
