import { Bed, UtensilsCrossed, ShieldCheck, Bus } from "lucide-react";
const hillsideGarden =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/fbfca66c-706f-4d8f-ac30-b033333514ac/hillside-garden.jpg";
const clareRoom =
  "https://dd255978-1758-4a46-bebd-24780505eaa2.lovableproject.com/__l5e/assets-v1/81824a19-0ea5-4079-b875-5b71317ddb4d/clare-room.jpg";

export const accomData = {
  eyebrow: "Accommodation",
  title1: "Live at",
  title2: "Clare College",
  collegeMeta: "Clare College, University of Cambridge",
  address: "Trinity Lane · Cambridge · CB2 1TL",
  lead: "You will be residing in a single occupancy room for the duration of the programme at Clare College, University of Cambridge.",
  paras: [
    "Founded in 1326, Clare College is the second-oldest surviving college at the University of Cambridge. Clare provides accommodation for undergraduates for 3 years with the possibility of a 4th year for students on four-year courses. All first-year students live together in Memorial Court during term time.",
    "Memorial Court is just across the river from the central Old Court. From second year onwards, students have the option to live at Castle Court, Clare's undergraduate accommodation in Castle Street and Chesterton Lane. The accommodation at Castle Court ranges from purpose-built student dormitories to houses renovated and converted for student residence.",
  ],
  closing: "All student rooms are fully furnished.",
  checkIn: "18 July 2027 at 2:00 PM",
  checkOut: "24 July 2027 at 10:00 AM",
  hero: hillsideGarden,
  room: clareRoom,
  features: [
    { icon: Bed, text: "Single occupancy fully furnished rooms" },
    { icon: UtensilsCrossed, text: "All meals included — breakfast, lunch & dinner" },
    { icon: ShieldCheck, text: "Supervised and safe environment" },
    { icon: Bus, text: "Airport pickup & drop-off included" },
  ],
};
