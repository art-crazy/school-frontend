export interface Material {
  id: string;
  title: string;
  type: 'article' | 'practice' | 'quiz' | 'promise-task';
  category: 'html' | 'css' | 'javascript' | 'react' | 'typescript';
  level: 'beginner' | 'intermediate' | 'advanced';
  content: string | {
    files: Record<string, string>;
    instructions?: string;
  } | {
    description: string;
    code: string;
    expectedOutput: string[];
  } | {
    description: string;
    tasks: Array<{
      id: string;
      title: string;
      code: string;
      expectedOutput: string[];
      explanation: string;
      hints?: Array<{
        id: number;
        text: string;
      }>;
    }>;
  };
  estimatedTime?: string;
  prerequisites?: string[];
} 