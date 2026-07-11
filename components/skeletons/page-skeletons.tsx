import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-4 rounded-xl border p-6">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="mt-4 h-9 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LessonDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-2/3 max-w-md" />
        <Skeleton className="h-4 w-full max-w-2xl" />
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function QuizSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-1/2 max-w-sm" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-4 rounded-xl border p-6">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-40" />
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>
      <div className="space-y-4 rounded-xl border p-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-56" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function AdminSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>
      <Skeleton className="h-10 w-full max-w-xl" />
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  );
}
