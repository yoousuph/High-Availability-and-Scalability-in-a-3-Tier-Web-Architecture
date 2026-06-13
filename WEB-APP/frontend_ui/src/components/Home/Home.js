
    import React, {Component} from 'react';
    import architecture from '../../assets/3TierArch.png'

    class Home extends Component {
        render () {
        return (
            <div>
            <h1 style={{color:"white"}}>Three-Tier Web Application</h1>
            <img src={architecture} alt="3T Web App Architecture" style={{height:500,width:925}} />
          </div>
        );
      }
    }

    export default Home;