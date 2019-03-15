import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import Player2 from "../../views/design/Player2";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  `;
  
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.location.state.user
        };
        this.user =props.location.state.user;
    }

   logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }

    render() {
        return (
            <Container>
                <h2>User profile:</h2>
                    <div>
                        <Users>
                            <PlayerContainer key={this.state.user.id}>

                                <Player2 user={this.state.user} />

                            </PlayerContainer>
                        </Users>
                        <ButtonContainer>
                            <Button
                                // only the user can edit their own profile
                                disabled={this.user.token !== localStorage.getItem("token")}
                                width="25%"
                                onClick={() => {
                                    this.props.history.push("/userProfile/"+this.state.user.id+"/EditProfile");
                                }}
                            >
                                Edit
                            </Button>
                            </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="25%"
                                onClick={() => {
                                this.props.history.go(-1);
                             }}
                            >
                                Back
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                        <Button
                            width="25%"
                            onClick={() => {
                                this.logout();
                            }}
                        >
                            Logout
                        </Button>
                        </ButtonContainer>
                    </div>
            </Container>
        );
    }
    }
export default withRouter(Profile);
