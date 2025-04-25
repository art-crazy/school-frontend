export interface BaseMaterial {
  id: string;
  title: string;
  order: number;
  sectionId: string;
}

export interface Article extends BaseMaterial {
  type: 'article';
  content: string;
}

export interface Video extends BaseMaterial {
  type: 'video';
  url: string;
  duration: number;
}

export interface Quiz extends BaseMaterial {
  type: 'quiz';
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export interface CodeTask extends BaseMaterial {
  type: 'code-task';
  code: string;
  expectedOutput: string;
  instructions: string;
  files?: {
    name: string;
    content: string;
  }[];
  description: string;
}

interface PromiseTaskContent {
  tasks: Array<{
    description: string;
    code: string;
    expectedOutput: string[];
    hints?: Array<{
      text: string;
    }>;
  }>;
}

export interface PromiseTask extends BaseMaterial {
  type: 'promise-task';
  content: PromiseTaskContent;
}

export type Material = Article | Video | Quiz | CodeTask | PromiseTask; 