import { useState } from "react";
import { Check, X, Clock, Star, ExternalLink, Code, Play } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Category } from "../../types";

interface Problem {
  id: string;
  title: string;
  external_link: string;
  difficulty: "easy" | "medium" | "hard";
  pattern_id: string;
  order_idx: string;
  todo: boolean;
  isComplete: boolean;
}

interface CategoryListProps {
  pattern: string;
  categorys: Category[];
  progress: { current: number; total: number };
  onUpdateStatus?: (problemId: string, status: "solved" | "attempted" | "todo") => void;
}

const CategoryList = ({ pattern, categorys, progress, onUpdateStatus }: CategoryListProps) => {
  const [starredProblems, setStarredProblems] = useState<Set<string>>(new Set());

  const toggleStar = (problemId: string) => {
    setStarredProblems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) {
        newSet.delete(problemId);
      } else {
        newSet.add(problemId);
      }
      return newSet;
    });
  };

  const getStatusIcon = (status: Problem["status"], problemId: string) => {
    const handleStatusClick = () => {
      if (onUpdateStatus) {
        const newStatus = status === "todo" ? "solved" : status === "solved" ? "todo" : "solved";
        onUpdateStatus(problemId, newStatus);
      }
    };

    switch (status) {
      case "solved":
        return (
          <Check
            className="h-4 w-4 text-success cursor-pointer"
            onClick={handleStatusClick}
          />
        );
      case "attempted":
        return (
          <Clock
            className="h-4 w-4 text-warning cursor-pointer"
            onClick={handleStatusClick}
          />
        );
      default:
        return (
          <div
            className="h-4 w-4 rounded border-2 border-muted-foreground cursor-pointer"
            onClick={handleStatusClick}
          />
        );
    }
  };

  const getDifficultyColor = (difficulty: Problem["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return "text-sky-400";
      case "medium":
        return "text-yellow-400";
      case "hard":
        return "text-destructive";
    }
  };

  const progressPercentage = (progress.current / progress.total) * 100;

  return (
    <>
      {categorys.map((category) => (
        <Card className="gradient-card shadow-card border-border" key={category.id}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold text-foreground capitalize">{category.name}</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80"
              >
                View All
              </Button>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Progress: {progress.current} / {progress.total}
                </span>
                <span className="text-primary font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-1.5"
              />
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-2">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">
                <div className="col-span-1">Status</div>
                <div className="col-span-5">Problem</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-2">Solution</div>
                <div className="col-span-1">Star</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Problem Rows */}
              <div className="space-y-1">
                {category.problems.map((problem) => (
                  <div
                    key={problem.id}
                    className={cn(
                      "grid grid-cols-12 gap-4 px-4 py-3 rounded-lg transition-smooth hover:bg-secondary/50",
                      problem.isComplete === true && "bg-green-400/5 hover:bg-green-400/10 border-l-2 border-l-green-400/50"
                    )}
                  >
                    {/* Status */}
                    <div className="col-span-1 flex items-center">{getStatusIcon(problem.status, problem.id)}</div>

                    {/* Problem Title */}
                    <div className="col-span-5 flex items-center">
                      <span className="text-foreground hover:text-primary cursor-pointer transition-smooth">{problem.title}</span>
                      {problem.frequency && (
                        <Badge
                          variant="secondary"
                          className="ml-2 text-xs"
                        >
                          {problem.frequency}%
                        </Badge>
                      )}
                    </div>

                    {/* Difficulty */}
                    <div className="col-span-2 flex items-center">
                      <Badge
                        variant="secondary"
                        className={cn("capitalize", getDifficultyColor(problem.difficulty))}
                      >
                        {problem.difficulty}
                      </Badge>
                    </div>

                    {/* Solution */}
                    <div className="col-span-2 flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Code className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Star */}
                    <div className="col-span-1 flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleStar(problem.id)}
                      >
                        <Star className={cn("h-4 w-4", starredProblems.has(problem.id) || problem.starred ? "fill-warning text-warning" : "text-muted-foreground")} />
                      </Button>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-primary"
                      >
                        Solve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default CategoryList;
