import {
  FaBootstrap,
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaLaravel,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaTheaterMasks,
  FaVuejs,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiMysql, SiPostman, SiTailwindcss } from "react-icons/si";

export const SKILL_CATEGORIES = [
  { key: "All", label: { en: "All", km: "ទាំងអស់" } },
  { key: "Frontend", label: { en: "Frontend", km: "Frontend" } },
  { key: "Backend", label: { en: "Backend", km: "Backend" } },
  { key: "Design", label: { en: "Design", km: "Design" } },
  { key: "Styling", label: { en: "Styling", km: "រចនារូបរាង" } },
  { key: "Testing", label: { en: "Testing", km: "ការសាកល្បង" } },
  { key: "Others", label: { en: "Others", km: "ផ្សេងៗ" } },
];

export function getSkillLevel(percentage) {
  if (percentage >= 90) return { en: "Expert", km: "ជំនាញខ្ពស់" };
  if (percentage >= 80) return { en: "Advanced", km: "កម្រិតខ្ពស់" };
  if (percentage > 50) return { en: "Intermediate", km: "កម្រិតមធ្យម" };
  return { en: "Basic", km: "កម្រិតមូលដ្ឋាន" };
}

// Proficiency values; unconfirmed values remain at the 80% placeholder.
export const SKILLS = [
  {
    name: "HTML5",
    category: "Frontend",
    icon: FaHtml5,
    color: "#E34F26",
    percentage: 80,
  },
  {
    name: "CSS3",
    category: "Styling",
    icon: FaCss3Alt,
    color: "#1572B6",
    percentage: 80,
  },
  {
    name: "JavaScript",
    category: "Frontend",
    icon: IoLogoJavascript,
    color: "#F7DF1E",
    percentage: 60,
  },
  {
    name: "React",
    category: "Frontend",
    icon: FaReact,
    color: "#61DAFB",
    percentage: 70,
  },
  {
    name: "Vue.js",
    category: "Frontend",
    icon: FaVuejs,
    color: "#4FC08D",
    percentage: 70,
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    icon: SiTailwindcss,
    color: "#06B6D4",
    percentage: 60,
  },
  {
    name: "Bootstrap",
    category: "Styling",
    icon: FaBootstrap,
    color: "#7952B3",
    percentage: 60,
  },
  {
    name: "PHP",
    category: "Backend",
    icon: FaPhp,
    color: "#777BB4",
    percentage: 50,
  },
  {
    name: "Laravel",
    category: "Backend",
    icon: FaLaravel,
    color: "#FF2D20",
    percentage: 70,
  },
  {
    name: "Node.js",
    category: "Backend",
    icon: FaNodeJs,
    color: "#339933",
    percentage: 60,
  },
  {
    name: "Python",
    category: "Backend",
    icon: FaPython,
    color: "#3776AB",
    percentage: 50,
  },
  {
    name: "MySQL",
    category: "Backend",
    icon: SiMysql,
    color: "#4479A1",
    percentage: 60,
  },
  {
    name: "Figma",
    category: "Design",
    icon: FaFigma,
    color: "#F24E1E",
    percentage: 80,
  },
  {
    name: "Git",
    category: "Others",
    icon: FaGitAlt,
    color: "#F05032",
    percentage: 70,
  },
  {
    name: "Postman",
    category: "Testing",
    icon: SiPostman,
    color: "#FF6C37",
    percentage: 60,
  },
  {
    name: "Playwright",
    category: "Testing",
    icon: FaTheaterMasks,
    color: "#2EAD33",
    percentage: 50,
  },
];
