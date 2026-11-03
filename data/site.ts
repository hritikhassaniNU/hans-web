export const site = {
  name: "Hans Enterprises",
  short: "HANS",
  founded: 1984,
  owner: "Lavesh Hassani",
  url: "https://www.hanslights.in",
  // IndiaMART-routed number. Replace with the direct business number before launch.
  phone: "917949322065",
  phoneDisplay: "+91 79493 22065",
  email: "",
  gstin: "27AADPH8093D3ZO",
  indiamart: "https://www.indiamart.com/hansenterprises-mumbai/",
  address: {
    lines: ["Gala No. 10, Ground Floor, Plot No. 7, S. No. 77", "Laxmi Industrial Estate, Sativali"],
    locality: "Vasai (East)",
    region: "Maharashtra",
    district: "Palghar",
    postcode: "401208",
    country: "IN"
  },
  facts: [
    ["Established", "1984"],
    ["Team", "26–50 people"],
    ["Buyer rating", "4.4 / 5 · 47 IndiaMART reviews"],
    ["Driver listings", "150+ models"],
    ["Dispatch", "Road, air, cargo, sea"],
    ["Payment", "Online, RTGS, cheque, DD"]
  ] as [string, string][],
  inside: ["Philips", "Fulham", "Osram", "Cree", "Bridgelux"]
};

export const waLink = (text = "Hello Hans Enterprises, I have an enquiry.") =>
  `https://wa.me/${site.phone}?text=${encodeURIComponent(text)}`;
