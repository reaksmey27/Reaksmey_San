import pro1Image from "../assets/images/pro1.webp";
import pro2Image from "../assets/images/pro2.webp";
import pro3Image from "../assets/images/pro3.webp";
import pro4Image from "../assets/images/pro4.webp";
import pro5Image from "../assets/images/pro5.webp";
import pro6Image from "../assets/images/Pro6.webp";
import pro7Image from "../assets/images/pro7.webp";
import pro8Image from "../assets/images/pro8.webp";
import pro9Image from "../assets/images/pro9.webp";
import pro10Image from "../assets/images/pro10.webp";
import pro11Image from "../assets/images/pro11.webp";

export const PROJECTS_PER_PAGE = 6;

export const PROJECT_FILTERS = [
  { key: "all", label: { en: "All", km: "ទាំងអស់" } },
  { key: "web", label: { en: "Web", km: "វេបសាយ" } },
  { key: "vlog", label: { en: "Vlogs", km: "វីដេអូ" } },
  { key: "design", label: { en: "Design", km: "រចនា" } },
];

export const PROJECT_BADGE_CLASS_NAMES = {
  web: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  vlog: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20",
  design: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
};

export const PROJECTS = [
  {
    id: 11,
    title: "Student Leave Management",
    type: "web",
    badge: { en: "Web Development", km: "អភិវឌ្ឍន៍វេបសាយ" },
    date: { en: "Jul 3 - 30 2026", km: "៣ - ៣០ កក្កដា ២០២៦" },
    description: {
      en: "A student leave management dashboard for tracking leave requests, approvals, and status in real time, built with Vue.js and Laravel.",
      km: "ប្រព័ន្ធគ្រប់គ្រងច្បាប់ឈប់សម្រាកសិស្ស ជាមួយផ្ទាំងគ្រប់គ្រងសម្រាប់តាមដានសំណើសុំច្បាប់ ការអនុម័ត និងស្ថានភាពជាក់ស្តែង បង្កើតឡើងដោយ Vue.js និង Laravel។",
    },
    longDescription: {
      en: "My contribution: built leave request dashboards and connected them to REST APIs, collaborating through Git and GitHub. The dashboard brings pending, under-review, approved, and rejected requests into one place so staff can follow each request's status.",
      km: "ការចូលរួមរបស់ខ្ញុំ៖ បង្កើតផ្ទាំងគ្រប់គ្រងសំណើសុំច្បាប់ និងភ្ជាប់ REST API ដោយសហការតាម Git និង GitHub។ ផ្ទាំងនេះប្រមូលសំណើដែលកំពុងរង់ចាំ កំពុងពិនិត្យ អនុម័ត និងបដិសេធក្នុងកន្លែងតែមួយ ដើម្បីឱ្យបុគ្គលិកតាមដានស្ថានភាពបាន។",
    },
    tech: ["Vue.js", "Laravel", "MySQL", "GitHub", "Postman"],
    image: pro11Image,
    isNew: true,
    links: [
      {
        kind: "live",
        url: "https://54.91.54.3.nip.io/dashboard",
        label: { en: "Live Demo", km: "មើលផ្ទាល់" },
      },
    ],
  },
  {
    id: 10,
    title: "Full Stack E-Commerce System",
    type: "web",
    badge: { en: "Web Development", km: "អភិវឌ្ឍន៍វេបសាយ" },
    date: { en: "Jun 19 - 30 2026", km: "១៩ - ៣០ មិថុនា ២០២៦" },
    description: {
      en: "A full stack sneaker e-commerce system with customer storefront and admin panel, built with Vue.js and Laravel.",
      km: "ប្រព័ន្ធលក់ស្បែកជើងកីឡាតាមអនឡាញពេញលេញ ដែលមានទាំងវេបសាយសម្រាប់អតិថិជន និងផ្ទាំងគ្រប់គ្រង Admin សាងសង់ដោយ Vue.js និង Laravel។",
    },
    longDescription: {
      en: "My contribution: built the customer storefront and admin panels with Vue.js and Laravel, including product management. Customers can explore the sneaker catalog while administrators manage products through a separate interface.",
      km: "ការចូលរួមរបស់ខ្ញុំ៖ បង្កើតផ្ទាំងអតិថិជន និងផ្ទាំង Admin ជាមួយ Vue.js និង Laravel រួមទាំងការគ្រប់គ្រងផលិតផល។ អតិថិជនអាចមើលកាតាឡុកស្បែកជើង ខណៈអ្នកគ្រប់គ្រងអាចគ្រប់គ្រងផលិតផលតាមផ្ទាំងដាច់ដោយឡែក។",
    },
    tech: ["Vue.js", "Laravel", "MySQL", "GitHub", "Postman"],
    image: pro10Image,
    isNew: true,
    links: [
      {
        kind: "code",
        url: "https://github.com/reaksmey27/Online_Shop_Backend.git",
        label: { en: "Backend Repo", km: "កូដ Backend" },
      },
      {
        kind: "code",
        url: "https://github.com/reaksmey27/Online_Shop_frontend.git",
        label: { en: "Frontend Repo", km: "កូដ Frontend" },
      },
    ],
  },
  {
    id: 9,
    title: "Nike Shoes Shop Website",
    type: "design",
    badge: { en: "UX/UI Design", km: "រចនា UX/UI" },
    date: { en: "May 13 - 14 2026", km: "១៣ - ១៤ ឧសភា ២០២៦" },
    description: {
      en: "A modern, responsive sneaker e-commerce interface designed as a personal UX/UI project.",
      km: "ផ្ទៃមុខអនឡាញលក់ស្បែកជើងកីឡាទំនើប និងឆ្លើយតបបានល្អ ដែលបានរចនាជាគម្រោងផ្ទាល់ខ្លួន UX/UI។",
    },
    longDescription: {
      en: "My contribution: designed the sneaker shop interface in Figma, creating reusable components and an interactive prototype. The prototype demonstrates the proposed shopping experience before development.",
      km: "ការចូលរួមរបស់ខ្ញុំ៖ រចនាផ្ទៃមុខហាងស្បែកជើងក្នុង Figma ដោយបង្កើតសមាសភាគដែលអាចប្រើឡើងវិញ និងគំរូអន្តរកម្ម។ គំរូនេះបង្ហាញបទពិសោធន៍ទិញទំនិញមុនពេលអភិវឌ្ឍ។",
    },
    tech: ["Figma"],
    image: pro9Image,
    isNew: true,
    links: [
      {
        kind: "figma",
        url: "https://www.figma.com/proto/1wLpEOyYMULf5jzfQgkHC2/shop?page-id=0%3A1&node-id=1-5&p=f&viewport=421%2C358%2C0.07&t=ISH3S6KtpKxCHRAh-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A5",
        label: { en: "View Prototype", km: "មើលគំរូសាកល្បង" },
        primary: true,
      },
    ],
  },
  {
    id: 1,
    title: "PNC Student Star",
    type: "web",
    badge: { en: "Web Development", km: "អភិវឌ្ឍន៍វេបសាយ" },
    date: { en: "Mar - Apr 2026", km: "មីនា - មេសា ២០២៥" },
    description: {
      en: "PNC Student Star is a web-based student performance management system for evaluations, meetings, and feedback.",
      km: "PNC Student Star ជាប្រព័ន្ធគ្រប់គ្រងសមិទ្ធផលសិស្សផ្អែកលើវេប សម្រាប់ការវាយតម្លៃ ការប្រជុំ និងមតិយោបល់។",
    },
    longDescription: {
      en: "Designed to help Education Officers and Managers manage student evaluations, follow-up meetings, and feedback in one place.",
      km: "ត្រូវបានរចនាឡើងដើម្បីជួយមន្ត្រីសិក្សា និងអ្នកគ្រប់គ្រង គ្រប់គ្រងការវាយតម្លៃសិស្ស ការប្រជុំតាមដាន និងមតិយោបល់នៅកន្លែងតែមួយ។",
    },
    tech: ["React", "Node.js", "Express.js", "Tailwind", "JS"],
    image: pro7Image,
    isNew: true,
    links: [
      {
        kind: "live",
        url: "https://pnc-student-star.vercel.app/",
        label: { en: "Live Demo", km: "មើលផ្ទាល់" },
      },
      {
        kind: "code",
        url: "https://github.com/sapiia/pnc_student_star",
        label: { en: "Source Code", km: "កូដដើម" },
      },
    ],
  },
  {
    id: 2,
    title: "Movie-Website",
    type: "web",
    badge: { en: "Web Development", km: "អភិវឌ្ឍន៍វេបសាយ" },
    date: { en: "Feb 2026", km: "កុម្ភៈ ២០២៦" },
    description: {
      en: "A modern movie website with responsive design and interactive features.",
      km: "វេបសាយភាពយន្តទំនើប ដែលមានការរចនាឆ្លើយតប និងមុខងារអន្តរកម្ម។",
    },
    longDescription: {
      en: "Built as a polished movie browsing experience with a clean responsive interface and engaging interactive sections.",
      km: "ត្រូវបានបង្កើតឡើងជាបទពិសោធន៍មើលភាពយន្តដែលមានផ្ទៃមុខស្អាត ឆ្លើយតបបានល្អ និងផ្នែកអន្តរកម្មគួរឱ្យទាក់ទាញ។",
    },
    tech: ["React", "Tailwind", "JS"],
    image: pro6Image,
    isNew: true,
    links: [
      {
        kind: "live",
        url: "https://movie-website-five-orpin.vercel.app/",
        label: { en: "Live Demo", km: "មើលផ្ទាល់" },
      },
      {
        kind: "code",
        url: "https://github.com/reaksmey27/Movie-Website",
        label: { en: "Source Code", km: "កូដដើម" },
      },
    ],
  },

  {
    id: 3,
    title: "Quiz System Website",
    type: "web",
    badge: { en: "Web Development", km: "អភិវឌ្ឍន៍វេបសាយ" },
    date: { en: "Dec 2025", km: "ធ្នូ ២០២៥" },
    description: {
      en: "Interactive quiz system with score tracking and responsive design.",
      km: "ប្រព័ន្ធប្រលងសំណួរអន្តរកម្ម ដែលមានការគណនាពិន្ទុ និងការរចនាឆ្លើយតប។",
    },
    longDescription: {
      en: "A quiz website focused on interactive participation, score tracking, and a responsive experience across devices.",
      km: "វេបសាយប្រលងសំណួរដែលផ្តោតលើការចូលរួមអន្តរកម្ម ការតាមដានពិន្ទុ និងបទពិសោធន៍ឆ្លើយតបបានល្អលើគ្រប់ឧបករណ៍។",
    },
    tech: ["HTML", "CSS", "JS"],
    image: pro4Image,
    links: [
      {
        kind: "live",
        url: "https://quizsystemb2.vercel.app/",
        label: { en: "Live Demo", km: "មើលផ្ទាល់" },
      },
      {
        kind: "code",
        url: "https://github.com/keosreydoeurn/Quiz-System",
        label: { en: "Source Code", km: "កូដដើម" },
      },
    ],
  },
  {
    id: 4,
    title: "Tutorial Deploy Website",
    type: "vlog",
    badge: { en: "Facebook", km: "Facebook" },
    date: { en: "Dec 2025", km: "ធ្នូ ២០២៥" },
    description: {
      en: "Step-by-step tutorial on deploying local websites to production.",
      km: "មេរៀនជាជំហានៗអំពីការដាក់វេបសាយ local ឲ្យដំណើរការលើ production។",
    },
    longDescription: {
      en: "A short tutorial video sharing the deployment process from a local project to a live published website.",
      km: "វីដេអូបង្រៀនខ្លីមួយ ដែលចែករំលែកដំណើរការដាក់ project ពី local ទៅជាវេបសាយដែលអាចប្រើបានពិត។",
    },
    tech: ["Facebook"],
    image: pro2Image,
    links: [
      {
        kind: "facebook",
        url: "https://www.facebook.com/reel/2579802185738910",
        label: { en: "Watch Now", km: "ទស្សនាឥឡូវនេះ" },
        primary: true,
      },
    ],
  },

  {
    id: 8,
    title: "Restaurant Order System",
    type: "web",
    badge: { en: "Web Development", km: "អភិវឌ្ឍន៍វេបសាយ" },
    date: { en: "Oct 20 - Nov 4 2025", km: "តុលា ២០ - វិច្ឆុកា ៤ ២០២៥" },
    description: {
      en: "A restaurant ordering system built with Python Flask, HTML, and CSS for managing customer orders.",
      km: "ប្រព័ន្ធបញ្ចាប់ការលក់អាហារដែលបង្កើតដោយ Python Flask, HTML និង CSS សម្រាប់គ្រប់គ្រងការបញ្ចាប់ការលក់អាហាររបស់អតិថិជន។",
    },
    longDescription: {
      en: "A full-featured restaurant ordering system that allows customers to browse menu items, place orders, and track their status in real-time.",
      km: "ប្រព័ន្ធបញ្ចាប់ការលក់អាហារពេញលេញដែលឱ្យឱកាសអតិថិជនក្នុងការមើលម៉ឺនុយ បញ្ចាប់ការលក់អាហារ និងតាមដានស្ថានភាពរបស់ពួកគេក្នុងពេលវេលាពិតប្រាកដ។",
    },
    tech: ["Python", "Flask", "HTML", "CSS"],
    image: pro8Image,
    isNew: true,
    links: [
      {
        kind: "code",
        url: "https://github.com/reaksmey27/Restaurant_Ordering_System1",
        label: { en: "Source Code", km: "កូដដើម" },
      },
    ],
  },

  {
    id: 5,
    title: "E-Commerce Website",
    type: "web",
    badge: { en: "Web Development", km: "អភិវឌ្ឍន៍វេបសាយ" },
    date: { en: "Sep 2025", km: "កញ្ញា ២០២៥" },
    description: {
      en: "Responsive e-commerce landing page with product showcase.",
      km: "ទំព័រដើមវេបសាយលក់ទំនិញដែលឆ្លើយតបបានល្អ និងបង្ហាញផលិតផល។",
    },
    longDescription: {
      en: "A product-focused landing page built to present featured items clearly with a responsive shopping experience.",
      km: "ទំព័រដើមផ្តោតលើផលិតផល ដែលត្រូវបានបង្កើតឡើងសម្រាប់បង្ហាញទំនិញសំខាន់ៗឱ្យច្បាស់ និងមានបទពិសោធន៍ឆ្លើយតបបានល្អ។",
    },
    tech: ["HTML", "CSS"],
    image: pro1Image,
    links: [
      {
        kind: "live",
        url: "https://goal-gear-project-web-design.vercel.app/",
        label: { en: "Live Demo", km: "មើលផ្ទាល់" },
      },
      {
        kind: "code",
        url: "https://github.com/reaksmey27/GoalGear_Project-Web_Design",
        label: { en: "Source Code", km: "កូដដើម" },
      },
    ],
  },
  {
    id: 6,
    title: "Portfolio Website",
    type: "web",
    badge: { en: "Web Development", km: "អភិវឌ្ឍន៍វេបសាយ" },
    date: { en: "Aug 2025", km: "សីហា ២០២៥" },
    description: {
      en: "Personal portfolio showcasing projects and skills.",
      km: "វេបសាយផ្ទាល់ខ្លួនសម្រាប់បង្ហាញស្នាដៃ និងជំនាញ។",
    },
    longDescription: {
      en: "A personal website created to present projects, skills, and background in a simple and accessible format.",
      km: "វេបសាយផ្ទាល់ខ្លួនមួយដែលត្រូវបានបង្កើតឡើងសម្រាប់បង្ហាញគម្រោង ជំនាញ និងប្រវត្តិរូបក្នុងទម្រង់សាមញ្ញ និងងាយស្រួលមើល។",
    },
    tech: ["HTML", "CSS"],
    image: pro5Image,
    links: [
      {
        kind: "live",
        url: "https://my-portfolio-eight-silk-55.vercel.app/",
        label: { en: "Live Demo", km: "មើលផ្ទាល់" },
      },
      {
        kind: "code",
        url: "https://github.com/reaksmey27/My-Portfolio",
        label: { en: "Source Code", km: "កូដដើម" },
      },
    ],
  },
  {
    id: 7,
    title: "Pet Selling Application UI",
    type: "design",
    badge: { en: "UI/UX Design", km: "រចនា UI/UX" },
    date: { en: "May 2025", km: "ឧសភា ២០២៥" },
    description: {
      en: "Modern mobile app UI prototype for a pet marketplace.",
      km: "គំរូ UI កម្មវិធីទូរស័ព្ទទំនើបសម្រាប់ទីផ្សារលក់សត្វចិញ្ចឹម។",
    },
    longDescription: {
      en: "A mobile UI prototype created in Figma for a pet-selling application with a modern marketplace feel.",
      km: "គំរូ UI ទូរស័ព្ទដែលបានរចនាក្នុង Figma សម្រាប់កម្មវិធីលក់សត្វចិញ្ចឹម ជាមួយរចនាបែបទំនើបសម្រាប់ marketplace។",
    },
    tech: ["Figma"],
    image: pro3Image,
    links: [
      {
        kind: "figma",
        url: "https://www.figma.com/proto/R52bfLyrncb0X8pjoos5BP/Untitled?page-id=0%3A1&node-id=121-215&t=WrHtE03IKI5JQpEd-1",
        label: { en: "View Prototype", km: "មើលគំរូសាកល្បង" },
        primary: true,
      },
    ],
  },
];
