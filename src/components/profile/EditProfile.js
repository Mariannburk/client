import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 500px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 500px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //here the updated username and birthDate are read
            username: null,
            dateOfBirth: null,
            user: props.location.user
        };
        this.user = props.location.user;
    }
    logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }
    handleInputChange(key, value){
        this.setState({[key]: value});
    }
   getUpdatedInfo(){
        const status = response => {
            if (response.status === 200) {
                return Promise.resolve(response);
            }
            return Promise.reject(new Error(response.statusText));
        };

        const json = response => response.json();

        fetch(`${getDomain()}/users/` + this.state.id , {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(status)
            .then(json)
            .then(data => {
                this.setState({user: data});
            })
            .catch(err => {
                alert(`Problem while getting the new data: ${err.message}`);
            })

    }
    update() {
        const status = response => {
            if (response.status === 204) {
                return Promise.resolve(response);
            }
            return Promise.reject(new Error(response.statusText));
        };

        fetch(`${getDomain()}/users/` + this.state.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                id: localStorage.getItem("id"),
                username: this.state.username,
                dateOfBirth: this.state.dateOfBirth,
            })
        })
            .then(status)
            .then(data => {
                this.getUpdatedInfo();
                alert("Update Successful!");
            })
            .catch(err => {
                alert("There was a problem while updating your info.Check username.")
            })
    }
    render() {
        let userName = this.state.username;
        let dob = this.state.dateOfBirth;
        return(
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <h1>Update your profile:</h1>
                        <Label>Username: </Label>
                        <InputField
                            placeholder="Update your username"
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
                            }}
                        />
                        <Label>Date of Birth: </Label>
                        <InputField
                            placeholder="Add the date in the following format: 31/12/2000"
                            onChange={e => {
                                this.handleInputChange("dateOfBirth", e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                //doesnt want to work
                                width="50%"
                                disabled={(!userName && !dob)}
                                onClick={() => {
                                    this.update();
                                    let user = this.state.user;
                                    let directory = "/userProfile/"+this.user.id;
                                    this.props.history.push({pathname: directory, state:{user}});
                                }}
                            >
                                Save
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.props.history.go(-1);

                                }}
                            >
                                Cancel
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.logout();
                                }}
                            >
                                Logout
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        )
    };
}
export default withRouter(EditProfile);
