import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Sweet Taro',
          title: 'Sweet Taro',
          href: '/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/undo-nothing',
          blankTarget: true,
        },
        {
          key: 'Docs',
          title: 'Docs',
          href: '/docs',
          blankTarget: true,
        },
      ]}
    />
  );
};
