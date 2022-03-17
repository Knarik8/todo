import React from "react";
import {BoxMenu, Row, Column, MenuLink} from "./MenuStyles";

const MenuItem = () => {
return(
    <BoxMenu>
        <Row>
          <Column>
            <MenuLink href="#">Projects</MenuLink>
          </Column>
            <Column>
            <MenuLink href="#">Contacts</MenuLink>
          </Column>
            <Column>
            <MenuLink href="#">About Us</MenuLink>
          </Column>
        </Row>
    </BoxMenu>


)
}

export default MenuItem


