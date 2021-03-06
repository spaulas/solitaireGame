import { ExplicitAny, RootReducerState } from "../../../../global";
import { Form, Input, Row, notification } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import {
  checkConfirmPassword,
  checkEmail,
  checkPassword,
  checkUserName,
  setUserRedux
} from "../helper";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../Buttons/MenuButton.component";
import PasswordInput from "../PasswordInput.component";
import React from "react";
import { auth } from "../../../../firebase/firebase.utils";
import { useHistory } from "react-router-dom";
import userActions from "../../../../redux/user/user.actions";

const { Item } = Form;

function SignUpForm() {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { language } = useSelector(({ User }: RootReducerState) => ({
    language: User.user?.settings?.language
  }));

  const onChange = (
    { target: { value } }: { target: { value: string } },
    field: string
  ) => {
    form.setFieldsValue({ [field]: value });
  };

  const onSubmit = async (values: Record<string, string>) => {
    dispatch(userActions.clearUser());
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      setUserRedux(user, dispatch, false, values.userName, language);
      history.push("/");
    } catch (signUpError) {
      notification.error({
        message: `Sign Up Error: ${signUpError.message}`,
        duration: 5
      });
    }
  };

  return (
    <>
      <Form
        name="signUpForm"
        className="styledForm"
        onFinish={onSubmit}
        form={form}
      >
        <Row align="middle" justify="center">
          <Item
            name="userName"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.required.userName" })
              },
              {
                validator: (
                  rule: object,
                  value: string,
                  callback: (message?: string) => void
                ) => checkUserName(rule, value, callback, intl)
              }
            ]}
          >
            <Input
              className="divButton loginButtonAnimated formInput pwdInput"
              onChange={(e: ExplicitAny) => onChange(e, "userName")}
              onPressEnter={() => form.submit()}
            />
            <label className="labelPlaceholder">
              <FormattedMessage id="table.userName" />
            </label>
          </Item>
        </Row>
        <Row align="middle" justify="center">
          <Item
            name="email"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.required.email" })
              },
              {
                validator: (
                  rule: object,
                  value: string,
                  callback: (message?: string) => void
                ) => checkEmail(rule, value, callback, intl)
              }
            ]}
          >
            <Input
              className="divButton loginButtonAnimated formInput pwdInput"
              onChange={(e: ExplicitAny) => onChange(e, "email")}
              onPressEnter={() => form.submit()}
            />
            <label className="labelPlaceholder">
              <FormattedMessage id="table.email" />
            </label>
          </Item>
        </Row>
        <Row align="middle" justify="center">
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.required.password" })
              },
              {
                validator: (
                  rule: object,
                  value: string,
                  callback: (message?: string) => void
                ) => checkPassword(rule, value, callback, intl)
              }
            ]}
          >
            <PasswordInput
              onChange={(e: ExplicitAny) => onChange(e, "password")}
              onPressEnter={() => form.submit()}
              confirmPwd={false}
            />
          </Item>
        </Row>

        <Row align="middle" justify="center">
          <Item
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: "form.required.passwordConfirm"
                })
              },
              {
                validator: (
                  rule: object,
                  value: string,
                  callback: (message?: string) => void
                ) =>
                  checkConfirmPassword(
                    rule,
                    value,
                    callback,
                    form.getFieldValue("password"),
                    intl
                  )
              }
            ]}
          >
            <PasswordInput
              onChange={(e: ExplicitAny) => onChange(e, "passwordConfirm")}
              onPressEnter={() => form.submit()}
              confirmPwd
            />
          </Item>
        </Row>

        <MenuButton
          onClick={() => form.submit()}
          className="loginButtonAnimated formButton"
        >
          <span>
            <FormattedMessage id="btn.submit" />
          </span>
        </MenuButton>

        <MenuButton
          location="/login"
          className="loginButtonAnimated formButton"
        >
          <span>
            <FormattedMessage id="btn.login" />
          </span>
        </MenuButton>
      </Form>
    </>
  );
}

export default SignUpForm;
