import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './TodoInfographic.css';

const TodoInfographic = ({ category, todos = [], completedTodos = [] }) => {
  const [summary, setSummary] = useState({ total: 0, completed: 0, high: 0, medium: 0, low: 0 });

  useEffect(() => {
    const calculateSummary = () => {
      const total = todos.length;
      const completed = completedTodos.length;
      const high = todos.filter(todo => todo.priority === 'high').length;
      const medium = todos.filter(todo => todo.priority === 'medium').length;
      const low = todos.filter(todo => todo.priority === 'low').length;
      setSummary({ total, completed, high, medium, low });
    };

    calculateSummary();
  }, [todos, completedTodos]);

  const barData = {
    labels: ['Total', 'Completed', 'High Priority', 'Medium Priority', 'Low Priority'],
    datasets: [
      {
        label: 'Todos',
        data: [summary.total, summary.completed, summary.high, summary.medium, summary.low],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ]
      }
    ]
  };

  const pieData = {
    labels: ['High Priority', 'Medium Priority', 'Low Priority'],
    datasets: [
      {
        data: [summary.high, summary.medium, summary.low],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ]
      }
    ]
  };

  return (
    <div className="infographic-container">
      {/* <h2>{category} Todo Infographic</h2> */}
      <div className="infographic-chart">
        <h3>Todos Summary</h3>
        <Bar data={barData} />
      </div>
      <div className="infographic-chart pie-chart">
        <h3>Priority Distribution</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default TodoInfographic;


