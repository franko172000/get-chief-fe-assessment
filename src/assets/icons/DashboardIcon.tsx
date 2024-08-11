const DashboardIcon = ({className}: {className: string}) => {
    return (
        <span className={className}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                 stroke="currentColor">
            <path
                d="M10.625 8.125V2.5H17.5V8.125H10.625ZM2.5 10.625V2.5H9.375V10.625H2.5ZM10.625 17.5V9.375H17.5V17.5H10.625ZM2.5 17.5V11.875H9.375V17.5H2.5ZM3.75 9.375H8.125V3.75H3.75V9.375ZM11.875 16.25H16.25V10.625H11.875V16.25ZM11.875 6.875H16.25V3.75H11.875V6.875ZM3.75 16.25H8.125V13.125H3.75V16.25Z"
                fill="white"/>
            </svg>
        </span>

    )
}
export default DashboardIcon;