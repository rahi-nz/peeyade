import React from "react";
import { Formik, Form, Field } from "formik";
import { request } from "../request/request";
import { Consumer } from "./storeContext";
import s from "../scss/login.scss";
import { phoneNumberPost } from "../request/services";
import validationSchema from "../validation/phonevalidation";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null
    };
  }

  submit = async context => {
    const { phone } = this.state;
    const body = {
      phone
    };
    const resp = await request.post(phoneNumberPost, body);
    console.log("resp:", resp);
    context.changeOtp(resp.data);
  };

  render() {
    const { phone } = this.state;
    return (
      <div>
        <Consumer>
          {context => {
            console.log("context:", context);
            return (
              <div className={s.container}>
                <Formik
                  initialValues={phone}
                  onSubmit={() => this.submit(context)}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched, handleSubmit, handleBlur }) => (
                    <Form onSubmit={handleSubmit}>
                      <Field
                        name="phone"
                        placeholder="enter your phone number"
                        onBlur={e => {
                          handleBlur(e);
                          this.setState({
                            phone: e.target.value
                          });
                        }}
                      />
                      {errors.phone && touched.phone && <p>{errors.phone}</p>}
                      <button type="submit">Send Code</button>
                    </Form>
                  )}
                </Formik>
              </div>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

export default Login;
