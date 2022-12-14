import React , { Component }from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


class Dashboard extends Component {

  // state = {
  //   response: '',
  //   post: '',
  //   responseToPost: '',
  // };
  
  handleSubmit = async (e) => {

    e.preventDefault();
    // const response = await fetch('http://localhost:8000/message', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ post: this.state.post }),
    // });
    
    // console.log(response);
    // this.setState({ responseToPost: "body" });
    
    // this.props.navigate(`/youtube/${this.props.location.state.Id}`,{state : {
    //   body : await response.text()
    // }});

    this.props.navigate(`/youtube/${this.props.location.state.Id}`);
  }
  
  render() {
    return (
      <div>

        <h1>Hello {this.props.location.state.FirstName} 
        {this.props.location.state.LastName} Welcome!! {this.props.location.state.Email}</h1>
        <form onSubmit={this.handleSubmit}>
          {/* <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          /> */}
          <button type="submit">YouTube</button>
        </form>
        {/* <p>{this.state.responseToPost}</p> */}
      </div>
    )
  }
}

function DashboardMain(props) {
  let navigate = useNavigate();
  let location = useLocation();
  return <Dashboard {...props} navigate={navigate} location = {location} />
}

export default DashboardMain;