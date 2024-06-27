import React from 'react'
import Modal from './modal'

export default function Page({ params }: { params: { id: string } }) {
  return <Modal id={params.id} />
}
