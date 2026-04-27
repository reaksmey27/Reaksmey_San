import {
  FaBootstrap,
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaYoutube,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";

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
  { name: "PHP", category: "Backend", icon: FaPhp, color: "#777BB4" },
  { name: "Bootstrap", category: "Frontend", icon: FaBootstrap, color: "#7952B3" },
  { name: "Node.js", category: "Backend", icon: FaNodeJs, color: "#339933" },
  { name: "Python", category: "Backend", icon: FaPython, color: "#3776AB" },
  { name: "Figma", category: "Design", icon: FaFigma, color: "#F24E1E" },
  { name: "Git", category: "Others", icon: FaGitAlt, color: "#F05032" },
  { name: "YouTube", category: "Others", icon: FaYoutube, color: "#FF0000" },
];
