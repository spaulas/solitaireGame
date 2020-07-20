import {
  EyeInvisibleFilled,
  EyeOutlined,
  GoogleCircleFilled,
  InfoCircleFilled
} from "@ant-design/icons";
import { Form, Input, Row, Tooltip } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import React, { useEffect, useState } from "react";
import { auth, signInWithGoogle } from "../../../../firebase/firebase.utils";
import { checkEmail, checkPassword } from "../helper";
import { ExplicitAny } from "../../../../global";
import MenuButton from "../../Buttons/MenuButton.component";

const { Item } = Form;
// const { Password } = Input;

interface LoginFormProps {
  hideForm: () => void;
}

function LoginForm({ hideForm }: LoginFormProps) {
  const intl = useIntl();
  const [hidePwd, setHidePwd] = useState(true);

  const onChange = (
    { target: { value } }: { target: { value: string } },
    field: string
  ) => {
    form.setFieldsValue({ [field]: value });
  };

  const onSubmit = async (values: Record<string, string>) => {
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);
    } catch (signInError) {
      if (signInError.code === "auth/user-not-found") {
        try {
          await auth.createUserWithEmailAndPassword(
            values.email,
            values.password
          );
        } catch (signUpError) {
          console.error("Error creating user2 ", signUpError.message);
        }
      } else {
        console.error("Error creating user ", signInError.message);
      }
    }
    hideForm();
  };

  const [form] = Form.useForm();

  return (
    <>
      <Form
        name="loginForm"
        className="styledForm"
        onFinish={onSubmit}
        form={form}
      >
        <Row align="middle" justify="center">
          <Item
            name="email"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.required.email" })
              },
              {
                validator: (rule: any, value: any, callback: any) =>
                  checkEmail(rule, value, callback, intl)
              }
            ]}
          >
            <Input
              className="divButton loginButtonAnimated formInput pwdInput"
              onChange={(e: ExplicitAny) => onChange(e, "email")}
            />
            <label className="labelPlaceholder">email</label>
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
                validator: (rule: any, value: any, callback: any) =>
                  checkPassword(rule, value, callback, intl)
              }
            ]}
          >
            <Input
              className={`divButton loginButtonAnimated formInput ${
                hidePwd ? "formPwd" : ""
              }`}
              onChange={(e: ExplicitAny) => onChange(e, "password")}
            />
            <label className="labelPlaceholder">password</label>
            <Tooltip title={<FormattedMessage id="form.info.pwd" />}>
              <InfoCircleFilled className="inputIcons infoIcon" />
            </Tooltip>
            {hidePwd ? (
              <EyeInvisibleFilled
                onClick={() => setHidePwd(false)}
                className="inputIcons pwdIcon"
              />
            ) : (
              <EyeOutlined
                onClick={() => setHidePwd(true)}
                className="inputIcons pwdIcon"
              />
            )}
          </Item>
        </Row>

        <MenuButton
          onClick={() => form.submit()}
          className="loginButtonAnimated"
        >
          <FormattedMessage id="btn.submit" />
        </MenuButton>
        <MenuButton
          onClick={signInWithGoogle}
          className="googleButton loginButtonAnimated"
        >
          <GoogleCircleFilled />
          <span> Google</span>
        </MenuButton>
        <MenuButton onClick={hideForm} className="loginButtonAnimated">
          <FormattedMessage id="btn.back" />
        </MenuButton>
      </Form>
    </>
  );
}

export default LoginForm;
