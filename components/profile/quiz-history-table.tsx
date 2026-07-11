import { History } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type QuizAttemptHistoryRow = {
  id: string;
  score: number;
  created_at: string;
  lessonName: string;
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
}

export function QuizHistoryTable({ attempts }: { attempts: QuizAttemptHistoryRow[] }) {
  if (attempts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
        <History className="h-8 w-8" />
        <p>No quiz attempts yet. Complete a lesson quiz to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lesson Name</TableHead>
            <TableHead>Score (%)</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attempts.map((attempt) => (
            <TableRow key={attempt.id}>
              <TableCell className="font-medium">{attempt.lessonName}</TableCell>
              <TableCell>{attempt.score}%</TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(attempt.created_at)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
