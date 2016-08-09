import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

const LoginForm = ({ onUserNameChange, onPasswordChange, onSubmit }) => {
  return (
    <Grid>
      <Row>
        <Col xs={7} sm={5} md={4} className="authComponent">
          <h1 className="welcome">Welcome Back</h1>
        </Col>
      </Row>
      <Form horizontal>
        <FormGroup>
          <Col xs={7} sm={5} md={4} className="authComponent">
            <FormControl
              onChange={onUserNameChange} type="text" placeholder="Username"
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col xs={7} sm={5} md={4} className="authComponent">
            <FormControl
              onChange={onPasswordChange} type="password" placeholder="Password"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col xs={7} sm={5} md={4} className="authComponent">
            <Button
              onClick={onSubmit} type="submit" bsStyle="primary" block
            >Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </Grid>
  );
};

// LoginForm.propTypes = {
//   onUserNameChange: React.PropTypes.func.isRequired,
//   onPasswordChange: React.PropTypes.func.isRequired,
//   handleSubmit: React.PropTypes.func,
// };

export default LoginForm;
