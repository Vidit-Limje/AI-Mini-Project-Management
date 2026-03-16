import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {

  return (

    <div className="project-card">

      <div className="project-card-top">

        <div className="project-icon">
          {project.project_name.charAt(0).toUpperCase()}
        </div>

        <div className="project-info">

          <h3 className="project-title">
            {project.project_name}
          </h3>

          <span className="project-domain">
            {project.domain}
          </span>

        </div>

      </div>

      <Link
        className="project-open-btn"
        to={`/project/${project.project_id}`}
      >
        Open Project →
      </Link>

    </div>

  );
}