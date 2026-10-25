export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  description: string;
  type: "Live Website" | "Web Application" | "Concept";
  thumbnail: string;
  features: string[];
  demoUrl?: string;
  demoLabel?: string;
}

export type ProjectCategory =
  | "Business Websites"
  | "E-commerce"
  | "Web Applications"
  | "AI & Automation"
  | "3D Experiences"
  | "Corporate Website"
  | "Healthcare"
  | "Construction & Engineering"
  | "Furniture"
  | "Insurance";

export const portfolioFilters: ("All Projects" | ProjectCategory)[] = [
  "All Projects",
  "Business Websites",
  "E-commerce",
  "Web Applications",
  "AI & Automation",
  "3D Experiences",
  "Corporate Website",
  "Healthcare",
  "Construction & Engineering",
  "Furniture",
  "Insurance",
];

export const projects: Project[] = [
  {
    id: "furniture-company",
    name: "Furniture Company Website",
    category: "Furniture",
    description:
      "A modern furniture company website designed to showcase furniture collections, present products attractively, and provide customers with an engaging digital experience for discovering furniture and interior solutions.",
    type: "Live Website",
    thumbnail: "/Furniture.jpeg",
    features: ["Product showcase", "Furniture collections", "Interior solutions"],
    demoUrl: "https://mab-technologies-web-4.onrender.com",
  },
  {
    id: "chocolate-cake-ordering",
    name: "Chocolate & Cake Ordering Platform",
    category: "E-commerce",
    description:
      "A modern online ordering platform designed for chocolate and cake businesses. The website provides an attractive way for customers to explore delicious products, view available treats, and conveniently place orders through a user-friendly digital shopping experience.",
    type: "Web Application",
    thumbnail: "/Chocolate & Cake Ordering.jpeg",
    features: ["Product showcase", "Online ordering", "User-friendly shopping"],
    demoUrl: "https://mab-technologies-web-7.onrender.com",
  },
  {
    id: "construction-engineering",
    name: "Construction & Engineering Company Website",
    category: "Construction & Engineering",
    description:
      "A professional corporate website designed for a construction and engineering company to showcase its services, highlight its projects, communicate its expertise, and establish a credible online presence for prospective clients.",
    type: "Live Website",
    thumbnail: "/Construction & Engineering.jpeg",
    features: ["Corporate design", "Service showcase", "Project portfolio"],
    demoUrl: "https://mab-technologies-web-6.onrender.com/",
  },
  {
    id: "hospital-website",
    name: "Hospital Website",
    category: "Healthcare",
    description:
      "A professional healthcare website designed to make hospital information and services accessible through a clear, organized, and user-friendly digital experience for patients, visitors, and the wider community.",
    type: "Live Website",
    thumbnail: "/Hospital.jpeg",
    features: ["Healthcare information", "Service listings", "Community resources"],
    demoUrl: "https://mab-technologies-web-5.onrender.com",
  },
  {
    id: "building-materials",
    name: "Building Materials Ordering Platform",
    category: "E-commerce",
    description:
      "A digital ordering platform designed for building-material suppliers, helping customers explore construction supplies and access a convenient online ordering experience for materials needed for building and renovation projects.",
    type: "Web Application",
    thumbnail: "/Building material.jpeg",
    features: ["Product catalog", "Online ordering", "Construction supplies"],
    demoUrl: "https://mab-technologies-web-8.onrender.com",
  },
  {
    id: "insurance-company",
    name: "Insurance Company Website",
    category: "Insurance",
    description:
      "A professional insurance company website designed to present insurance services, communicate important company information, and establish a trustworthy online presence for prospective customers.",
    type: "Live Website",
    thumbnail: "/Insurance.jpeg",
    features: ["Service presentation", "Company information", "Customer trust"],
    demoUrl: "https://mab-technologies-web-3.onrender.com",
  },
  {
    id: "harte-perfume",
    name: "Harte Perfume",
    category: "E-commerce",
    description:
      "Fragrance brand e-commerce experience with a refined product showcase and brand storytelling layout.",
    type: "Live Website",
    thumbnail: "/Perfume - E-Commerce image.jpeg",
    features: ["Product showcase", "Brand storytelling", "Responsive layout"],
    demoUrl: "https://mab-technologies-web-1.onrender.com",
  },
  {
    id: "restaurant-ordering",
    name: "Restaurant Ordering Platform",
    category: "Web Applications",
    description:
      "Online ordering platform for restaurants featuring a browsable menu, cart, and streamlined order flow.",
    type: "Web Application",
    thumbnail: "/Resturant Ordering Platform Image.jpeg",
    features: ["Menu browsing", "Cart & checkout", "Order management"],
    demoUrl: "https://mab-technologies-web-app-1.onrender.com",
  },
  {
    id: "cleaning-agency",
    name: "Cleaning Agency Website",
    category: "Business Websites",
    description:
      "Professional service website concept for a cleaning agency, designed to present services and make enquiries simple.",
    type: "Live Website",
    thumbnail: "/Cleaning Agency Website Image.jpeg",
    features: ["Service presentation", "Enquiry flow", "Responsive layout"],
    demoUrl: "https://mab-technologies-web-9.onrender.com",
  },
  {
    id: "ai-customer-support",
    name: "AI Customer Support Agent",
    category: "AI & Automation",
    description:
      "Concept for an AI support assistant that answers customer questions from a business knowledge base and qualifies leads.",
    type: "Concept",
    thumbnail: "/AI Customer Support Agent image.jpeg",
    features: ["Knowledge-base answers", "Lead qualification", "Handoff to human"],
    demoUrl: "https://ai-agent-demo-fm8p.onrender.com",
  },
  {
    id: "3d-interactive",
    name: "3D Interactive Website",
    category: "3D Experiences",
    description:
      "A 3D interactive perfume e-commerce website with immersive product exploration, smooth animations, and a premium shopping experience.",
    type: "Live Website",
    thumbnail: "/3D Interactive Website.jpeg",
    features: ["Interactive 3D product view", "Perfume e-commerce", "Smooth animations", "Premium shopping experience"],
    demoUrl: "https://perfume-3d-e-commerce-web.onrender.com",
  },
  {
    id: "business-website-concept",
    name: "Business Website Concept",
    category: "Business Websites",
    description:
      "Clean corporate website concept for professional service firms, with sections for services, about, and contact.",
    type: "Concept",
    thumbnail:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200",
    features: ["Service sections", "Responsive design", "Contact form"],
  },
  {
    id: "laundry-company",
    name: "FreshCare - Premium Laundry & Fabric Care",
    category: "Business Websites",
    description:
      "FreshCare is a premium laundry and fabric care service that brings professional-grade cleaning, ironing, and fabric care to your doorstep. The website showcases the brand's service menu, booking system, and commitment to exceptional fabric care.",
    type: "Live Website",
    thumbnail: "/Laundry Company website.jpeg",
    features: ["Premium laundry services", "Fabric care solutions", "Home pickup & delivery", "Online booking system"],
    demoUrl: "https://mab-technologies-web-10.onrender.com",
  },
  {
    id: "real-estate-company",
    name: "Sierra Estate - Premium Real Estate",
    category: "Business Websites",
    description:
      "Sierra Estate is a real estate company specializing in premium residential and commercial properties across Sierra Leone. The website showcases the company's portfolio of luxury homes, investment opportunities, and property management services.",
    type: "Live Website",
    thumbnail: "/RealEstate  Website.jpeg",
    features: ["Property listings", "Luxury homes", "Investment opportunities", "Property management"],
    demoUrl: "https://mab-technologies-web-11.onrender.com",
  },
  {
    id: "magic-fingers-barbing-shop",
    name: "Magic Fingers Barbing Shop",
    category: "Business Websites",
    description:
      "A barbing shop website for Magic Fingers Barbing Shop, designed to showcase the shop's services, present its brand, and make it easy for customers to discover the shop and get in touch.",
    type: "Live Website",
    thumbnail: "/magic-fingers-barbing-shop-website.jpeg",
    features: ["Service menu", "Brand presentation", "Contact & booking", "Responsive layout"],
    demoUrl: "https://magic-fingers-barbingshop.onrender.com",
    demoLabel: "View Website",
  },
];
