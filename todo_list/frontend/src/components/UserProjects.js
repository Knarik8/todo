import React from "react";
import {useParams} from "react-router-dom";


const ProjectItem = ({project}) => {

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
        </tr>
    )
}

const ProjectListUser = ({projects}) => {

    let {id} = useParams()
    // console.log()

    let filter_item = projects.filter((project => project.users.includes(parseInt(id))))

     return(
        <table>
            <th>
                Title
            </th>
            <th>
                Link
            </th>
            <th>
                Users
            </th>
            {filter_item.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}

export default ProjectListUser


