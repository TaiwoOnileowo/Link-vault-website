import { LuFolders } from "react-icons/lu";
import { MdSettingsSuggest } from "react-icons/md";
import { MdAddLink } from "react-icons/md";
import { FaSync } from "react-icons/fa";
import { PiMouseRightClick } from "react-icons/pi";

export const features = [
  {
    title: "Save Links with Ease and Speed",
    description:
      "Save your important links in one place. No more searching through your browser history.",

    icon: <MdAddLink />,
  },
  {
    title: "Easily Manage and Access Your Vault",
    description: "Easily manage and access your links from anywhere, anytime.",

    icon: <MdSettingsSuggest />,
  },
  {
    title: "Organize Links into Folders",
    description:
      "Organize your links into folders for even more easy access and customization.",
    icon: <LuFolders />,
  },
];
export const more_features = [
  {
    title: "Sync Links Across Devices and Browsers",
    description:
      "Access your links from any device and browser. Your links are always in sync.",
  },
  {
    title: "Right Click to Save Links",
    description: "Right-click on any link to save it to your vault.",
  },
  {
    title: "Link Previews",
    description:
      "Hover on a link to get a preview of your saved links before opening them. No more surprises.",
  },
  {
    title: "Name Your Links",
    description: "Easily identify your links by giving them custom names.",
  },
  {
    title: "Pin Links",
    description: "Easily pin your important links to the top of your vault.",
  },
  {
    title: "Drag and arrange links",
    description: "Easily drag and arrange your links to keep them organized.",
  },
];

export const pricing = [
  {
    id: 1,
    name: "Premium Monthly",
    amount: 1,
    benefits: {
      1: "Card, Bank Transfer <br> USDT, BTC, ETH - Crypto Payment options",
      2: "Automated Group and Subscription Management",
      3: "Email Support",
      4: "Automated Renewal Reminders",
      5: "Analytics Dashboard",
    },
    benefits_sm: {
      1: "Card, Bank Transfer & USDT Crypto Payments",
      2: "Basic Group Management",
      // 3: "Email Support",
      // 4: "Automated Renewal Reminders",
      // 5: "Analytics Dashboard",
    },
    text: "+ Zero fees till $1000 in transactions, then 8% fee",
    // text2: ""
    button: "Start For Free",
  },
  // {
  //   id: 2,
  //   name: "Standard Plan",
  //   amount: 99,
  //   amount_annual: 490,
  //   transaction_fee: 5,
  //   benefits: {
  //     1: "Everything from Free Tier",
  //     2: "Expanded Payment Options: USDT,Crypto",
  //     3: "Advanced Analytics",
  //     4: "Access Codes",
  //     5: "Priority Email Support",
  //     6: "Custom Broadcasts",
  //   },
  //   // text: "Best if you're making up to $2.5K/mo",
  //   button: "Start free trial",
  // },
  {
    id: 2,
    name: "Premium",
    amount: 149,
    amount_annual: 990,
    transaction_fee: 2.5,
    benefits: {
      1: " All Free Tier features",
      2: "Full bot Customization to your Brand",
      3: "Priority Email Support for members",
      4: " Access Codes",
      5: "Comprehensive Analytics",
      6: "Custom Broadcasts",
      7: "Dedicated Account Manager",
      8: "Comprehensive Analysis",
      9: "24/7 Priority Phone & Email Support",
    },
    benefits_sm: {
      1: " All Free Tier features",
      2: "Full bot Customization to your Brand",
      // 3: "Priority Email Support for members",
      // 4: " Access Codes",
      // 5: "Comprehensive Analytics",
      // 6: "Custom Broadcasts",
      // 7: "Dedicated Account Manager",
      // 8: "Comprehensive Analysis",
      // 9: "24/7 Priority Phone & Email Support",
    },
    text: "+ 3% transaction fee on every $100",
    text2: "+ 2.5% transaction fee",
    button: "Get Started",
  },
];
export const faqs = [
  {
    question: "What is Link Vault?",
    answer:
      "Link Vault is a link management tool that allows you to save, organize, and access your links from anywhere, anytime.",
  },
  {
    question: "How do I save links to Link Vault?",
    answer:
      "You can save links to Link Vault by right-clicking on any link and selecting 'Save to Link Vault'.",
  },
  {
    question: "Can I access my links from any device?",
    answer:
      "Yes, you can access your links from any device and browser. Your links are always in sync.",
  },
  {
    question: "How do I organize my links?",
    answer:
      "You can organize your links into folders for even more easy access and customization.",
  },
  {
    question: "How do I get started with Link Vault?",
    answer:
      "You can get started with Link Vault by signing up for an account and adding your first link.",
  },
  {
    question: "How do I upgrade to a premium plan?",
    answer:
      "You can upgrade to a premium plan by selecting the plan that best fits your needs and completing the payment process.",
  },
];

export const pricingFeatures = {
  free: {
    title: "Free features",
    features: [
      "Save links with ease and speed",
      "Easily manage and access your vault",
      "Name your links",
      "Organize links into folders",
      "Right-click to save links",
    ],
  },
  premium: {
    title: "Get Premium access to all features",
    features: [
      "Everything from the Free plan",
      "Sync links across devices and browsers",
      "Link previews",
      "Extra browser context menu options",
      "Pin more than 5 links and folders",
      "Customization of the extension's behavior",
      "Change and upload custom folder icons",
      "Ad-free experience",
    ],
  },
};

export const signinText = [
  {
    mainText: "Link Vault helps you easily save and access your links.",
    subText: "Keeps your browser clean",
  },
  {
    mainText: "Easily create folders to organize your links.",
    subText: "Keep your links organized",
  },
  {
    mainText: "Directly add links from your browser.",
    subText: "Just right-click and save",
  },
  {
    mainText: "Easily search and find your saved links.",
    subText: "Find that link in seconds",
  },
  {
    mainText: "You can add folder icons to your folders.",
    subText: "Give it some style",
  },
 
];