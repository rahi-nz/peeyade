import React from "react";
import Router from "next/router";
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
      phone: null,
      error: null
    };
  }

  submit = async context => {
    const { phone } = this.state;
    const body = {
      phone
    };
    const resp = await request.post(phoneNumberPost, body);
    switch (resp.data.meta.status) {
      case 200:
        context.changeOtp(resp.data);
        context.changeUser(phone);
        Router.push("/code");
        break;
      case 208:
        this.setState({
          error: resp.data.meta.developerMessage
        });
        break;
      default:
        this.setState({
          error: resp.data.notification.message
        });
    }
  };

  render() {
    const { phone, error } = this.state;
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
                  {({ errors, touched, handleBlur }) => (
                    <Form>
                      <Field
                        name="phone"
                        placeholder="شماره موبایل"
                        onBlur={e => {
                          handleBlur(e);
                          this.setState({
                            phone: e.target.value
                          });
                        }}
                      />
                      {errors.phone && touched.phone && <p>{errors.phone}</p>}
                      <button type="submit">ثبت</button>
                      {error && <p>{error}</p>}
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
