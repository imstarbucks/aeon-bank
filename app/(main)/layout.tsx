import { Nav } from "@/components/ui/nav";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default MainLayout;
