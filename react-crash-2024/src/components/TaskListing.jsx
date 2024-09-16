import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import ListingItemTask from './ListingItemTask';

const TaskListing = ({ isHome = false }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const apiurl = 'http://localhost:8660/api/task';
      try {
        const res = await fetch(apiurl);
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.log("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  return (
    <section className={isHome ? "bg-red-800 px-4 py-10" : "bg-stone-800 px-4 py-10"}>
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isHome ? 'Recent Tasks' : 'Browse Tasks'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <Spinner />
          ) : (
            tasks.map((task) => (
              <ListingItemTask
                key={task._id}
                task={task}
                onTaskUpdate={handleTaskUpdate}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskListing;
