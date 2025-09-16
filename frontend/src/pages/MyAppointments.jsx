import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', 
                { appointmentId }, 
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token]);

    return (
        <div className="container mx-auto px-4 py-8">
            <p className='pb-3 mt-4 text-lg font-medium text-gray-600 border-b'>My appointments</p>
            
            {appointments.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No appointments found</p>
                </div>
            ) : (
                <div className='mt-6'>
                    {appointments.map((item, index) => (
                        <div key={index} className='grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-4 py-6 border-b'>
                            <div className="flex justify-center md:justify-start">
                                <img 
                                    className='w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg bg-[#EAEFFF]' 
                                    src={item.docData.image} 
                                    alt={item.docData.name} 
                                />
                            </div>
                            
                            <div className='text-sm text-[#5E5E5E]'>
                                <p className='text-[#262626] text-lg font-semibold'>{item.docData.name}</p>
                                <p className="text-[#4B5563]">{item.docData.speciality}</p>
                                
                                <p className='text-[#464646] font-medium mt-3'>Address:</p>
                                <p className=''>{item.docData.address.line1}</p>
                                <p className=''>{item.docData.address.line2}</p>
                                
                                <p className='mt-3'>
                                    <span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> 
                                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                                </p>
                                
                                {item.payment && (
                                    <p className='mt-2 text-green-600 font-medium'>
                                        Payment ID: {item.paymentId}
                                    </p>
                                )}
                            </div>
                            
                            <div className='flex flex-col gap-3 justify-center items-center md:items-end'>
                                {!item.cancelled && item.payment && !item.isCompleted && (
                                    <button className='w-full md:w-48 px-4 py-2 border border-green-500 text-green-600 rounded-lg bg-green-50'>
                                        Paid ✓
                                    </button>
                                )}

                                {item.isCompleted && (
                                    <button className='w-full md:w-48 px-4 py-2 border border-green-500 text-green-600 rounded-lg'>
                                        Completed ✓
                                    </button>
                                )}

                                {!item.cancelled && !item.isCompleted && (
                                    <button 
                                        onClick={() => cancelAppointment(item._id)} 
                                        className='w-full md:w-48 px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300'
                                    >
                                        Cancel Appointment
                                    </button>
                                )}
                                
                                {item.cancelled && !item.isCompleted && (
                                    <button className='w-full md:w-48 px-4 py-2 border border-red-500 text-red-600 rounded-lg bg-red-50'>
                                        Cancelled
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyAppointments