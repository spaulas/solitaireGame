import "moment/locale/es";
import "moment/locale/de";
import "moment/locale/pt-br";
import { Checkbox, Col, Divider, Form, Input, Radio, Row, Tooltip } from "antd";
import { ExplicitAny, RootReducerState } from "../../../../global";
import { FormattedMessage, useIntl } from "react-intl";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../Buttons/MenuButton.component";
import ReactCountryFlag from "react-country-flag";
import moment from "moment";
import { useForm } from "antd/lib/form/util";
import userActions from "../../../../redux/user/user.actions";

const { Item } = Form;

function ConfigurationsForm() {
  const [form] = useForm();
  const intl = useIntl();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const {
    userName,
    email,
    createdAt,
    language,
    joyride,
    loggedIn
  } = useSelector(({ User }: RootReducerState) => {
    const user = User.user;
    return {
      userName: user.userName,
      email: user.email,
      createdAt: user.createdAt,
      language: user.settings.language,
      joyride: user.settings.joyride,
      loggedIn: User.loggedIn
    };
  });

  const onChange = (
    { target: { value } }: { target: { value: string } },
    field: string
  ) => {
    form.setFieldsValue({ [field]: value });
  };

  /**
   * Submit form function
   * @param values form fields values
   */
  const onSubmit = ({
    userName,
    language,
    createdAt,
    email,
    ...joyride // the remaining fields are all from the joyride checkboxes
  }: ExplicitAny) => {
    // separate the language and the joyride into the settings key
    const finalChanges = {
      userName,
      settings: {
        language,
        joyride
      }
    };
    dispatch(userActions.changeUserSettings(finalChanges));
    // close the edit mode
    setEditMode(false);
  };

  /**
   * Called when the edit changes are canceled
   */
  const handleCancel = () => {
    // reset all the original values
    form.resetFields();
    // close the edit mode
    setEditMode(false);
  };

  return (
    <Form
      className="styledForm configurationsForm"
      name="configurationsForm"
      form={form}
      initialValues={{ userName, email, createdAt, language, ...joyride }}
      onFinish={onSubmit}
    >
      <Row className="buttonSpaceRow" align="middle" justify="space-between">
        <Col xs={24} sm={24} md={10}>
          {/* Username input item */}
          <Item
            name="userName"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "form.required.userName" })
              }
            ]}
          >
            <Input
              disabled={!editMode}
              className="divButton loginButtonAnimated formInput"
              defaultValue={userName}
              onChange={(e: ExplicitAny) => onChange(e, "userName")}
            />
            <label className="labelPlaceholder">
              <FormattedMessage id="table.userName" />
            </label>
          </Item>
        </Col>
        <Col xs={24} sm={24} md={10}>
          {/* Created at input item (disabled) */}
          <Item name="createdAt">
            <Input
              disabled
              className="divButton loginButtonAnimated formInput"
              value={moment(createdAt)
                .locale(language?.split("-")[0])
                .format("MMMM Do YYYY, h:mm:ss a")}
            />
            <label className="labelPlaceholder">
              <FormattedMessage id="table.createdAt" />
            </label>
          </Item>
        </Col>
      </Row>
      <Row
        className="buttonSpaceRow extraSpaceRow"
        align="middle"
        justify="space-between"
      >
        {loggedIn ? (
          <Col xs={24} sm={24} md={10}>
            {/* Email input item (disabled and only visible for a logged in user) */}
            <Item name="email">
              <Input
                disabled
                className="divButton loginButtonAnimated formInput"
                defaultValue={email}
                onChange={(e: ExplicitAny) => onChange(e, "email")}
              />
              <label className="labelPlaceholder">
                <FormattedMessage id="table.email" />
              </label>
            </Item>
          </Col>
        ) : null}

        <Col xs={24} sm={24} md={10}>
          {/* Language radio button item (english, portuguese, german and spanish available) */}
          <Item name="language">
            <Radio.Group className="languagesRadioGroup" disabled={!editMode}>
              <Radio.Button className="flagRadioButton" value="en-US">
                <Tooltip title={<FormattedMessage id="languages.english" />}>
                  <ReactCountryFlag className="flags" countryCode="GB" />
                </Tooltip>
              </Radio.Button>
              <Radio.Button className="flagRadioButton" value="pt-PT">
                <Tooltip title={<FormattedMessage id="languages.portuguese" />}>
                  <ReactCountryFlag className="flags" countryCode="BR" />
                </Tooltip>
              </Radio.Button>
              <Radio.Button className="flagRadioButton" value="de-DE">
                <Tooltip title={<FormattedMessage id="languages.german" />}>
                  <ReactCountryFlag className="flags" countryCode="DE" />
                </Tooltip>
              </Radio.Button>
              <Radio.Button className="flagRadioButton" value="es-ES">
                <Tooltip title={<FormattedMessage id="languages.spanish" />}>
                  <ReactCountryFlag className="flags" countryCode="ES" />
                </Tooltip>
              </Radio.Button>
            </Radio.Group>
          </Item>
        </Col>
      </Row>

      <Divider orientation="left" className="extraSpaceDivider">
        <FormattedMessage id="joyride.title" />
      </Divider>
      {/* Joyride checkboxes for each page */}
      <Row className="buttonSpaceRow" align="middle" justify="center">
        {Object.keys(joyride).map((page: string) => (
          <Col key={page} xs={24} sm={24} md={6}>
            <Item name={page} valuePropName="checked">
              <Checkbox disabled={!editMode} defaultChecked={joyride[page]}>
                <FormattedMessage id={`sidebar.${page}`} />
              </Checkbox>
            </Item>
          </Col>
        ))}
      </Row>

      {editMode ? (
        // at the edit mode, the buttons save and cancel are displayed
        <>
          <MenuButton
            onClick={() => form.submit()}
            className="loginButtonAnimated extraSpaceButtons"
          >
            <span>
              <FormattedMessage id="btn.save" />
            </span>
          </MenuButton>
          <MenuButton
            onClick={handleCancel}
            className="loginButtonAnimated extraSpaceButtons"
          >
            <span>
              <FormattedMessage id="btn.cancel" />
            </span>
          </MenuButton>
        </>
      ) : (
        // when not editing, only the edit button is shown
        <MenuButton
          onClick={() => setEditMode(true)}
          className="loginButtonAnimated extraSpaceButtons"
        >
          <span>
            <FormattedMessage id="btn.edit" />
          </span>
        </MenuButton>
      )}
    </Form>
  );
}

export default ConfigurationsForm;