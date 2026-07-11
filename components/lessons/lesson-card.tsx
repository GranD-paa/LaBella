import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Lesson } from "@/types";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Card className="group flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BookOpen className="h-5 w-5" />
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-lg">{lesson.title}</CardTitle>
          <CardDescription className="line-clamp-3 min-h-[3.75rem]">
            {lesson.description || "No description provided for this lesson."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1" />
      <CardFooter>
        <Button asChild className="w-full group-hover:bg-primary/90">
          <Link href={`/lesson/${lesson.id}`}>
            View Lesson
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
