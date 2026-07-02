import {
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaLaravel,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaVuejs,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiPostman, SiTailwindcss } from "react-icons/si";

export const SKILL_CATEGORIES = [
  { key: "All", label: { en: "All", km: "ទាំងអស់" } },
  { key: "Frontend", label: { en: "Frontend", km: "Frontend" } },
  { key: "Backend", label: { en: "Backend", km: "Backend" } },
  { key: "Design", label: { en: "Design", km: "Design" } },
  { key: "Others", label: { en: "Others", km: "ផ្សេងៗ" } },
];

export const SKILLS = [
  { name: "HTML5", category: "Frontend", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", category: "Frontend", icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", category: "Frontend", icon: IoLogoJavascript, color: "#F7DF1E" },
  { name: "React", category: "Frontend", icon: FaReact, color: "#61DAFB" },
  { name: "Vue.js", category: "Frontend", icon: FaVuejs, color: "#4FC08D" },
  { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "PHP", category: "Backend", icon: FaPhp, color: "#777BB4" },
  { name: "Laravel", category: "Backend", icon: FaLaravel, color: "#FF2D20" },
  { name: "Node.js", category: "Backend", icon: FaNodeJs, color: "#339933" },
  { name: "Python", category: "Backend", icon: FaPython, color: "#3776AB" },
  { name: "Figma", category: "Design", icon: FaFigma, color: "#F24E1E" },
  { name: "Git", category: "Others", icon: FaGitAlt, color: "#F05032" },
  { name: "Postman", category: "Others", icon: SiPostman, color: "#FF6C37" },
];
