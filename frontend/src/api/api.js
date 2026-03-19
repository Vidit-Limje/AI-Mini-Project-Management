const BASE = "https://ai-project-management-latest.onrender.com";

export const getProjects = () =>
 fetch(`${BASE}/projects`).then(res => res.json());

export const createProject = (data) =>
 fetch(`${BASE}/projects/`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(data)
 }).then(res=>res.json());


export const getProjectTasks = (projectId) =>
 fetch(`${BASE}/projects/${projectId}/tasks`)
 .then(res=>res.json());


export const createTask = (data) =>
 fetch(`${BASE}/tasks/`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(data)
 }).then(res=>res.json());


export const updateTask = (taskId,data) =>
 fetch(`${BASE}/tasks/${taskId}`,{
  method:"PUT",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(data)
 }).then(res=>res.json());


export const getUsers = () =>
 fetch(`${BASE}/users`).then(res=>res.json());

export const getComments = (taskId) =>
 fetch(`${BASE}/comments/task/${taskId}`)
 .then(res => res.json());

export const createComment = (data) =>
 fetch(`${BASE}/comments/`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(data)
 }).then(res=>res.json());

export const deleteComment = (id) =>
 fetch(`${BASE}/comments/${id}`,{
  method:"DELETE"
 }).then(res=>res.json());
