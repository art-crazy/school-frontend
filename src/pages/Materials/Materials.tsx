import {dataTasks} from '@/data/tasks.ts';
import {useState} from "react";

export function Materials() {
	const [userAnswer, setUserAnswer] = useState('');
	
	return (
		<>
			<div>
				{dataTasks.map((task: dataTasks) => (
					<div key={task.id}>{task.question}
						<input
							type="text"
							placeholder="Введите ответ..."
							onChange={(e) => setUserAnswer(e.target.value)}
						/>
						<button
							onClick={() => (task.answer.toLowerCase() === userAnswer.toLowerCase() ? console.log('Ответ верный') : console.log('Ответ не верный'))}
						>
							Проверить
						</button>
					</div>
				))}
			</div>
		</>
	)
}

