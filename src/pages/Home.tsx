import { Link } from "@tanstack/react-router";

export default function (props: any) {
  return (
    <div className="">
      <div className="">Home</div>
      <Link to="/login">Login</Link>
    </div>
  );
}
