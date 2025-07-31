'use client'
import { useEffect, useState } from "react";
import FilterPanel from "@/components/FilterPanel";
import CategoryList from "@/components/CategoryList";
import StatsCard from "@/components/StatusCard";
import { Category } from "../../types";

interface Problem {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  status: "solved" | "attempted" | "todo";
  pattern: string;
  starred: boolean;
  frequency?: number;
}

export default function Home() {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    difficulty: "all",
    pattern: "all",
    language: "javascript",
  });

  const [category, setCategory] = useState<Category[]>([]);

  // Calculate stats dynamically
  const solvedProblems = category.filter((p) => p.problems.isComplete === true).length;
  const stats = {
    totalSolved: solvedProblems,
    totalProblems: 300,
    easy: { solved: 5, total: 48 },
    medium: { solved: 2, total: 186 },
    hard: { solved: 0, total: 56 },
  };

  const updateProblemStatus = (problemId: string, newStatus: "solved" | "attempted" | "todo") => {
    setCategory((prev) => prev.map((problem) => (problem.id === problemId ? { ...problem, status: newStatus } : problem)));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/data");
        const data = await response.json();
        setCategory(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-background max-w-[900px] mx-auto">
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Master DSA Patterns</span>
          </h1>
          <p className=" sm:text-xl text-muted-foreground max-w-2xl mx-auto">Practice curated LeetCode problems organized by patterns. Build your problem-solving skills systematically.</p>
        </div>

        {/* Stats */}
        <StatsCard stats={stats} />

        {/* Filters */}
        <FilterPanel onFiltersChange={setFilters} />

        {/* Problem Lists */}
        <div className="space-y-8">
          <CategoryList
            categorys={category}
            progress={{ current: solvedProblems, total: category.length }}
            onUpdateStatus={updateProblemStatus}
          />
        </div>
      </main>
    </div>
  );
};
