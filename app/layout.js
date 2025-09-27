import "./globals.css";
import Navbar from "../components/Navbar";
import { GoalProvider } from "../contexts/GoalContext";


export const metadata = {
  title: "Goal Tracker",
  description: "Track your daily and weekly goals",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        <GoalProvider>
         <Navbar />
         {children}
        </GoalProvider>
      </body>
    </html>
  );
}
