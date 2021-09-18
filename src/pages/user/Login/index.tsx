import { GithubOutlined, WechatOutlined, AlipayCircleOutlined } from '@ant-design/icons';
import { Layout, Space, Tabs } from 'antd';
import { SelectLang, useIntl } from 'umi';

import styles from './index.less';
import QrcodeLogin from './QrcodeLogin';
import PasswordLogin from './PasswordLogin';
import Footer from '@/components/Footer';

export default () => {
  const t = useIntl().formatMessage;
  const { TabPane } = Tabs;
  const { Content } = Layout;
  return (
    <div className={styles.container}>
      <Content>
        <div className={styles.lang} data-lang>
          <SelectLang />
        </div>
        <div className="mt-24 h-6 mx-auto my-6 text-center border-b" style={{ width: '1000px' }}>
          <span className="px-10 text-4xl bg-white">Sweet Taro</span>
        </div>
        <div className="relative mx-auto w-max login-box">
          <div className={[styles.loginLeft, 'float-left text-center'].join(' ')}>
            <QrcodeLogin />
          </div>
          <div className="float-left border-r h-96 mt-7" />
          <div className={styles.loginRight}>
            <div className={styles.switchTab}>
              <Tabs type="card">
                <TabPane tab={t({ id: 'login.passwordSignInFormTitle' })} key="1">
                  <PasswordLogin />
                </TabPane>
                <TabPane tab={t({ id: 'login.mobileSignInFormTitle' })} key="3">
                  {t({ id: 'login.mobileSignInFormTitle' })}
                </TabPane>
              </Tabs>
            </div>
            <Space className="pl-4">
              {t({ id: 'login.otherSignIn' })}
              <GithubOutlined className={styles.icon} />
              <WechatOutlined className={styles.icon} />
              <AlipayCircleOutlined className={styles.icon} />
            </Space>
          </div>
        </div>
      </Content>
      <Footer />
    </div>
  );
};
