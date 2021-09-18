import { useIntl } from 'umi';

import styles from './index.less';

const QrcodeLogin = () => {
  const t = useIntl().formatMessage;

  return (
    <div>
      <div>
        <i className="absolute w-16 h-16 top-6 left-40" style={{ background: 'url(/phone.png)' }} />
        <div>
          <img className="w-32 mx-auto mt-20" src="/qr_code.png" />
        </div>
      </div>
      <div
        className="h-40 bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/2233login.png)' }}
      >
        <p className="pt-5 pb-2 text-xl">{t({ id: 'login.qrSignInFormTitle' })}</p>
        <p>
          {t({ id: 'login.use' })}
          <a href="//app.bilibili.com/" target="_blank">
            {t({ id: 'login.xxxxClient' })}
          </a>
          <br />
          {t({ id: 'login.codeScanningLogin' })}
          <br />
          {t({ id: 'login.orScanTheCodeToDownloadTheApp' })}
        </p>
      </div>
    </div>
  );
};

export default () => (
  <div className={styles.container}>
    <div>
      <QrcodeLogin />
    </div>
  </div>
);
