import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {

    return (
        <tr>
            <td>
                {project.title}
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <button onClick={()=> deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {

    return(
        <div>
            <table>
                <tr>
                    <th>
                        Title
                    </th>
                    <th>
                        Link
                    </th>
                    <th>
                        Users
                    </th>
                     <th>

                    </th>
                </tr>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}
/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
            </div>
    )
}

export default ProjectList


