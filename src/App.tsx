import React from 'react';
import { Layout } from 'antd';
import { Todo } from './components/Todo';
import { TodoSider } from './components/todo/TodoSider';
import './styles/app.css';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <TodoSider />
      <Layout>
        <Content style={{ margin: '5% 15% 0' }}>
          <div className="site-layout-background" style={{ padding: 24, height: '80vh' }}>
            <Todo />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Todo App ©2022 Created by Volodymyr Hutovskyi</Footer>
      </Layout>
    </Layout> 
  );
}

export default App;

