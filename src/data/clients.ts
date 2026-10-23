export interface Client {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export const clients: Client[] = [
  {
    id: "magic-fingers-barbing-shop",
    name: "Magic Fingers Barbing Shop",
    logo: "/mgf_logo.png",
    website: "https://magic-fingers-barbingshop.onrender.com",
  },
];
