import { Suspense } from "react";

import { NotFoundContent } from "@/components/not-found-content";
import { RouteSkeleton } from "@/components/route-skeleton";

export default function NotFound() {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <NotFoundContent />
    </Suspense>
  );
}
