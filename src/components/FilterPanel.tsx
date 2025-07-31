import { Search, Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface FilterPanelProps {
  onFiltersChange: (filters: any) => void;
}

const FilterPanel = ({ onFiltersChange }: FilterPanelProps) => {
  const handleReset = () => {
    onFiltersChange({
      search: "",
      status: "all",
      difficulty: "all",
      pattern: "all",
      language: "all",
    });
  };

  return (
    <Card className="gradient-card shadow-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground hover:text-primary"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <Label
              htmlFor="search"
              className="text-sm font-medium text-foreground"
            >
              Search
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="search"
                placeholder="Search problems..."
                className="pl-10 bg-secondary border-border focus:border-primary transition-smooth"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Status</Label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-secondary border-border focus:border-primary w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="attempted">Attempted</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Difficulty</Label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-secondary border-border focus:border-primary w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pattern */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Pattern</Label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-secondary border-border focus:border-primary w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patterns</SelectItem>
                <SelectItem value="arrays">Arrays</SelectItem>
                <SelectItem value="strings">Strings</SelectItem>
                <SelectItem value="linked-list">Linked List</SelectItem>
                <SelectItem value="trees">Trees</SelectItem>
                <SelectItem value="graphs">Graphs</SelectItem>
                <SelectItem value="dynamic-programming">Dynamic Programming</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Language */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Preferred Language</Label>
            <Select defaultValue="javascript">
              <SelectTrigger className="bg-secondary border-border focus:border-primary w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="go">Go</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
