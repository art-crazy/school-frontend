interface Task {
	id: number;
	question: string;
	answer: string;
}

export const dataTasks : Task[] = [
	{ id: 1, question: '2 + 2 = ?', answer: '4' },
	{ id: 2, question: 'Столица Франции?', answer: 'Париж' },
];
