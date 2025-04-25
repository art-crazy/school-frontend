export interface PromiseTask {
    id: number;
    title: string;
    description: string;
    code: string;
    expectedOutput: string[];
}

export interface PromiseTaskProps {
    task: PromiseTask;
    onComplete: () => void;
    onNext: () => void;
} 