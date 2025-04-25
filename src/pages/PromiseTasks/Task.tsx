import React, { useState } from 'react';
import { PromiseTaskProps } from './types';
import { Button, Card, Input, Space, Typography } from 'antd';
import { CodeOutlined, CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

export const Task: React.FC<PromiseTaskProps> = ({ task, onComplete, onNext }) => {
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleCheckAnswer = () => {
        const userOutput = userAnswer.split('\n').filter(line => line.trim());
        const isAnswerCorrect = JSON.stringify(userOutput) === JSON.stringify(task.expectedOutput);
        setIsCorrect(isAnswerCorrect);
        
        if (isAnswerCorrect) {
            onComplete();
        }
    };

    return (
        <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={3}>{task.title}</Title>
                <Text>{task.description}</Text>
                
                <Card>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{task.code}</pre>
                </Card>

                <Space direction="vertical" style={{ width: '100%' }}>
                    <Text strong>Введите ожидаемый вывод (каждый console.log с новой строки):</Text>
                    <TextArea
                        rows={4}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Введите вывод построчно"
                    />
                </Space>

                {isCorrect !== null && (
                    <Text type={isCorrect ? "success" : "danger"}>
                        {isCorrect ? "Правильно!" : "Неверно. Попробуйте еще раз."}
                    </Text>
                )}

                <Space>
                    <Button 
                        type="primary" 
                        icon={<CheckOutlined />}
                        onClick={handleCheckAnswer}
                    >
                        Проверить
                    </Button>
                    
                    {isCorrect && (
                        <Button 
                            type="primary" 
                            icon={<CodeOutlined />}
                            onClick={onNext}
                        >
                            Следующая задача
                        </Button>
                    )}
                </Space>
            </Space>
        </Card>
    );
}; 