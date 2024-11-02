"use client";
import Navbar from "@/components/dashboard/ui/navbar";
import { ReactElement } from "react";

interface Props {
  children?: ReactElement | ReactElement[];
}

export default function DashboardLayout({ children }: Props) {
  //  isPending ? (
  //   <DotLoader />
  // ) : (
  return (
    <section className="max-h-screen">
      <Navbar />
      <div className="bg-[#eeedf6] px-4 pt-2.5 pb-4 min-h-[89vh]">
        <div className="max-w-[1200px] mx-auto">{children}</div>
      </div>
    </section>
  );
}
