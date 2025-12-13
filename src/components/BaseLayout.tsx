import { useNavigate } from "@tanstack/react-router";

export default function BaseLayout() {
  const navigate = useNavigate();
  navigate({
    to: "/login",
  });
  return (
    <div className="size-full flex items-center justify-center bg-gray-200">
      <img src="/react.svg" className="size-48" alt="React logo" />
    </div>
  );
}
