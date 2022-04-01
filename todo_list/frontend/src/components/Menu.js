import React from "react";
import {BoxMenu, Row, Column} from "./MenuStyles";
import {Link} from "react-router-dom"

const MenuItem = () => {
return(
    <BoxMenu>
        <Row>
          <Column>
            <Link to='/'>Users</Link>
          </Column>
          <Column>
            <Link to='/projects'>Projects</Link>
          </Column>
          <Column>
            <Link to='/todos'>Todos</Link>
          </Column>
        </Row>
    </BoxMenu>


)
}

export default MenuItem


