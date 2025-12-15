import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'

import './styles/index.css'
import "@taroify/core/styles/index.css"

export default function ({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}
