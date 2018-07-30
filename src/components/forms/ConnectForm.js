import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

class ConnectForm extends React.Component {
    state = {
        data: {
            username: ''
        },
        loading: false,
        errors: {}
    };

    onChange = event => this.setState({
        data: {
            ...this.state.data,
            [event.target.name]: event.target.value
        }
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.submit(this.state.data)
                .catch(err => {
                    this.setState({
                        errors: err && err.response && err.response.data && err.response.data.errors,
                        loading: false
                    });
                });
        }
    };

    validate = data => {
        const errors = {};

        if (!data.username) {
            errors.username = 'Can\'t be blank';
        }

        return errors;
    };

    render() {
        const { data, errors, loading } = this.state;

        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Please connect with username
                        </Header>
                        <Form size='large' onSubmit={this.onSubmit.bind(this)} loading={loading}>
                            <Segment>
                                <Form.Input fluid
                                            icon='user'
                                            iconPosition='left'
                                            type="text"
                                            id="username"
                                            name="username"
                                            placeholder='Enter your username'
                                            value={data.username}
                                            onChange={this.onChange.bind(this)} />
                                <Button color='teal' fluid size='large'>
                                    Connect
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

ConnectForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default ConnectForm;
