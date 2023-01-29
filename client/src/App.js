import React from 'react';
import './styles/App.css';
import SimpleComponent from './components/SimpleComponent';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {apiResponse: "API has not been called "};
  }

  handleClick = () => {
    fetch(`/some-api`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          apiResponse: result.payload
        });
      },
      (error) => {
        this.setState({
          apiResponse: "/some-api failed"
        });
      }
    )
  }

  render() {
    return (
      <div>
        <div className="class-with-red-text">
          Please call '/some-api' from the backend by clicking below!
        </div>

        <button onClick={this.handleClick}>Call API</button>

        <br></br>
        <br></br>

        <div className="class-with-blue-text">
          Current API Response: 
        </div>

        {this.state.apiResponse}

        <br></br>
        <br></br>

        <div>
          The component below was imported from 'src/components'
        </div>
        <SimpleComponent startingCount={10}/>
      </div>
    );
  }
}

export default App;
