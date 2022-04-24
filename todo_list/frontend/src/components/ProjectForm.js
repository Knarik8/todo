import React from "react";

class ProjectForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {'title': '', 'link': '', user: props.users[0].id}
    }

    handleUserChange(event){
        if(!event.target.selectedOptions){
            this.setState({
                'user':[]
            })
            return;
        }
        let users = []
        for(let i=0; i<event.target.selectedOptions.length;i++){
            users.push(event.target.selectedOptions.item(i).value)
        }

        this.setState({
            'user':users
        })
        console.log(users)
    }


    handleChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value,
            }
        );
        console.log(event.target.name, event.target.value)
    }

    handleSubmit(event){
        this.props.createProject(this.state.title, this.state.link, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="title">title</label>
                    <input type="text" className="form-control" name="title" placeholder="title"
                           value={this.state.title} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="login">link</label>
                    <input type="text" name="link" placeholder="link" value={this.state.link}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <select name="user" multiple onChange={(event)=>this.handleUserChange(event)}>
                    {this.props.users.map((item) => <option value={item.id}>{item.first_name}</option> )}
                </select>

                {/*<div className="form-group">*/}
                {/*    <label htmlFor="user">user</label>*/}
                {/*    <select name="user" className='form-control'*/}
                {/*            onChange={(event)=>this.handleChange(event)}>*/}
                {/*        {this.props.users.map((item)=><option value={item.id}>{item.username}</option> )}*/}
                {/*    </select>*/}
                    {/*<input type="number" name="user" placeholder="user" value={this.state.user}*/}
                    {/*       onChange={(event)=>this.handleChange(event)}/>*/}
                {/*</div>*/}
                {/*<input type="submit" value="Save"/>*/}
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}


export default ProjectForm