import Navbar from "@/components/Navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <Navbar />
      <main className="flex-1 mx-auto container max-w-screen-xl mt-10 px-4 py-8">
        {children}
      </main>
    </div>
  );
}
