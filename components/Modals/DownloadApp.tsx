import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Cross from "../../public/flex-ui-assets/ic_cross.svg"

const DownloadApp = (props: any) => {
    return (
        <Transition.Root show={props.show} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={props.close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="text-center ">
                                        <button onClick={() => props.close()} className='absolute right-4 top-4'>
                                            <Cross />
                                        </button>
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            ¿Do you like this creator?
                                        </Dialog.Title>
                                        <div className="mt-2 mb-4">
                                            <p className="text-sm text-gray-500">
                                                Have you heard of Truth Voice? Come and listen to my content! Download and get familiarized with Truth Voice now. Talk to you in Truth Voice!
                                            </p>
                                        </div>
                                        <Link href={`${props.link}`} className='bg-[#CF2508] text-white px-1 py-2 rounded-lg'>
                                            Get Truth Voice
                                        </Link>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default DownloadApp
