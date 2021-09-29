import { useState, useEffect } from 'react';
import { strfdate, strpdate, randomDate } from '@/utils/datetime';
import styles from './index.less';
import { Image, Select, Input, Button, DatePicker } from 'antd';
import { history } from 'umi';
import {
  LeftOutlined,
  RightOutlined,
  ShareAltOutlined,
  HeartOutlined,
  CloudDownloadOutlined,
  CameraOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { IconFont } from '@/components/IconFont';
import { getWapperInfo } from '@/services/bing';

export default (props: any) => {
  const { Option } = Select;
  const [engine, setEngine] = useState('baidu');
  const [input, setInput] = useState('');
  const [date, setDate] = useState(strpdate(props.match.params.date));
  const [bingInfo, setBingInfo] = useState<API.BingInfo>({
    filename: '',
    title: '',
    author: '',
  });

  const engineUrl = {
    bing: 'https://cn.bing.com/search?q=',
    google: 'https://www.google.com.hk/search?q=',
    baidu: 'https://www.baidu.com/s?wd=',
  };

  if (strpdate().isBefore(date)) {
    setDate(strpdate());
  }

  useEffect(() => {
    history.push(`/BingSearch/${strfdate(date)}`);
    getWapperInfo(strfdate(date), {}).then((response) => {
      setBingInfo(response.data[0]);
    });
  }, [date]);

  function handleSearch() {
    if (!input) {
      window.open(engineUrl[engine] + bingInfo.author, '_blank');
    }
    window.open(engineUrl[engine] + input, '_blank');
    setInput('');
  }

  return (
    <div
      className={styles.main}
      style={{
        backgroundImage: bingInfo.filename ? `url(/media/bingwapper/${bingInfo.filename}.jpg)` : '',
      }}
    >
      <div className={styles.headerBox}>
        <div className="float-left m-3">
          <Button icon={<LeftOutlined />}>首页</Button>
        </div>
        <div className="float-right m-3">
          <Button icon={<ShareAltOutlined />}>分享</Button>
          <Button icon={<HeartOutlined />}>999+</Button>
          <Button icon={<CloudDownloadOutlined />}>下载</Button>
        </div>
      </div>
      <div className={styles.searchBox}>
        <div className={styles.searchLogo}>
          {engine === 'google' ? (
            <Image src="/logo_google.png" width={120} preview={false} />
          ) : (
            <Image src="/logo_bing.png" width={120} preview={false} />
          )}
        </div>
        <div className={styles.searchInput}>
          <Input.Group compact>
            <Select
              defaultValue={engine}
              onChange={(value) => setEngine(value)}
              dropdownMatchSelectWidth={false}
            >
              <Option value="baidu">Baidu</Option>
              <Option value="google">Google</Option>
              <Option value="bing">Bing</Option>
            </Select>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={bingInfo.title}
              onPressEnter={handleSearch}
            />
            <Button icon={<SearchOutlined />} onClick={handleSearch} />
          </Input.Group>
        </div>
      </div>
      <div className={styles.footerBox}>
        <div className={styles.footerRight}>
          <Button size="large" type="text" icon={<CameraOutlined />}>
            {bingInfo.title} (© {bingInfo.author})
          </Button>
          <DatePicker
            size="large"
            value={date}
            allowClear={false}
            inputReadOnly={true}
            onChange={(_date, dateString) => setDate(strpdate(dateString))}
          />
          <Button
            type="text"
            size="large"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={() => setDate(strpdate(strfdate(date.subtract(1, 'day'))))}
          />
          <Button
            type="text"
            size="large"
            shape="circle"
            icon={<IconFont type="icon-suijisenlin" />}
            onClick={() => setDate(randomDate(strpdate('2016-08-08'), strpdate()))}
          />
          <Button
            type="text"
            size="large"
            shape="circle"
            icon={<RightOutlined />}
            onClick={() => setDate(strpdate(strfdate(date.add(1, 'day'))))}
            disabled={strfdate(date) === strfdate(strpdate())}
          />
        </div>
      </div>
    </div>
  );
};
