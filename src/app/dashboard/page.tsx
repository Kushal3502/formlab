import CreateFormButton from "@/components/CreateFormButton";
import Forms from "@/components/FormCard";

function Dashboard() {
  return (
    <div className=" grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
      <CreateFormButton />
      <Forms />
    </div>
  );
}

export default Dashboard;
