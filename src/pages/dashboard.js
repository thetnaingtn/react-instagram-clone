import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";

export default function Dashboard() {
  return (
    <div className="bg-gray-background">
      <Header />
      <Sidebar />
      <Timeline />
    </div>
  );
}
