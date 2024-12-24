import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Provider } from 'react-redux';
import store from './store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* 注册状态管理 */}
    <Provider store={store}>
      
      {/* 注册路由 */}
      <RouterProvider router={router} />

    </Provider>

  </React.StrictMode>
);


