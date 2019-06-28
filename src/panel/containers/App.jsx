import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Authority from 'panel/containers/Authority';
import Form from 'panel/containers/Form';
import Processing from 'panel/containers/Processing';
import Success from 'panel/containers/Success';

window.PIXISON_ENV = 'panel';

class App extends Component{
    render() {
        return (
            <div>
                <Route exact path='/' component={Authority} />
                <Route path='/form' component={Form}/>
                <Route path='/processing' component={Processing}/>
                <Route path='/success' component={Success}/>
            </div>
        )
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    componentDidMount() {
        chrome.runtime.onMessage.addListener(event => {
            let {type, dataUrl} = event;

            if (type === 'IMAGE_PARSED_END') {
                this.setState({
                    dataUrl
                })
            }
        })
    }
}

export default App;
