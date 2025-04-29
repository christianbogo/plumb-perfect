import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function addServices() {
  try {
    const servicesData = [
      {
        url: "drain-and-drain-cleaning",
        icon: "/assets/icons/drain.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/drain.png",
        title: "Drain Cleaning Services",
        heading: "Unclogging & Drain Cleaning",
        bodyTexts: [
          "Blocked drains can disrupt your entire day. Whether it's a clogged toilet, a backed-up sink, or a more serious mainline issue, Plumb Perfect is equipped to help. Our skilled technicians use state-of-the-art power and hand-driven cables to effectively clear any blockage.",
          "Avoid the harsh chemicals sold in stores, which can be harmful to your plumbing system, your family, and the environment. Cable cleaning is a fast, eco-friendly, and safer method that provides longer-lasting results, ultimately saving you time and money. For comprehensive drain care, we also offer hydro-jetting and Bio-Clean treatments. Contact Plumb Perfect at 509-663-3602 for reliable drain cleaning services.",
        ],
      },
      {
        url: "simply-sewer-hydrojetting",
        icon: "/assets/icons/hydrojetting.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/hydrojetting.png",
        title: "Simply Sewer Hydrojetting Services",
        heading: "Simply Sewer Hydrojetting",
        bodyTexts: [
          "When stubborn drain clogs resist conventional methods, hydro-jetting offers a powerful solution. Plumb Perfect utilizes high-pressure water, up to 4,000 psi, to blast away years of accumulated sludge and debris from your pipes, effectively cleaning 1 ½” to 6” lines.",
          "This advanced technique not only clears severe blockages but also helps to maintain optimal flow and extend the life between routine cleanings. While DIY hydro-jetting can be tempting, professional expertise ensures the job is done safely and effectively without damaging your plumbing. If you're facing a persistent drain issue in Wenatchee, call Plumb Perfect at 509-663-3602 to see if hydro-jetting is the right solution for you.",
        ],
      },
      {
        url: "backflow-testing-install",
        icon: "/assets/icons/backflow.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/backflow.png",
        title: "Backflow Prevention Testing & Installation Services",
        heading: "Backflow Testing & Install",
        bodyTexts: [
          "Protecting our community's water supply is a priority. Backflow prevention devices are crucial in stopping potential contaminants from entering the clean water system. Plumb Perfect's licensed plumbers are experts in assessing backflow risks and installing the appropriate devices for your needs.",
          "We provide comprehensive services, including identifying the necessary protection, professional installation, thorough testing, and proper registration of your backflow prevention device. Ensure the safety and integrity of your water system. Call Plumb Perfect in Wenatchee at 509-663-3602 for expert backflow testing and installation.",
        ],
      },
      {
        url: "toilet-repair-install",
        icon: "/assets/icons/toilet.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/toilet.png",
        title: "Toilet Repair and Installation Services",
        heading: "Toilet Repair & Install",
        bodyTexts: [
          "A properly functioning toilet is essential for any home. Whether you need a repair for a constantly running toilet or are considering a new installation, Plumb Perfect offers reliable service in Wenatchee. We service all makes and models and will always recommend the most cost-effective solution.",
          "When replacement is necessary, we offer quality toilets at competitive prices, ensuring you get a reliable fixture that meets your needs. Don't let toilet troubles disrupt your household. Contact Plumb Perfect at 509-663-3602 for prompt and professional toilet repair and installation services.",
        ],
      },
      {
        url: "water-main-service-install",
        icon: "/assets/icons/water-main.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/water-main.png",
        title: "Water Main Repair, Replacement & Installation Services",
        heading: "Water Main Service & Install",
        bodyTexts: [
          "A leaking or damaged water main can cause significant problems. Plumb Perfect in Wenatchee offers expert water main repair, replacement, and installation services. We assess each situation to provide the most practical and cost-effective solution for your property.",
          "Our services include conventional trenching, carefully planned to minimize disruption to your landscaping, as well as trenchless options like mole and directional drilling when digging is not ideal. For reliable water main service and transparent pricing, call Plumb Perfect at 509-663-3602.",
        ],
      },
      {
        url: "faucets-fixtures-sinks",
        icon: "/assets/icons/faucet.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/faucet.png",
        title: "Faucet, Fixture & Sink Installation and Repair",
        heading: "Faucets, Fixtures, & Sinks",
        bodyTexts: [
          "From a dripping faucet to a complete sink replacement, Plumb Perfect provides expert installation and repair services for all your plumbing fixtures in Wenatchee. Our service vans are well-stocked with common parts to address many repairs on the spot, saving you time and money.",
          "Whether you're upgrading your bathroom or kitchen or need a simple repair, we can help. While we recommend brands like Moen for their reliability, we install all makes and models. We also offer access to a wide variety of sink styles and materials to match your aesthetic. Contact Plumb Perfect at 509-663-3602 to schedule an appointment.",
        ],
      },
      {
        url: "showers-and-tubs",
        icon: "/assets/icons/shower.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/shower.png",
        title: "Shower and Tub Installation & Repair Services",
        heading: "Showers & Tubs",
        bodyTexts: [
          "Upgrade your bathroom with professional shower and tub installation services from Plumb Perfect in Wenatchee. We handle everything from removing old units to installing new showers, tubs, shower pans, and soaking tubs. We partner with excellent contractors for complete bathroom remodels and offer a wide selection of materials and manufacturers to suit your style and budget.",
          "If your existing tub or shower has chips or is showing its age, repair or refinishing may be an option. Call Plumb Perfect at 509-663-3602 for an evaluation and expert recommendations for your shower and tub needs.",
        ],
      },
      {
        url: "water-filtration-systems",
        icon: "/assets/icons/water-filter.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/water-filter.png",
        title: "Water Filtration System Installation & Maintenance",
        heading: "Water Filtration Systems",
        bodyTexts: [
          "Ensure the purity of your water with professional water filtration system installation and repair from Plumb Perfect in Wenatchee. We begin with a thorough water test to identify any contaminants present, whether from well or municipal sources.",
          "Based on the results, we can recommend and install the most effective filtration system to address issues like hardness, rust, sulfur, bacteria, and more. From water softeners to UV disinfection systems, we provide solutions to give you peace of mind about your water quality. Call Plumb Perfect at 509-663-3602 for expert water filtration services.",
        ],
      },
      {
        url: "garbage-disposals",
        icon: "/assets/icons/garbage-disposal.svg",
        image:
          "gs://plumb-perfect-5af21.firebasestorage.app/garbage-disposal.png",
        title: "Garbage Disposal Repair & Installation Services",
        heading: "Garbage Disposals",
        bodyTexts: [
          "A malfunctioning garbage disposal can be a major inconvenience in your kitchen. Plumb Perfect offers reliable repair and installation services for garbage disposals in the Wenatchee area. Our experienced technicians can diagnose issues and provide efficient solutions to get your disposal working smoothly again.",
          "Whether you need a simple repair or a complete replacement, we can help you choose the right unit for your needs and ensure proper installation. Contact Plumb Perfect at 509-663-3602 for prompt and professional garbage disposal services.",
        ],
      },
      {
        url: "pipe-leaks-replacements",
        icon: "/assets/icons/pipe-leak.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/pipe-leak.png",
        title: "Pipe Leak Repair, Split Fixing & Pipe Replacement",
        heading: "Pipe Leaks & Replacements",
        bodyTexts: [
          "Don't let a pipe leak turn into a costly problem. Plumb Perfect in Wenatchee provides fast and reliable repair services for all types of pipes, including copper, PEX, PVC, and more. Whether it's a minor drip or a burst pipe, our skilled technicians are equipped to handle the situation efficiently.",
          "We also offer pipe replacement services when necessary, ensuring the integrity of your plumbing system. From routine maintenance to emergency repairs, you can trust Plumb Perfect to protect your property. Call us immediately at 509-663-3602 for prompt attention to any pipe leaks or issues.",
        ],
      },
      {
        url: "water-heaters",
        icon: "/assets/icons/water-heater.svg",
        image: "gs://plumb-perfect-5af21.firebasestorage.app/water-heater.png",
        title: "Water Heater Repair & Installation Services",
        heading: "Water Heaters",
        bodyTexts: [
          "Experiencing a lack of hot water can be a major disruption. Plumb Perfect in Wenatchee offers expert water heater repair and installation services for both gas and electric units, from small point-of-use heaters to large capacity tanks.",
          "Regular maintenance can significantly extend the life of your water heater. Our technicians can diagnose and repair issues efficiently, and when replacement is the best option, we'll provide you with the information to make an informed decision. Trust our expertise and commitment to safety when dealing with water heater services. Call Plumb Perfect at 509-663-3602 for reliable water heater solutions.",
        ],
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
