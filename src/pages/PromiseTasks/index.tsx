import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, List, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Task } from './Task';
import { promiseTasks } from './data';
import { PromiseTask } from './types';

const { Title } = Typography;

export const PromiseTasksPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);

    const handleTaskComplete = () => {
        setCompletedTasks(prev => [...prev, currentTaskIndex]);
    };

    const handleNextTask = () => {
        if (currentTaskIndex < promiseTasks.length - 1) {
            setCurrentTaskIndex(prev => prev + 1);
        }
    };

    const currentTask: PromiseTask = promiseTasks[currentTaskIndex];

    return (
        <div style={{ padding: '24px' }}>
            <Button 
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
                style={{ marginBottom: '16px' }}
            >
                Назад
            </Button>

            <Title level={2}>Задачи на Promise</Title>
            
            <Card>
                <List
                    dataSource={promiseTasks}
                    renderItem={(task, index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={`${task.title} ${completedTasks.includes(index) ? '✓' : ''}`}
                                description={task.description}
                            />
                        </List.Item>
                    )}
                />
            </Card>

            <div style={{ marginTop: '24px' }}>
                <Task
                    task={currentTask}
                    onComplete={handleTaskComplete}
                    onNext={handleNextTask}
                />
            </div>
        </div>
    );
}; 