import React from 'react';
import PageContainer from '../../common/components/page-container';
// 导入假数据
import tempData from './data';

const List = props => {
  //渲染数据
  const { fetchData } = props.initialData;
  const { data } = fetchData || {};
  return (
    <div>
      {data &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          );
        })}
      {!data && <div>暂无数据</div>}
    </div>
  );
};

//静态方法  数据预取方法
List.getInitialProps = async () => {
  const fetchData = () => {
    return new Promise(resolve => {
      resolve({
        code: 0,
        data: tempData
      });
    });
  };
  let res = await fetchData();

  return {
    fetchData: res,
    page: {
      tdk: {
        title: '列表页 - koa-react-ssr',
        keywords: '列表页关键词 koa-react-ssr',
        description: '列表页描述 koa-react-ssr'
      }
    }
  };
};

export default PageContainer(List);
