/* eslint-disable no-unused-vars */
import { decrement, increment } from '@/redux/slice/counterSlice'
import { Button, Space } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Toan = () => {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return <div></div>
}

export default Toan
