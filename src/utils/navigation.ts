// An array of links for navigation bar
const navBarLinks = [
  { name: "მთავარი", url: "/" },
  { name: "პროდუქცია", url: "/products" },
  { name: "სერვისები", url: "/services" },
  { name: "სიახლეები", url: "/blog" },
  { name: "კონტაქტი", url: "/contact" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "ნავიგაცია",
    links: [
     //  { name: "გამოყენების ინსტრუქცია", url: "/products" },
      { name: "ტექნიკა და ინსტრუმენტები", url: "/products" },
      { name: "სამშენებლო მომსახურება", url: "/services" },
    ],
  },
  {
    section: "მთავარი",
    links: [
      { name: "სიახლეები", url: "/blog" },
      { name: "კონტაქტი", url: "/contact" },

     //  { name: "კარიერა", url: "/contact" },
      // { name: "Customers", url: "#" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  facebook: "https://www.facebook.com/miniteqnika/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};