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

  handlePhoneNumber = e => {
    this.setState({
      phone: e.target.value
    });
  };

  onSubmit = async context => {
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
                  onSubmit={() => this.onSubmit(context)}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field name="phone" validate={validationSchema} />
                      {errors.phone && touched.phone && <p>{errors.phone}</p>}
                      <p>
                        <button type="submit">Submit</button>
                      </p>
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
