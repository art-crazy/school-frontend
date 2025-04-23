import {dataTasks} from '@/data/tasks.ts';
import {useState} from "react";

export function Materials() {
	const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
	const [results, setResults] = useState<{ [key: number]: boolean | null }>({});
	
	const handleInputChange = (id: number, value: string) => {
		setUserAnswers((prev) => ({ ...prev, [id]: value }));
	};
	
	const handleCheckAnswer = (id: number, correctAnswer: string) => {
		const userAnswer = userAnswers[id]?.toLowerCase() || '';
		const isCorrect = userAnswer === correctAnswer.toLowerCase();
		setResults((prev) => ({ ...prev, [id]: isCorrect }));
	};
	
	return (
		<>
			<div>
				{dataTasks.map((task: dataTasks) => (
					<div key={task.id}>{task.question}
						<input
							type="text"
							placeholder="Введите ответ..."
							onChange={(e) => handleInputChange(task.id, e.target.value)}
						/>
						<button onClick={() => handleCheckAnswer(task.id, task.answer)}>
							Проверить
						</button>
						{results[task.id] !== null && (
							<p>{results[task.id] ? '✅Правильно!' : '❌Попробуйте ещё раз'}</p>
						)}
					</div>
				))}
			</div>
		</>
	)
}

