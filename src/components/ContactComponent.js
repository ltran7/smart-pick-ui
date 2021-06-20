import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { withTranslation } from 'react-i18next';

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            agree: false,
            contactType: 'Phone',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                phone: false,
                email: false,
                message: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        const message = {
            "firstName": this.state.firstname,
            "lastName": this.state.lastname,
            "contact": this.state.phone,
            "email": this.state.email,
            "isContactable": this.state.agree,
            "contactType": this.state.contactType.toUpperCase(),
            "message": this.state.message
        };
        const {t} = this.props;

        axios.post("http://localhost:8080/smart-pick/message", message)
            .then(response => {
                alert(t("the_message_has_been_successfully_sent"));
                window.location.reload(false);
            })
            .catch(error => {
                alert(t("an_unexpected_error_occurred_while_sending_the_message"));
        });

        event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(firstname, lastname, phone, email, message) {
        const errors = {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            message: ''
        };
        const {t} = this.props;

        if (this.state.touched.firstname && firstname.length < 1)
            errors.firstname = t("the_first_name_must_contain_at_least_1_character");
        else if (this.state.touched.firstname && firstname.length > 20)
            errors.firstname = t("the_first_name_must_not_exceed_20_characters");

        if (this.state.touched.lastname && lastname.length < 1)
            errors.lastname = t("the_last_name_must_contain_at_least_1_character");
        else if (this.state.touched.lastname && lastname.length > 20)
            errors.lastname = t("the_last_name_must_not_exceed_20_characters");

        const reg_phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (this.state.touched.phone && !reg_phone.test(phone))
            errors.phone = t("the_phone_number_is_invalid");

        const reg_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if(this.state.touched.email && !reg_email.test(email))
            errors.email = t("the_email_is_invalid");

        if(this.state.touched.message && message.length < 1)
            errors.message = t("the_message_must_contain_at_least_1_character");
        else if (this.state.touched.message && message.length > 500)
            errors.message = t("the_message_must_not_exceed_500_characters"); 

        return errors;
    }

    render() {
        const {t} = this.props;
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.phone, this.state.email, this.state.message);
        return(
            <div className="container">
                <div className="row">
                    <span className="fa fa-address-card fa-2x float-left ml-2 mr-2"/><h3>{t("contact_us")}</h3>
                    <div className="col-12">   
                        <hr/>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>{t("first_name")}<span className="mandatory"> *</span></Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname"
                                        placeholder={t("first_name")}
                                        value={this.state.firstname}
                                        valid={errors.firstname === '' && this.state.touched.firstname}
                                        invalid={errors.firstname !== ''}
                                        onBlur={this.handleBlur('firstname')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>{t("last_name")}<span className="mandatory"> *</span></Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname"
                                        placeholder={t("last_name")}
                                        value={this.state.lastname}
                                        valid={errors.lastname === '' && this.state.touched.lastname}
                                        invalid={errors.lastname !== ''}
                                        onBlur={this.handleBlur('lastname')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phone" md={2}>{t("contact")}<span className="mandatory"> *</span></Label>
                                <Col md={10}>
                                    <Input type="tel" id="phone" name="phone"
                                        placeholder={t("phone_number")}
                                        value={this.state.phone}
                                        valid={errors.phone === '' && this.state.touched.phone}
                                        invalid={errors.phone !== ''}
                                        onBlur={this.handleBlur('phone')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.phone}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>{t("email")}<span className="mandatory"> *</span></Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder={t("email")}
                                        value={this.state.email}
                                        valid={errors.email === '' && this.state.touched.email}
                                        invalid={errors.email !== ''}
                                        onBlur={this.handleBlur('email')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange} /> {' '}
                                                <strong>{t("may_we_contact_you")}</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input type="select" name="contactType"
                                        value={this.state.contactType}
                                        onChange={this.handleInputChange}>
                                        <option>{t("phone")}</option>
                                        <option>{t("email")}</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>{t("message")}<span className="mandatory"> *</span></Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message"
                                        rows="9"
                                        value={this.state.message}
                                        valid={errors.message === '' && this.state.touched.message}
                                        invalid={errors.message !== ''}
                                        onBlur={this.handleBlur('message')}
                                        onChange={this.handleInputChange}/>
                                    <FormFeedback>{errors.message}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button 
                                        type="submit" 
                                        color="primary" 
                                        disabled={this.state.firstname === '' || this.state.lastname === '' || this.state.phone === '' || this.state.email === '' || this.state.message === ''}
                                    >
                                        {t("send")}
                                    </Button>
                                </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
        );
    }
}

export default withTranslation()(Contact);