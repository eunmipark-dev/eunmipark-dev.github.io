import React from 'react'
import './EditDate.scss'

interface EditDateProps {
  strDate: string
}
export default function EditDate({ strDate }: EditDateProps) {
  return <span className="edited-date">edit : {strDate}</span>
}
