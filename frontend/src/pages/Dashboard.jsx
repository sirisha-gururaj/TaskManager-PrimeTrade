import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import API from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const [userRole, setUserRole] = useState("user");

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const [editingTaskId, setEditingTaskId] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) {
      navigate("/");
      return;
    }

    const decoded = jwtDecode(token);

    setUserRole(decoded.role);

    fetchTasks();

    if (decoded.role === "admin") {
      fetchAllTasks();
    }

  }, []);

  const fetchTasks = async () => {

    try {

      const response = await API.get(
        "/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(response.data || []);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchAllTasks = async () => {

    try {

      const response = await API.get(
        "/tasks/admin/all-tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAllTasks(response.data || []);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingTaskId) {

        await API.put(
  `/tasks/${editingTaskId}`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

        setEditingTaskId(null);

      } else {

        await API.post(
          "/tasks",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      setFormData({
        title: "",
        description: ""
      });

      setShowModal(false);

      fetchTasks();

      if (userRole === "admin") {
        fetchAllTasks();
      }

    } catch (error) {

      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {

    try {

      await API.delete(
        `/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

      if (userRole === "admin") {
        fetchAllTasks();
      }

    } catch (error) {

      console.log(error);
    }
  };

  const openCreateModal = () => {

    setEditingTaskId(null);

    setFormData({
      title: "",
      description: ""
    });

    setShowModal(true);
  };

  const openEditModal = (task) => {

    setEditingTaskId(task._id);

    setFormData({
      title: task.title,
      description: task.description
    });

    setShowModal(true);
  };

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div className="dashboard">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <h1 className="dashboard-title">
            PrimeTrade Task Manager
          </h1>

          <p className="dashboard-subtitle">

            {
              userRole === "admin"
                ? "Administrator Access"
                : "Manage your tasks efficiently"
            }

          </p>

        </div>

        <div className="top-actions">

          <span
            className={
              userRole === "admin"
                ? "role-badge admin-badge"
                : "role-badge user-badge"
            }
          >
            {
              userRole === "admin"
                ? "ADMIN"
                : "USER"
            }
          </span>

          <button
            className="small-btn create-btn"
            onClick={openCreateModal}
          >
            + Create Task
          </button>

          <button
            className="small-btn logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

      {/* MY TASKS */}

      <div className="section-header">
        <h2>My Tasks</h2>
      </div>

      <div className="task-grid">

        {
          tasks.length === 0 ? (

            <div className="empty-state">
              No tasks created yet.
            </div>

          ) : (

            tasks.map((task) => (

              <div
                key={task._id}
                className="task-card"
              >

                <div>

                  <h3>{task.title}</h3>

                  <p>{task.description}</p>

                </div>

                <div className="task-actions">

                  <button
                    className="small-btn edit-btn"
                    onClick={() => openEditModal(task)}
                  >
                    Edit
                  </button>

                  <button
                    className="small-btn delete-btn"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )
        }

      </div>

      {/* ADMIN PANEL */}

      {
        userRole === "admin" && (

          <>

            <div
              className="section-header"
              style={{ marginTop: "50px" }}
            >
              <h2>Admin Panel</h2>

              <p
  className="dashboard-subtitle"
  style={{ marginTop: "6px" }}
>
  View and manage all users' tasks
</p>
            </div>

            <div className="task-grid">

              {
                allTasks.map((task) => (

                  <div
                    key={task._id}
                    className="task-card"
                  >

                    <div>

                      <h3>{task.title}</h3>

                      <p>{task.description}</p>

                      <p className="owner-text">
                        Owner: {task.owner_email}
                      </p>

                    </div>

                    <div className="task-actions">

                      <button
                        className="small-btn edit-btn"
                        onClick={() => openEditModal(task)}
                      >
                        Edit
                      </button>

                      <button
                        className="small-btn delete-btn"
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                ))
              }

            </div>

          </>
        )
      }

      {/* MODAL */}

      {
        showModal && (

          <div className="modal-overlay">

            <div className="modal">

              <div className="modal-header">

                <h2>
                  {
                    editingTaskId
                      ? "Edit Task"
                      : "Create Task"
                  }
                </h2>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="input-group">

                  <label>Task Title</label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                  />

                </div>

                <div className="input-group">

                  <label>Description</label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                  />

                </div>

                <div className="modal-actions">

                  <button
                    type="submit"
                    className="small-btn create-btn"
                  >
                    {
                      editingTaskId
                        ? "Update"
                        : "Create"
                    }
                  </button>

                  <button
                    type="button"
                    className="small-btn edit-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>
        )
      }

    </div>
  );
}

export default Dashboard;