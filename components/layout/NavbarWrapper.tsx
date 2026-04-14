import dynamic from "next/dynamic";

const Navbar = dynamic(
  () => import("./Navbar").then((m) => ({ default: m.Navbar })),
  {
    ssr: false,
    loading: () => (
      <div className="fixed top-0 left-0 right-0 h-16 lg:h-20 z-50 bg-transparent" />
    ),
  }
);

export function NavbarWrapper() {
  return <Navbar />;
}
