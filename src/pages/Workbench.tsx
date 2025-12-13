import { Outlet } from "@tanstack/react-router";

export default function (props: any) {
  return (
    <div className="">
      <div className="">Workbench</div>
      <Outlet />
    </div>
  );
}
