export type StudentTestimonial = {
  name: string;
  detail: string;
  school: string;
  quote: string;
};

export const studentTestimonials: StudentTestimonial[] = [
  {
    name: "Ayisha Saffron",
    detail: "Grade 10th, India",
    school: "Gems Wellington Academy Silicon Oasis",
    quote:
      "At IGNITE Young Minds Summer Programme at Cambridge Judge Business School I learned to be open-minded and quick-witted, finding the next best way to achieve the original goal when things don't go as planned, or adapting the goal to better suit the evolving situation.",
  },
  {
    name: "Maitri Ponnudurai",
    detail: "Grade 12th, India",
    school: "CS Academy International",
    quote:
      "This experience helped me build confidence by encouraging me to pursue my ideas more boldly and giving them a better chance at success. It also made me more open to communicating with a wide range of people.",
  },
  {
    name: "Parmida Zahedi",
    detail: "Grade 11th, UAE",
    school: "Wellington International School",
    quote:
      "The lectures and after-class activities have helped me avoid making assumptions and taught me how to speak confidently in front of others. They've also equipped me with the skills to make more informed and thoughtful decisions.",
  },
  {
    name: "Serena Karim Shamji",
    detail: "Grade 10th, UAE",
    school: "Swiss International Scientific School Dubai",
    quote:
      "The program offered invaluable insights through sessions on Cambridge admissions, career planning, social media, business models, and pitching—helping me strengthen existing skills and gain new ones for my personal and professional growth.",
  },
  {
    name: "Aarav Agarwal",
    detail: "Grade 12th, India",
    school: "Khaitan Public School, Sahibabad",
    quote:
      "The group sessions with my team, while developing our enterprise, helped me understand how crucial collaboration and diverse strengths are to building something successful.",
  },
  {
    name: "Emmanuel Keiba",
    detail: "Grade 11th, Côte d'Ivoire",
    school: "International Community School of Abidjan",
    quote:
      "Collaborating as a team to build a product was deeply rewarding. The experience reinforced the importance of a strong value proposition and understanding customer segments.",
  },
];

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
