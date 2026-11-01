/* =============================================================
   YOUR CONTENT — edit only this file to update the portfolio.
   Anything marked TODO still needs your input.
   ============================================================= */

const PROFILE = {
  name: "Prajakta",                      // short name: logo + greetings
  fullName: "Prajakta Biradar",
  role: "Content Creator & Social Media Manager",
  tagline:
    "I script, shoot and edit Reels that bring brands to life online — for fitness studios, spas, salons, restaurants and beauty labels.",
  location: "Pune, India",               // TODO: confirm
  experienceYears: 3,
  education: "MBA · Information Technology",

  instagram: {
    handle: "@nehaa.20",
    url: "https://www.instagram.com/nehaa.20/",
    followers: 8394,                     // update from your profile now and then
    posts: 50,
  },
  email: "prajbiradar02@gmail.com",

  // WhatsApp: country code + number, digits only
  whatsapp: "917058121602",
  whatsappMessage:
    "Hi Prajakta! I saw your portfolio and would love to discuss a brand collaboration.",

  // Put your 2 photos in assets/images/ with these names
  portrait: "assets/images/portrait.jpg",
  aboutImage: "assets/images/about.jpg",

  bio: `
    <p>I'm an MBA (Information Technology) graduate who has spent the last 3+ years creating content for brands across fitness, beauty, wellness and hospitality.</p>
    <p>I work end to end: concept and script, shoot, edit, publish and, when needed, boost the post for extra reach. That means brands get content that looks good and is built to perform.</p>
  `,

  skills: [
    "Content Creation", "Scriptwriting", "Video Shooting", "Video Editing",
    "Instagram Marketing", "Paid Promotions", "Social Media Management",
    "Website Content", "Creative Storytelling",
  ],

  // ---- Optional: Instagram insights. Leave empty [] to hide the section. ----
  statsUpdated: "",
  stats: [
    // { value: 12000, suffix: "+", label: "Instagram followers" },
    // { value: 4.8, decimals: 1, suffix: "%", label: "Avg. engagement rate" },
  ],
  audience: { gender: [], age: [], cities: [] },
};

/* -------------------------------------------------------------
   BRANDS — shown in the "Brands I've worked with" wall.
   logo:     file in assets/logos/ ("" = elegant name tile instead)
   logoDark: true if the logo is white and needs a dark tile
   url:      where the tile links to (website or Instagram)
   ------------------------------------------------------------- */
const BRANDS = [
  { id: "whattheflex", name: "What the Flex", work: "Content production", logo: "assets/logos/whattheflex.png", url: "https://www.instagram.com/reel/DaXkKZpNNlp/" },
  { id: "kpilates", name: "K Pilates", work: "Promotional reel", logo: "", url: "https://www.instagram.com/kpilatesofficial/" },
  { id: "verosha", name: "Verosha – The Cave Spa", work: "Video production", logo: "assets/logos/verosha.png", url: "https://www.instagram.com/verosha.thecavespa/" },
  { id: "florian", name: "Florian Hurel Hair Couture & Spa", work: "Transformation reel", logo: "", url: "https://www.instagram.com/florianhurelhaircoutureandspa/" },
  { id: "etude", name: "ETUDE India", work: "Brand reel", logo: "", url: "https://www.instagram.com/reel/DcJE4gRNwOG/" },
  { id: "highland", name: "Highland Baner", work: "Venue promotion", logo: "", url: "https://www.instagram.com/reel/CxpwmVuKXm2/" },
  { id: "bringbalance", name: "Bring Balance", work: "Website shoot", logo: "", url: "https://www.instagram.com/p/DHTXonntLAx/" },
  { id: "bastion", name: "Bastion", work: "Venue promotion", logo: "", url: "" },
  { id: "muscleblaze", name: "MuscleBlaze", work: "Product review", logo: "assets/logos/muscleblaze.svg", logoDark: true, url: "https://www.muscleblaze.com/" },
  { id: "mcaffeine", name: "mCaffeine", work: "Product review", logo: "assets/logos/mcaffeine.png", url: "https://www.mcaffeine.com/" },
  { id: "explosivewhey", name: "Explosive Whey", work: "Product review", logo: "assets/logos/explosivewhey.png", url: "https://explosivewhey.com/" },
  { id: "snitch", name: "Snitch", work: "Brand collaboration", logo: "assets/logos/snitch.png", url: "https://www.snitch.co.in/" }, // TODO: confirm
];

/* -------------------------------------------------------------
   COLLABORATIONS — the campaign cards, each with Instagram proof.
   brand:  id from BRANDS above
   image:  screenshot, e.g. "assets/collabs/kpilates.jpg" ("" = logo/name tile)
   links:  first link is shown as a live Instagram preview
   ------------------------------------------------------------- */
const COLLABS = [
  {
    brand: "whattheflex",
    category: "Fitness",
    type: "Reel",
    image: "",
    summary: "End-to-end social content for What the Flex, from the first idea and script to the shoot and final edit.",
    did: ["Concept & scriptwriting", "Video shoot", "Editing & production"],
    links: [{ label: "Watch the reel", url: "https://www.instagram.com/reel/DaXkKZpNNlp/" }],
  },
  {
    brand: "kpilates",
    category: "Fitness",
    type: "Promotional reel",
    image: "",
    summary: "Promotional video for Pilates sessions at K Pilates, Baner. I shot and edited it, published it on my feed and boosted it to reach more local clients.",
    did: ["Video shoot & edit", "Published on my feed", "Paid boost for reach"],
    links: [
      { label: "Watch the reel", url: "https://www.instagram.com/reel/C2_-OIKKNKH/" },
      { label: "K Pilates on Instagram", url: "https://www.instagram.com/kpilatesofficial/" },
    ],
  },
  {
    brand: "verosha",
    category: "Wellness",
    type: "Reel series",
    image: "",
    summary: "Scripting, editing and video production for Verosha – The Cave Spa in Pune, capturing its calm, cave-inspired experience.",
    did: ["Scriptwriting", "Video production", "Editing"],
    links: [
      { label: "Watch reel 1", url: "https://www.instagram.com/reel/DSwUfdRjPPU/" },
      { label: "Watch reel 2", url: "https://www.instagram.com/reel/DSKgedeDABM/" },
      { label: "Verosha on Instagram", url: "https://www.instagram.com/verosha.thecavespa/" },
    ],
  },
  {
    brand: "florian",
    category: "Beauty",
    type: "Transformation reel",
    image: "",
    summary: "A promotional reel of my honey-brunette hair transformation, showing the salon's services and the overall experience.",
    did: ["Shoot & edit", "Service showcase", "Instagram promotion"],
    links: [
      { label: "Watch the reel", url: "https://www.instagram.com/reel/Dci3RF4tRT_/" },
      { label: "Florian Hurel on Instagram", url: "https://www.instagram.com/florianhurelhaircoutureandspa/" },
    ],
  },
  {
    brand: "etude",
    category: "Beauty",
    type: "Reel",
    image: "",
    summary: "Beauty content featuring ETUDE, the Korean makeup and skincare brand.",
    did: ["Content creation", "Product showcase"],
    links: [{ label: "Watch the reel", url: "https://www.instagram.com/reel/DcJE4gRNwOG/" }],
  },
  {
    brand: "highland",
    category: "Hospitality",
    type: "Reel",
    image: "",
    summary: "A reel showing the ambience, food and experience at Highland, a rooftop restro-bar in Baner.",
    did: ["Shoot & edit", "Venue showcase", "Instagram promotion"],
    links: [{ label: "Watch the reel", url: "https://www.instagram.com/reel/CxpwmVuKXm2/" }],
  },
  {
    brand: "bringbalance",
    category: "Wellness",
    type: "Website shoot",
    image: "",
    summary: "Photoshoot and content for the Bring Balance website, supporting the brand's digital presence.",
    did: ["Website shoot", "Website content"],
    links: [{ label: "View the post", url: "https://www.instagram.com/p/DHTXonntLAx/" }],
  },
  {
    brand: "",
    title: "Makeup Tutorials & Reviews",
    category: "Beauty",
    type: "Reel",
    image: "",
    summary: "Makeup tutorials and honest brand reviews created for my own audience.",
    did: ["Tutorials", "Product reviews"],
    links: [{ label: "Watch the reel", url: "https://www.instagram.com/reel/DejlmhSNBMP/" }],
  },
];

const SERVICES = [
  { title: "Reels & Content Creation", text: "Trend-aware Reels, tutorials and product reviews made to be watched, saved and shared." },
  { title: "Scriptwriting & Concepts", text: "Hooks, scripts and shot lists built around your product and your audience." },
  { title: "Video Shooting & Editing", text: "On-location shoots and polished edits for spas, studios, salons, cafés and brands." },
  { title: "Social Media Management", text: "Planning, posting and keeping your brand's Instagram consistent and active." },
  { title: "Paid Promotions & Boosting", text: "Boosting the right posts to reach more of the people who matter to you." },
  { title: "Website Content & Shoots", text: "Photos and content for your website and other digital channels." },
];

const PROCESS = [
  { title: "Brief", text: "You share the product, goals and timeline. I reply within 24 hours." },
  { title: "Concept", text: "I send the idea, script and a clear quote for approval." },
  { title: "Create", text: "Shoot and edit, with one round of revisions before posting." },
  { title: "Publish", text: "The post goes live, gets boosted if planned, and you see how it performs." },
];

// Add real quotes from brands here to show the testimonials section. Empty = hidden.
const TESTIMONIALS = [];
