import { forwardRef } from 'react'

const button = (props: any, ref: any) => {
  return (
    <button
      ref={ref}
      {...props}
      className={
        `inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        ${props.className}
      `}
    >
      {props.children}
    </button>
  )
}

export default forwardRef(button)
