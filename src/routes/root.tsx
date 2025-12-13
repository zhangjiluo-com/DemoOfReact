import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type ComponentType, type ReactNode, lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

// 加载中占位组件
const LoadingFallback = () => <div>加载中...</div>;
// 加载失败占位组件
const ErrorFallback = ({ error }: { error: Error }) => (
  <div>加载失败：{error.message}</div>
);

// 通用懒加载函数
export const lazyLoad = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback: ReactNode = <LoadingFallback />
) => {
  const LazyComponent = lazy(importFn);
  return (props: any) => (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};
