const QRButton = ({ setModalOpen, userAddress, setQrCode }) => {
    const onProfileOpen1 = () => {
        setModalOpen(true)
        setQrCode(false)
    }

    return (

            <div className="flex w-full space-x-1">
                    <button onClick={onProfileOpen1} className="w-full rounded-lg bg-[#FFFFFF] py-3 px-10 text-0B60B0 font-medium text-#FFFFFF">
                        QR Code
                    </button>
                </div>

    )


}

export default QRButton
