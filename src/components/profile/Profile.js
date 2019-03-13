import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.location.state.user
        };
    }

    logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }

    render() {
        return (
            <Container>
                <h2>Your profile:</h2>
                {/*<p>Get all users from secure end point:</p>*/}
                    <div>
                        <Users>

                                    <PlayerContainer key={this.state.user.id}>
                                        <Player user={this.state.user} />

                                    </PlayerContainer>

                        </Users>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.logout();
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(Profile);
