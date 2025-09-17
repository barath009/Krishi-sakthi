import React from 'react';
import type { Language, Task, WeeklyTasks } from '../types';
import { translations } from '../translations';
import { CalendarIcon } from './icons/CalendarIcon';

interface UpcomingTasksPageProps {
    todaysTasks: Task[];
    isTodaysTasksLoading: boolean;
    weeklyTasks: WeeklyTasks | null;
    isWeeklyTasksLoading: boolean;
    language: Language;
}

const TaskItem: React.FC<{ text: string, completed?: boolean }> = ({ text, completed }) => (
    <div className={`flex items-start gap-3 p-3 bg-gray-50 rounded-lg ${completed ? 'opacity-60' : ''}`}>
        {typeof completed !== 'undefined' ? (
            <div className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 ${completed ? 'bg-farm-green border-farm-green' : 'border-gray-300'}`}>
                {completed && <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
        ) : (
            <div className="mt-1 w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></div>
        )}
        <p className={`${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{text}</p>
    </div>
);

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-3">
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse" style={{ animationDelay: '0.1s' }}></div>
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    </div>
);

export const UpcomingTasksPage: React.FC<UpcomingTasksPageProps> = ({ todaysTasks, isTodaysTasksLoading, weeklyTasks, isWeeklyTasksLoading, language }) => {
    const t = translations[language].upcomingTasks;
    
    return (
        <div className="max-w-screen-xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3">
                    <CalendarIcon className="h-8 w-8 text-farm-green-dark" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
                        <p className="text-gray-500 mt-1">{t.subtitle}</p>
                    </div>
                </div>
            </div>

            {/* Today's Tasks Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.todaysTasks}</h2>
                {isTodaysTasksLoading ? (
                    <LoadingSkeleton />
                ) : todaysTasks.length > 0 ? (
                    <div className="space-y-3">
                        {todaysTasks.map(task => (
                            <TaskItem key={task.id} text={task.text} completed={task.completed} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">{translations[language].tasks.noTasks}</p>
                )}
            </div>

            {/* Upcoming Tasks Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.upcomingHeader}</h2>
                {isWeeklyTasksLoading ? (
                    <LoadingSkeleton />
                ) : weeklyTasks ? (
                    <div className="space-y-6">
                        {Object.entries(weeklyTasks).map(([dayKey, tasks], index) => (
                            <div key={dayKey}>
                                <h3 className="font-bold text-farm-green-dark text-lg mb-2 pb-2 border-b border-gray-200">{t.day(index + 2)}</h3>
                                {tasks.length > 0 ? (
                                    <div className="space-y-2">
                                        {tasks.map((task, taskIndex) => (
                                            <TaskItem key={taskIndex} text={task} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 pl-4">{translations[language].tasks.noTasks}</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">{t.noUpcomingTasks}</p>
                )}
            </div>
        </div>
    );
};