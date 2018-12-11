import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Authority from 'panel/containers/Authority';
import Processing from 'panel/containers/Processing';

class App extends Component{
    render() {
        return (
            <div>
                <Route exact path='/' component={Authority} />
                <Route path='/processing' component={Processing}/>
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
