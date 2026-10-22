import { Container } from "@/shared/ui/Container";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container size="6xl" className="py-10">
      {children}
    </Container>
  );
}
