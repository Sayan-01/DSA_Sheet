import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StatsData {
  totalSolved: number;
  totalProblems: number;
  easy: { solved: number; total: number };
  medium: { solved: number; total: number };
  hard: { solved: number; total: number };
}

interface StatsCardProps {
  stats: StatsData;
}

const StatsCard = ({ stats }: StatsCardProps) => {
  const overallProgress = (stats.totalSolved / stats.totalProblems) * 100;

  return (
    <Card className="gradient-card shadow-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Progress</h2>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            {stats.totalSolved} / {stats.totalProblems} Solved
          </Badge>
        </div>

        <div className="space-y-4">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Overall Progress</span>
              <span className="text-muted-foreground">{Math.round(overallProgress)}%</span>
            </div>
            <Progress
              value={overallProgress}
              className="h-1.5"
            />
          </div>

          {/* Difficulty Breakdown */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {/* Easy */}
            <div className="text-center space-y-2">
              <div className="text-sm font-medium text-sky-400">Easy</div>
              <div className="text-2xl font-bold text-foreground">{stats.easy.solved}</div>
              <div className="text-xs text-muted-foreground">/ {stats.easy.total}</div>
              <Progress
                value={(stats.easy.solved / stats.easy.total) * 100}
                className="h-1.5"
              />
            </div>

            {/* Medium */}
            <div className="text-center space-y-2">
              <div className="text-sm font-medium text-warning text-yellow-400">Medium</div>
              <div className="text-2xl font-bold text-foreground">{stats.medium.solved}</div>
              <div className="text-xs text-muted-foreground">/ {stats.medium.total}</div>
              <Progress
                value={(stats.medium.solved / stats.medium.total) * 100}
                className="h-1.5"
              />
            </div>

            {/* Hard */}
            <div className="text-center space-y-2">
              <div className="text-sm font-medium text-destructive">Hard</div>
              <div className="text-2xl font-bold text-foreground">{stats.hard.solved}</div>
              <div className="text-xs text-muted-foreground">/ {stats.hard.total}</div>
              <Progress
                value={(stats.hard.solved / stats.hard.total) * 100}
                className="h-1.5"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
