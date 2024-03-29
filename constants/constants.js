const walkthrough_01_01_images = [
  require("../assets/images/walkthrough/walkthrough_01_02.png"),
  require("../assets/images/walkthrough/walkthrough_01_03.png"),
  require("../assets/images/walkthrough/walkthrough_01_04.png"),
];

const walkthrough_01_02_images = [
  require("../assets/images/walkthrough/walkthrough_01_05.png"),
  require("../assets/images/walkthrough/walkthrough_01_06.png"),
  require("../assets/images/walkthrough/walkthrough_01_07.png"),
  require("../assets/images/walkthrough/walkthrough_01_01.png"),
];

const walkthrough = [
  {
    id: 0,
    title: "Genuine product",
    sub_title:
      "Fined You Suitable and confortable home at any angle of the country",
    image: require("../assets/images/walkthrough/walkthrough_01_04.png"),
  },
  {
    id: 1,
    title: "Give out Rent",
    sub_title:
      "You home is in your hand. Your Can Rent you Home, Car, Shop, Hotels and my More with us",
    image: require("../assets/images/walkthrough/walkthrough_01_03.png"),
  },
  {
    id: 2,
    title: "Easy search",
    sub_title:
      "Find Rent Place  easy. Search a Particuler Location and we show you all the Avelable Rent in that area",
    image: require("../assets/images/walkthrough/walkthrough_01_05.png"),
  },
  {
    id: 3,
    title: " Easy Exchange ",
    sub_title:
      "Easily Exchange thing you are not confortable with. We called it batter Exchange",
    image: require("../assets/images/walkthrough/walkthrough_01_07.png"),
  },
];

const Category = [
  {
    id: 0,
    label: "All category",
  },
  {
    id: 1,
    label: "Cream",
  },
  {
    id: 2,
    label: "Serum",
  },
  {
    id: 3,
    label: "Scrub",
  },
  {
    id: 4,
    label: "Oil",
  },
  {
    id: 5,
    label: "Soap",
  },
  {
    id: 6,
    label: "Shower gel ",
  },
  {
    id: 7,
    label: "Perfume",
  },
  {
    id: 8,
    label: "Hair",
  },
  {
    id: 9,
    label: "Kids ",
  },
  {
    id: 10,
    label: "Sets ",
  },  {
    id: 11,
    label: "Accessary ",
  },  {
    id: 12,
    label: "Tea",
  },
];

const Suggestion = [
  {
    id: 0,
    label: "Appartment",
  },
  {
    id: 1,
    label: "Hotels",
  },
  {
    id: 2,
    label: "Shops",
  },
  {
    id: 3,
    label: "Rooms",
  },
  {
    id: 4,
    label: "Exchange",
  },
  {
    id: 5,
    label: "Real Estate",
  },
  {
    id: 6,
    label: "Single Rooms",
  },
  {
    id: 7,
    label: "Cars",
  },
];

const Message = [
  {
    id: 1,
    title: "Kebba Waiga",
    description: "Please send your address",
    date: "Dec 24",
    number: 8,
    owner: true,
  },
  {
    id: 2,
    title: "Omar Ceesay",
    description:
      "I would really appreciated if you could give me some discount",
    date: "3 munit ago",
    number: 12,
    owner: false,
  },
  {
    id: 3,
    title: "Abdoulie Waiga",
    description: "I am still waitin for your replay",
    date: "8:10am",
    number: 4,
    owner: true,
  },
  {
    id: 4,
    title: "Kandeh Waiga",
    description: "Is this place still avelable",
    date: "Yesterday",
    number: 1,
    owner: false,
  },
  {
    id: 5,
    title: "Mama Damba",
    description: "Can you send me more picture about this particuler item",
    date: "Dec 24",
    number: 3,
    owner: false,
  },
  {
    id: 6,
    title: "Adama Waiga",
    description: "Please send your address",
    date: "Yesterday",
    number: 12,
    owner: true,
  },
  {
    id: 7,
    title: "Muhammed Waiga",
    description: "Please send your address",
    date: "Monday",
    number: 1,
    owner: true,
  },
];

export default {
  walkthrough_01_01_images,
  walkthrough_01_02_images,
  walkthrough,
  Category,
  Suggestion,

  Message,
};
