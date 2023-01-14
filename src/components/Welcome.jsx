import styled from "styled-components";

const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
color:white;
img{
    height:20rem;
}
span{
    color:#4e0eff;
}

`;
const Welcome = ({ currentUser }) => {
    return (
        <Container>
            <img src="robot" alt="robot" />
            <h1> Welcome, <span> {currentUser?.username}</span></h1>
            <h3>Please select a chat to start Messaging...</h3>
        </Container>
    )
}

export default Welcome;
