import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Assuming your Firebase config is in '../firebase.js'

export async function addServices() {
  try {
    const servicesData = [
      {
        url: "drain-and-drain-cleaning",
        icon: "/assets/icons/drain.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/drain.png",
        title: "Drain Cleaning Services",
        heading: "Unclogging & Drain Cleaning",
        bodyTexts: ["tbd"],
      },
      {
        url: "simply-sewer-hydrojetting",
        icon: "/assets/icons/hydrojetting.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/hydrojetting.png",
        title: "Simply Sewer Hydrojetting Services",
        heading: "Simply Sewer Hydrojetting",
        bodyTexts: ["tbd"],
      },
      {
        url: "backflow-testing-install",
        icon: "/assets/icons/backflow.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/backflow.png",
        title: "Backflow Prevention Testing & Installation Services",
        heading: "Backflow Testing & Install",
        bodyTexts: ["tbd"],
      },
      {
        url: "toilet-repair-install",
        icon: "/assets/icons/toilet.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/toilet.png",
        title: "Toilet Repair and Installation Services",
        heading: "Toilet Repair & Install",
        bodyTexts: ["tbd"],
      },
      {
        url: "water-main-service-install",
        icon: "/assets/icons/water-main.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/water-main.png",
        title: "Water Main Repair, Replacement & Installation Services",
        heading: "Water Main Service & Install",
        bodyTexts: ["tbd"],
      },
      {
        url: "faucets-fixtures-sinks",
        icon: "/assets/icons/faucet.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/faucet.png",
        title: "Faucet, Fixture & Sink Installation and Repair",
        heading: "Faucets, Fixtures, & Sinks",
        bodyTexts: ["tbd"],
      },
      {
        url: "showers-and-tubs",
        icon: "/assets/icons/shower.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/shower.png",
        title: "Shower and Tub Installation & Repair Services",
        heading: "Showers & Tubs",
        bodyTexts: ["tbd"],
      },
      {
        url: "water-filtration-systems",
        icon: "/assets/icons/water-filter.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/water-filter.png",
        title: "Water Filtration System Installation & Maintenance",
        heading: "Water Filtration Systems",
        bodyTexts: ["tbd"],
      },
      {
        url: "garbage-disposals",
        icon: "/assets/icons/garbage-disposal.svg",
        image:
          "gs://plumb-perfect-5af21.firebasestorage.app/garbage-disposal.png",
        title: "Garbage Disposal Repair & Installation Services",
        heading: "Garbage Disposals",
        bodyTexts: ["tbd"],
      },
      {
        url: "pipe-leaks-replacements",
        icon: "/assets/icons/pipe-leak.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/pipe-leak.png",
        title: "Pipe Leak Repair, Split Fixing & Pipe Replacement",
        heading: "Pipe Leaks & Replacements",
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
