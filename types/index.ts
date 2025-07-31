export interface Category {
  id: string;
  name: string;
  info_path: string;
  order_idx: string;
  problems: Problem[];
}

export interface Problem {
  id: string;
  title: string;
  external_link: string;
  difficulty: "Easy" | "Medium" | "Hard";
  pattern_id: string;
  order_idx: string;
  todo: boolean;
  isComplete: boolean;
}
