module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          midnight: "#0B0C15",
          obsidian: "#020408",
          cardBg: "rgba(255,255,255,0.04)",
          violetStart: "#7C3AED",
          violetEnd: "#C084FC",
          cyan: "#22D3EE",
          slateText: "#94A3B8"
        },
        backgroundImage: {
          'noise': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\"><filter id=\"n\"><feTurbulence baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.03\"/></svg>')"
        }
      }
    },
    plugins: [],
  }
  