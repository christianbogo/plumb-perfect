import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Assuming your Firebase config is in './firebase.js' (relative path corrected)

export async function addServices() {
  try {
    const servicesData = [
      {
        url: "drain-and-drain-cleaning",
        icon: "/assets/icons/drain.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/drain.jpeg", // Updated image extension
        title: "Drain Cleaning Services",
        heading: "Unclogging & Drain Cleaning",
        bodyTexts: ["tbd"],
      },
      {
        url: "simply-sewer-hydrojetting",
        icon: "/assets/icons/hydrojetting.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/hydrojetting.jpeg", // Updated image extension
        title: "Simply Sewer Hydrojetting Services",
        heading: "Simply Sewer Hydrojetting",
        bodyTexts: ["tbd"],
      },
      {
        url: "backflow-testing-install",
        icon: "/assets/icons/backflow.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/backflow.jpeg", // Updated image extension
        title: "Backflow Prevention Testing & Installation Services",
        heading: "Backflow Testing & Install",
        bodyTexts: ["tbd"],
      },
      {
        url: "toilet-repair-install",
        icon: "/assets/icons/toilet.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/toilet.jpeg", // Updated image extension
        title: "Toilet Repair and Installation Services",
        heading: "Toilet Repair & Install",
        bodyTexts: ["tbd"],
      },
      {
        url: "water-main-service-install",
        icon: "/assets/icons/water-main.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/water-main.jpeg", // Updated image extension
        title: "Water Main Repair, Replacement & Installation Services",
        heading: "Water Main Service & Install",
        bodyTexts: ["tbd"],
      },
      {
        url: "faucets-fixtures-sinks",
        icon: "/assets/icons/faucet.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/faucet.jpeg", // Updated image extension
        title: "Faucet, Fixture & Sink Installation and Repair",
        heading: "Faucets, Fixtures, & Sinks",
        bodyTexts: ["tbd"],
      },
      {
        url: "showers-and-tubs",
        icon: "/assets/icons/shower.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/shower.jpeg", // Updated image extension
        title: "Shower and Tub Installation & Repair Services",
        heading: "Showers & Tubs",
        bodyTexts: ["tbd"],
      },
      {
        url: "water-filtration-systems",
        icon: "/assets/icons/water-filter.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/water-filter.jpeg", // Updated image extension
        title: "Water Filtration System Installation & Maintenance",
        heading: "Water Filtration Systems",
        bodyTexts: ["tbd"],
      },
      {
        url: "garbage-disposals",
        icon: "/assets/icons/garbage-disposal.svg",
        image:
          "gs://plumb-perfect-5af21.firebasestorage.app/garbage-disposal.jpeg", // Updated image extension
        title: "Garbage Disposal Repair & Installation Services",
        heading: "Garbage Disposals",
        bodyTexts: ["tbd"],
      },
      {
        url: "pipe-leaks-replacements",
        icon: "/assets/icons/pipe-leak.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/pipe-leak.jpeg", // Updated image extension
        title: "Pipe Leak Repair, Split Fixing & Pipe Replacement",
        heading: "Pipe Leaks & Replacements",
        bodyTexts: ["tbd"],
      },
      {
        url: "water-heaters",
        icon: "/assets/icons/water-heater.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/water-heater.jpeg", // Added water heaters
        title: "Water Heater Repair & Installation Services",
        heading: "Water Heaters",
        bodyTexts: ["tbd"],
      },
    ];

    const servicesCollectionRef = collection(db, "services");

    for (const service of servicesData) {
      const docRef = await addDoc(servicesCollectionRef, service);
      console.log("Service added with ID:", docRef.id);
    }

    console.log("All services added successfully!");
  } catch (error) {
    console.error("Error adding services:", error);
  }
}
