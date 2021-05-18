import React, { Component } from 'react';
import {Consumer} from '../../context';
import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';


class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone:'',
        errors: {}
    };

    onChange = e => this.setState(
        { [e.target.name]: e.target.value });
    
    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const {name, email, phone} = this.state;

        //Check for error
        if(name === '') {
            this.setState({errors: {name: "Name is required!!"}})
            return;
        }

        if(email === '') {
            this.setState({errors: {email: "Email is required!!"}})
            return;
        }

        if(phone === '') {
            this.setState({errors: {phone: "Phone is required!!"}})
            return;
        }
        

        const newContact = {
            id: uuid(),
            name,
            email, 
            phone
        }

        const res = await axios.post
            (`https://jsonplaceholder.typicode.com/users`, newContact);
            
            dispatch({type: 'ADD_CONTACT', payload: res.data})

        this.setState({
            name: '',
            phone: '',
            email: '',
            errors: {}   
        });

        this.props.history.push('/');
    }

    render() {
        const { name, email, phone, errors } = this.state;
        
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">
                                <h1 className="display-4 mb-2"><span className="text-danger">Contact</span> Add</h1>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup
                                        label="Name"
                                        name="name"
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={this.onChange}
                                        error = {errors.name}
                                    />

                                    <TextInputGroup
                                        label="Email"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={this.onChange}
                                        error = {errors.email}
                                    />

                                    <TextInputGroup
                                        label="Phone"
                                        name="phone"
                                        placeholder="Enter Phone"
                                        value={phone}
                                        onChange={this.onChange}
                                        error = {errors.phone}
                                    />

                                    <div class="d-grid gap-2">
                                    <input
                                        type="submit"
                                        value="Add Contact"
                                        className="btn btn-success btn-block mt-3"
                                        style={{float: 'right'}}
                                    />
                                    </div>
                                </form>
                            </div>
                        </div>
                    );          
                }}
            </Consumer>
        )
        
    }
}

export default AddContact;
