/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
        display: ["Rajdhani", "Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        night: "#071016",
        ink: "#0d1820",
        panel: "#10202b",
        line: "rgba(180, 215, 255, 0.15)",
        signal: "#35d39f",
        amber: "#f5c451",
        ocean: "#39a8ff",
        coral: "#ff6b6b"
      },
      boxShadow: {
        glow: "0 0 40px rgba(53, 211, 159, 0.18)",
        card: "0 20px 60px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
        maplines:
          "radial-gradient(circle at 15% 20%, rgba(57,168,255,.18), transparent 25%), radial-gradient(circle at 80% 10%, rgba(53,211,159,.12), transparent 30%), radial-gradient(circle at 65% 85%, rgba(245,196,81,.12), transparent 28%)"
      }
    }
  },
  plugins: []
};
