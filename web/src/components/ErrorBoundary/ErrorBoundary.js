import React ,{Component}from 'react'


class ErrorBoundary extends Component{
    state = {
        error: false
    }
    componentDidCatch(error, info){
        console.log(error)
        this.setState({error: true})
    }
    render(){
        if(!this.state.error){
            return this.props.children
        }
        return <h1>Errou caralho!</h1>
    }
}
export default ErrorBoundary