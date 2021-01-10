import Circle from 'react-circle';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense, Component } from 'react'


class propertyanalytics extends Component {
    constructor(props) {
        super(props);
        this.state = {

            percent: 5,
            value: 30,
        }
    }

    render() {
        return (
            <div>

<div className="row" >
                <div className="col-sm-4 "> 
                 <Circle
                    progress={35}
                /></div>
                <div className="col-sm-4 ">  
                <Circle
                    progress={44}
                /></div>

                <div className="col-sm-4 ">  
                <Circle
                    progress={90}
                /></div>


            </div>


<div className="row">
<div className="col-sm-4 ">
    <h3>
        Viewing...
    </h3>
</div>
<div className="col-sm-4 ">
<h3>
        Important...
    </h3>

</div>
<div className="col-sm-4 ">
<h3>
        Likes...
    </h3>


</div>


</div>

            </div>
         


        );
    }
}


export default propertyanalytics