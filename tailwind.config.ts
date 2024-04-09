import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      spacing: {
        88: "22rem",
      },
      colors: {
        primary: "#6FA9E5",
        secondary: "#BED1E5",
        background: "#131A21",
        paper: "#283645",
      },
    },
  },
  plugins: [],
} satisfies Config;
