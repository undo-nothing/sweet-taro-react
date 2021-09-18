import React, { useState } from 'react';
import { useIntl, history, useModel } from 'umi';
import { Alert, message, Form, Input, Button, Checkbox } from 'antd';

import styles from './index.less';
import { login } from '@/services/ant-design-pro/api';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const PasswordLogin = () => {
  const t = useIntl().formatMessage;

  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const { status } = userLoginState;

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await login({ ...values });
      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = t({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = t({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
    setSubmitting(false);
  };

  return (
    <Form
      name="password_login"
      className="login-form"
      initialValues={{ remember: false }}
      onFinish={handleSubmit}
    >
      {status === 'error' && (
        <LoginMessage
          content={t({
            id: 'pages.login.accountLogin.errorMessage',
            defaultMessage: '账户或密码错误',
          })}
        />
      )}
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入注册时用的邮箱或者手机号呀' }]}
      >
        <Input placeholder={t({ id: 'login.userNameMobileEmail' })} size="large" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '喵，你没输入密码么？' }]}>
        <Input.Password type="password" placeholder={t({ id: 'login.password' })} size="large" />
      </Form.Item>
      <Form.Item style={{ marginBottom: '0px' }}>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>
            <span style={{ color: '#1890ff' }}>{t({ id: 'login.rememberMe' })}</span>
          </Checkbox>
          <span className={styles.rememberMeTip}>{t({ id: 'login.rememberMeTip' })}</span>
        </Form.Item>
        <a className="pl-2">{t({ id: 'login.forgetPassword' })}</a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" size="large" htmlType="submit" loading={submitting} className="w-48">
          {t({ id: 'login.loginButton' })}
        </Button>
        <Button type="default" size="large" className="w-48 ml-8">
          {t({ id: 'login.registerButton' })}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default () => (
  <div className={styles.container}>
    <div>
      <PasswordLogin />
    </div>
  </div>
);
