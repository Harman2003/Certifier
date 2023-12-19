import {
  people01,
  people02,
  people03,
  facebook,
  instagram,
  linkedin,
  twitter,
  airbnb,
  binance,
  coinbase,
  dropbox,
  send,
  shield,
  star,
} from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "product",
    title: "Product",
  },
  {
    id: "clients",
    title: "Clients",
  },
];

export const features: featuresProp[] = [
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "Experience unparalleled security with our blockchain technology, ensuring 100% protection for your certificates against tampering",
  },
  {
    id: "feature-1",
    icon: star,
    title: "Customized Templates",
    content:
      "Tailor certificates to your unique needs with our customizable templates, providing a personalized touch to every achievement and event.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Share & Validate",
    content:
      "Effortlessly share certificates and validate achievements with ease, fostering a seamless and reliable verification process for all recipients",
  },
];

export interface featuresProp{
  id: string;
  icon: string;
  title: string,
  content:string
}

export const feedback: feedbackProps[] = [
  {
    id: "feedback-1",
    content:
      "The customization options and beautiful templates make every certificate unique. Certify truly stands out for its innovation.",
    name: "Herman Jensen",
    title: "Anonymous",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      " The blockchain technology ensures unparalleled security, and the intuitive dashboard simplifies event oversight. ",
    name: "Steve Mark",
    title: "Anonymous",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "Certify has exceeded our expectations in every way. The user-friendly dashboard empowers us to effortlessly manage events",
    name: "Kenn Gallagher",
    title: "Anonymous",
    img: people03,
  },
];

export interface feedbackProps {
  id: string;
  content: string;
  name:string
  title: string;
  img: string;
}

export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "1000+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "100+",
  },
  {
    id: "stats-3",
    title: "Certificates",
    value: "10L+",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];
