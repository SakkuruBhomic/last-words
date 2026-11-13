import type { Metadata } from "next";
import TeacherView from "./TeacherView";

export const metadata: Metadata = {
  title: "Teacher Mode & Lesson Plan | LAST WORDS - NASA Space Apps 2026",
  description: "A 20-minute turnkey science lesson plan, guided class discussion prompts, and printable student worksheet for grades 5-10.",
  openGraph: {
    title: "Educator Resources: Teaching with LAST WORDS",
    description: "20-minute classroom lesson plan, debate prompts, and printable PDF/paper worksheet.",
  },
};

export default function TeachersPage() {
  return <TeacherView />;
}
